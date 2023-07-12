import {BridgeApi, validateInput, TransferInput} from '@layerzerolabs/ui-bridge-sdk';
import {
  AdapterParams,
  castCurrencyAmountUnsafe,
  Currency,
  CurrencyAmount,
  FeeQuote,
  getDefaultMessageDuration,
  getNativeCurrency,
  isEvmChainId,
  isNativeCurrency,
  isToken,
  MaxUint256,
  toBigNumber,
  toCurrencyAmount,
  Token,
  Transaction,
} from '@layerzerolabs/ui-core';
import {ONE_ADDRESS, ProviderFactory, createTransaction} from '@layerzerolabs/ui-evm';
import assert from 'assert';
import {constants, Signer} from 'ethers';
import {
  Pool__factory,
  Router,
  RouterETH__factory,
  Router__factory,
  StargateFeeLibrary,
  StargateFeeLibrary__factory,
} from '../evm/contracts';

import {ERC20__api} from '@layerzerolabs/ui-erc20-sdk';
import {StargateSDK} from '../StargateSDK';
import pMemoize from 'p-memoize';
import {currencyKey} from '../utils/currencyKey';

type StargateFee = {
  totalFee: CurrencyAmount;
  eqFee: CurrencyAmount;
  eqReward: CurrencyAmount;
  lpFee: CurrencyAmount;
  protocolFee: CurrencyAmount;
  lkbRemove: CurrencyAmount;
};

enum FunctionType {
  TYPE_SWAP_REMOTE = 1,
  TYPE_WITHDRAW_REMOTE = 4,
  TYPE_REDEEM_LOCAL_CALL_BACK = 3,
}

export class StargateBridge__evm implements BridgeApi<Signer, StargateFee> {
  protected feeLibraryCache: Map<string, StargateFeeLibrary> = new Map();
  protected readonly erc20: ERC20__api;
  constructor(
    protected readonly providerFactory: ProviderFactory,
    public readonly sdk: StargateSDK,
  ) {
    this.erc20 = new ERC20__api(providerFactory);
  }

  async getAllowance(currency: Currency, address: string): Promise<CurrencyAmount> {
    if (isNativeCurrency(currency)) return CurrencyAmount.fromRawAmount(currency, MaxUint256);
    const router = this.sdk.getRouterAddress(currency.chainId);
    return this.erc20.forToken(currency).allowance(address, router);
  }

  async approve(amount: CurrencyAmount) {
    const srcCurrency = amount.currency;
    assert(isToken(srcCurrency), 'Not a token');
    const router = this.sdk.getRouterAddress(srcCurrency.chainId);
    return this.erc20.forToken(amount.currency).approve(amount, router);
  }

  supportsTransfer(srcCurrency: Currency, dstCurrency: Currency): boolean {
    if (!isEvmChainId(srcCurrency.chainId)) return false;
    const pools = this.sdk.getAllPools();
    if (!pools.some((pool) => pool.currency.equals(srcCurrency))) return false;
    const path = this.sdk.tryGetPath(srcCurrency, dstCurrency);
    if (!path) return false;
    return !this.sdk.isDisabledPath(path.srcPool, path.dstPool);
  }

  supportsClaim(currency: Currency): boolean {
    if (!isEvmChainId(currency.chainId)) return false;
    const pools = this.sdk.getAllPools();
    return pools.some((pool) => pool.currency.equals(currency));
  }

  supportsRegister(currency: Currency): boolean {
    return this.supportsClaim(currency);
  }

  async isRegistered(currency: Currency, address: string): Promise<boolean> {
    return true;
  }

  async getUnclaimed(currency: Currency, address: string): Promise<CurrencyAmount<Currency>> {
    return CurrencyAmount.fromRawAmount(currency, 0);
  }

  claim(currency: Currency): Promise<Transaction<Signer>> {
    throw new Error('Method not supported.');
  }

  register(currency: Currency): Promise<Transaction<Signer>> {
    throw new Error('Method not supported.');
  }

  transfer(input: TransferInput): Promise<Transaction<Signer>> {
    const {srcPool} = this.sdk.getPath(input.srcCurrency, input.dstCurrency);
    if (srcPool?.poolId === 13) return this.transferEth(input);
    return this.transferToken(input);
  }

