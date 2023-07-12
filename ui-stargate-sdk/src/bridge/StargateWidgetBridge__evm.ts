import {ProviderFactory, createTransaction} from '@layerzerolabs/ui-evm';

import {StargateBridge__evm} from './StargateBridge__evm';
import {StargateSDK} from '../StargateSDK';
import {
  CurrencyAmount,
  Currency,
  Transaction,
  toBigNumber,
  AdapterParams,
  FeeQuote,
  castCurrencyAmountUnsafe,
  isNativeCurrency,
  isToken,
  MaxUint256,
} from '@layerzerolabs/ui-core';
import {BridgeApi, TransferInput} from '@layerzerolabs/ui-bridge-sdk';
import {Signer, utils} from 'ethers';
import {ChainId} from '@layerzerolabs/lz-sdk';

import {StargateWidget__factory} from '../evm/contracts';
import {IStargateWidget, IStargateRouter} from '../evm/contracts/StargateWidget';

import assert from 'assert';

export type PartnerConfig = {
  partnerId: number;
  tenthBps: number;
  feeCollector: string;
};

const WIDGET_SWAP_ADDRESS: Record<number, string> = {
  [ChainId.RINKEBY]: '0x1aE3A80BDCdFEC8c76c6049248E4139160b72FF1',
  [ChainId.BSC_TESTNET]: '0xcE375F5d95204DB9b110BE3b3C886A33c8168eB2',
  [ChainId.FUJI]: '0xcE375F5d95204DB9b110BE3b3C886A33c8168eB2',
  [ChainId.MUMBAI]: '0xcE375F5d95204DB9b110BE3b3C886A33c8168eB2',
  [ChainId.ARBITRUM_RINKEBY]: '0xcE375F5d95204DB9b110BE3b3C886A33c8168eB2',
  [ChainId.OPTIMISM_KOVAN]: '0xcE375F5d95204DB9b110BE3b3C886A33c8168eB2',
  [ChainId.FANTOM_TESTNET]: '0xcbF0B97dbe30406e974F2d1ADF19CD6667d70632',
  [ChainId.ETHEREUM]: '0x76d4d68966728894961AA3DDC1d5B0e45668a5A6',
  [ChainId.BSC]: '0x2Eb9ea9dF49BeBB97e7750f231A32129a89b82ee',
  [ChainId.AVALANCHE]: '0x20293eDD4f52F81234b3997B9AE4742c48005858',
  [ChainId.POLYGON]: '0xdc2716B92480225533aBC3328C2Ab961f2A9247d',
  [ChainId.ARBITRUM]: '0x6c33A7b29C8B012D060F3a5046f3ee5aC48f4780',
  [ChainId.OPTIMISM]: '0x46Bc16F76B0aE14Abb820D3410843Ba54D8ef6f0',
  [ChainId.FANTOM]: '0xC8e5157EC44E00ff85Bf15D4f50974d3A8166427',
  [ChainId.METIS]: '0xb63c87D146cbE60B3C0419003Ebd24F21374c8Ae',
};

export function getWidgetAddress(chainId: number) {
  return WIDGET_SWAP_ADDRESS[chainId];
}

type StargateWidgetFee = {
  totalFee: CurrencyAmount;
  eqFee: CurrencyAmount;
  eqReward: CurrencyAmount;
  lpFee: CurrencyAmount;
  protocolFee: CurrencyAmount;
  lkbRemove: CurrencyAmount;
  partnerFee: CurrencyAmount;
};