  protected async transferEth(input: TransferInput): Promise<Transaction<Signer>> {
    const {srcPool, dstPool} = this.sdk.getPath(input.srcCurrency, input.dstCurrency);
    assert(srcPool.poolId === 13, 'eth');
    assert(dstPool.poolId === 13, 'eth');
    const provider = this.providerFactory(input.srcChainId);
    const routerEthAddress = this.sdk.getRouterEthAddress(srcPool.chainId);
    const router = RouterETH__factory.connect(routerEthAddress, provider);
    const amountLD = toBigNumber(input.amount);
    const minAmountLD = toBigNumber(input.minAmount);

    const value = toBigNumber(input.amount.add(input.fee.nativeFee));

    const populatedTransaction = router.populateTransaction.swapETH(
      input.dstChainId,
      input.srcAddress,
      input.dstAddress,
      amountLD,
      minAmountLD,
      {value},
    );

    return createTransaction(populatedTransaction, {provider});
  }

  protected async transferToken(input: TransferInput): Promise<Transaction<Signer>> {
    validateInput(input);
    const {srcPool, dstPool} = this.sdk.getPath(input.srcCurrency, input.dstCurrency);

    const provider = this.providerFactory(input.srcChainId);
    const routerAddress = this.sdk.getRouterAddress(srcPool.chainId);
    const router = Router__factory.connect(routerAddress, provider);
    const amountLD = toBigNumber(input.amount);

    const minAmountLD = toBigNumber(
      // at this point the conversion is safe
      castCurrencyAmountUnsafe(input.minAmount, input.srcCurrency),
    );

    const {adapterParams} = input;

    const lzTxParams = this.lzTxParams(adapterParams);
    const payload = '0x';
    const value = toBigNumber(input.fee.nativeFee);

    const populatedTransaction = router.populateTransaction.swap(
      input.dstChainId,
      srcPool.poolId,
      dstPool.poolId,
      input.srcAddress,
      amountLD,
      minAmountLD,
      lzTxParams,
      input.dstAddress,
      payload,
      {value},
    );

    return createTransaction(populatedTransaction, {
      provider,
    });
  }

  async getMessageFee(
    srcCurrency: Currency,
    dstCurrency: Currency,
    adapterParams: AdapterParams,
  ): Promise<FeeQuote> {
    const srcChainId = srcCurrency.chainId;
    const dstChainId = dstCurrency.chainId;
    const routerAddress = this.sdk.getRouterAddress(srcChainId);
    const provider = this.providerFactory(srcChainId);
    const router = Router__factory.connect(routerAddress, provider);

    const payload = '0x';
    const lzTxParams: Router.LzTxObjStruct = this.lzTxParams(adapterParams);

    const native = getNativeCurrency(srcChainId);
    const [nativeFee, lzFee] = await router.quoteLayerZeroFee(
      dstChainId,
      FunctionType.TYPE_SWAP_REMOTE,
      ONE_ADDRESS,
      payload,
      lzTxParams,
    );
    return {
      nativeFee: toCurrencyAmount(native, nativeFee),
      zroFee: toCurrencyAmount(native, lzFee),
    };
  }

  protected lzTxParams(adapterParams: AdapterParams): Router.LzTxObjStruct {
    const lzTxParams: Router.LzTxObjStruct = {
      dstGasForCall: adapterParams.extraGas,
      dstNativeAddr: adapterParams.dstNativeAddress ?? ONE_ADDRESS,
      dstNativeAmount: adapterParams.dstNativeAmount
        ? toBigNumber(adapterParams.dstNativeAmount)
        : constants.Zero,
    };
    return lzTxParams;
  }

  protected getFeeLibraryAddress = pMemoize(
    async (lpToken: Token): Promise<string> => {
      const provider = this.providerFactory(lpToken.chainId);
      const pool = Pool__factory.connect(lpToken.address, provider);
      return pool.feeLibrary();
    },
    {cacheKey: ([lpToken]) => currencyKey(lpToken)},
  );

  protected async getFeeLibrary(lpToken: Token): Promise<StargateFeeLibrary> {
    const feeLibraryAddress = await this.getFeeLibraryAddress(lpToken);
    const provider = this.providerFactory(lpToken.chainId);
    const feeLibrary = StargateFeeLibrary__factory.connect(feeLibraryAddress, provider);
    return feeLibrary;
  }