export class StargateWidgetBridge__evm
  extends StargateBridge__evm
  implements BridgeApi<Signer, StargateWidgetFee>
{
  private readonly tenthBpsDenominator = 100000;

  constructor(
    providerFactory: ProviderFactory,
    sdk: StargateSDK,
    protected partnerConfig: PartnerConfig,
  ) {
    super(providerFactory, sdk);
  }

  private async getPartnerFee(inputAmountLD: CurrencyAmount): Promise<CurrencyAmount> {
    return inputAmountLD.multiply(this.partnerConfig.tenthBps).divide(this.tenthBpsDenominator);
  }

  async getAllowance(currency: Currency, address: string): Promise<CurrencyAmount> {
    if (isNativeCurrency(currency)) return CurrencyAmount.fromRawAmount(currency, MaxUint256);
    const spender = getWidgetAddress(currency.chainId);
    return this.erc20.forToken(currency).allowance(address, spender);
  }

  async approve(amount: CurrencyAmount) {
    const srcCurrency = amount.currency;
    assert(isToken(srcCurrency), 'Not a token');
    const widgetAddress = getWidgetAddress(srcCurrency.chainId);
    assert(widgetAddress, 'widgetAddress');
    return this.erc20.forToken(amount.currency).approve(amount, widgetAddress);
  }

  async getOutput(
    inputAmountLD: CurrencyAmount<Currency>,
    dstCurrency: Currency,
  ): Promise<{
    amount: CurrencyAmount;
    fee: StargateWidgetFee;
  }> {
    const partnerFee = await this.getPartnerFee(inputAmountLD);
    const swapAmount = inputAmountLD.subtract(partnerFee);
    const output = await super.getOutput(swapAmount, dstCurrency);

    const fee: StargateWidgetFee = {
      ...output.fee,
      partnerFee,
    };

    return {
      amount: output.amount,
      fee,
    };
  }

  protected async transferEth(input: TransferInput): Promise<Transaction<Signer>> {
    const contract = this.getWidgetContract(input.srcChainId);

    const partnerId = utils.solidityPack(['uint16'], [this.partnerConfig.partnerId]);
    const value = toBigNumber(input.fee.nativeFee.add(input.amount));

    const populatedTransaction = contract.populateTransaction.swapETH(
      toBigNumber(input.amount),
      toBigNumber(input.minAmount),
      input.dstChainId,
      input.dstAddress,
      partnerId,
      this.feeObj,
      {value},
    );
    return createTransaction(populatedTransaction, {provider: contract.provider});
  }

  get feeObj() {
    const feeObj: IStargateWidget.FeeObjStruct = {
      tenthBps: this.partnerConfig.tenthBps,
      feeCollector: this.partnerConfig.feeCollector,
    };
    return feeObj;
  }

  async getMessageFee(
    srcCurrency: Currency,
    dstCurrency: Currency,
    adapterParams: AdapterParams,
  ): Promise<FeeQuote> {
    const fee = await super.getMessageFee(srcCurrency, dstCurrency, adapterParams);

    return {
      ...fee,
      // Transfers that include a partnerId i.e. Widget transfers require slightly more native
      nativeFee: fee.nativeFee.multiply(110).divide(100),
    };
  }

  protected async transferToken(input: TransferInput): Promise<Transaction<Signer>> {
    const contract = this.getWidgetContract(input.srcChainId);
    const {srcPool, dstPool} = this.sdk.getPath(input.srcCurrency, input.dstCurrency);

    const lzTxParams: IStargateRouter.LzTxObjStruct = {
      dstGasForCall: 0,
      dstNativeAmount: input.adapterParams.dstNativeAmount
        ? toBigNumber(input.adapterParams.dstNativeAmount)
        : 0,
      dstNativeAddr: input.adapterParams.dstNativeAddress ?? input.dstAddress,
    };

    const partnerId = utils.solidityPack(['uint16'], [this.partnerConfig.partnerId]);
    const value = toBigNumber(input.fee.nativeFee);

    const minAmountLD = toBigNumber(
      // at this point the conversion is safe
      castCurrencyAmountUnsafe(input.minAmount, input.srcCurrency),
    );

    const populatedTransaction = contract.populateTransaction.swapTokens(
      input.dstChainId,
      srcPool.poolId,
      dstPool.poolId,
      toBigNumber(input.amount),
      minAmountLD,
      lzTxParams,
      input.dstAddress,
      partnerId,
      this.feeObj,
      {value},
    );

    return createTransaction(populatedTransaction, {provider: contract.provider});
  }

  getWidgetContract(chainId: ChainId) {
    const address = WIDGET_SWAP_ADDRESS[chainId];
    assert(address, 'WIDGET_SWAP_ADDRESS');
    const provider = this.providerFactory(chainId);
    return StargateWidget__factory.connect(address, provider);
  }
}