  async getOutput(
    inputAmountLD: CurrencyAmount<Currency>,
    dstCurrency: Currency,
  ): Promise<{amount: CurrencyAmount; fee: StargateFee}> {
    const srcCurrency = inputAmountLD.currency;
    const {srcPool, dstPool} = this.sdk.getPath(srcCurrency, dstCurrency);
    const feeLibrary = await this.getFeeLibrary(srcPool.lpToken);

    const amountSD = amountLDtoSD(inputAmountLD, srcPool.lpToken);

    const srcAddress = ONE_ADDRESS;

    const fees = await feeLibrary.getFees(
      srcPool.poolId,
      dstPool.poolId,
      dstPool.chainId,
      srcAddress,
      toBigNumber(amountSD),
    );

    const feeSD = {
      eqFee: toCurrencyAmount(srcPool.lpToken, fees.eqFee),
      eqReward: toCurrencyAmount(srcPool.lpToken, fees.eqReward),
      lpFee: toCurrencyAmount(srcPool.lpToken, fees.lpFee),
      protocolFee: toCurrencyAmount(srcPool.lpToken, fees.protocolFee),
      lkbRemove: toCurrencyAmount(srcPool.lpToken, fees.lkbRemove),
    };

    const feeLD = {
      eqFee: amountSDtoLD(feeSD.eqFee, srcPool.currency),
      eqReward: amountSDtoLD(feeSD.eqReward, srcPool.currency),
      lpFee: amountSDtoLD(feeSD.lpFee, srcPool.currency),
      protocolFee: amountSDtoLD(feeSD.protocolFee, srcPool.currency),
      lkbRemove: amountSDtoLD(feeSD.lkbRemove, srcPool.currency),
    };

    const totalFeeSD = feeSD.eqFee
      //
      .add(feeSD.protocolFee)
      .add(feeSD.lpFee)
      .subtract(feeSD.eqReward);

    const totalFeeLD = amountSDtoLD(totalFeeSD, srcCurrency);
    const inputAmountSD = amountLDtoSD(inputAmountLD, srcPool.lpToken);
    const outputAmountSD = inputAmountSD.subtract(totalFeeSD);
    const outputAmountRD = amountSDtoLD(outputAmountSD, dstPool.currency);

    const output = {
      amount: outputAmountRD,
      fee: {
        totalFee: totalFeeLD,
        ...feeLD,
      },
    };
    return output;
  }

  async getLimit(srcCurrency: Currency, dstCurrency: Currency): Promise<CurrencyAmount<Currency>> {
    const {srcPool, dstPool} = this.sdk.getPath(srcCurrency, dstCurrency);

    const provider = this.providerFactory(srcPool.chainId);
    const pool = Pool__factory.connect(srcPool.lpToken.address, provider);

    const chainPath = await pool.getChainPath(dstPool.chainId, dstPool.poolId);
    const balanceLP = toCurrencyAmount(srcPool.lpToken, chainPath.balance);
    const balanceLD = amountSDtoLD(balanceLP, srcCurrency);
    return balanceLD;
  }

  async getExtraGas(srcCurrency: Currency, dstCurrency: Currency): Promise<number> {
    return 0;
  }

  async getDuration(srcCurrency: Currency, dstCurrency: Currency): Promise<number> {
    // todo: use UA configuration
    return getDefaultMessageDuration(srcCurrency.chainId, dstCurrency.chainId);
  }
}

function amountLDtoSD(amountLD: CurrencyAmount, lpToken: Currency): CurrencyAmount {
  // see Pool.sol:
  //
  // sharedDecimals = _sharedDecimals;
  // decimals = uint8(_sharedDecimals);
  const sharedDecimals = lpToken.decimals;

  return CurrencyAmount.fromRawAmount(
    lpToken,
    amountLD.multiply(BigInt(10) ** BigInt(sharedDecimals)).divide(amountLD.decimalScale).quotient,
  );
}

function amountSDtoLD(
  amountSD: CurrencyAmount,
  baseToken: Currency,
  localDecimals = baseToken.decimals,
): CurrencyAmount {
  return CurrencyAmount.fromRawAmount(
    baseToken,
    amountSD.multiply(BigInt(10) ** BigInt(localDecimals)).divide(amountSD.decimalScale).quotient,
  );
}
