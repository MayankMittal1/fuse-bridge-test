import {BridgeApi, TransferInput} from '@layerzerolabs/ui-bridge-sdk';
import {
  AdapterParams,
  Currency,
  CurrencyAmount,
  isEvmChainId,
  TransactionResult,
} from '@layerzerolabs/ui-core';
import {assertWallet} from '@layerzerolabs/ui-evm';
import assert from 'assert';
import {Signer as EthersSigner} from 'ethers';

import {walletStore} from '@/core/stores/walletStore';

import {BridgeOutput, BridgeStrategy} from './BridgeStrategy';

/**
 * Most methods in BridgeStrategy are just facade for BridgeApi
 * this abstract class provides default implementation
 */
export abstract class AbstractBridgeStrategy<
  Api extends BridgeApi<Signer, unknown>,
  Signer = unknown,
> implements BridgeStrategy
{
  constructor(protected readonly api: Api) {}

  async approve(amount: CurrencyAmount<Currency>): Promise<TransactionResult> {
    const tx = await this.api.approve(amount);
    const result = await tx.signAndSubmitTransaction(this.getSigner());
    return result;
  }

  supportsClaim(currency: Currency): boolean {
    return this.api.supportsClaim(currency);
  }

  supportsRegister(currency: Currency): boolean {
    return this.api.supportsRegister(currency);
  }

  abstract getSigner(): Signer;

  abstract getOutput(inputAmount: CurrencyAmount, dstCurrency: Currency): Promise<BridgeOutput>;

  async transfer(input: TransferInput) {
    const tx = await this.api.transfer(input);
    const signer = this.getSigner();
    if (isEvmChainId(input.srcChainId)) {
      // ensure wallet didn't switch
      await assertWallet(signer as EthersSigner, {
        address: input.srcAddress,
        chainId: input.srcChainId,
      });
    }
    const result = await tx.signAndSubmitTransaction(signer);
    return result;
  }

  getMessageFee(
    srcCurrency: Currency,
    dstCurrency: Currency,
    adapterParams = AdapterParams.forV1(),
  ) {
    return this.api.getMessageFee(srcCurrency, dstCurrency, adapterParams);
  }

  getLimit(srcCurrency: Currency, dstCurrency: Currency): Promise<CurrencyAmount> {
    return this.api.getLimit(srcCurrency, dstCurrency);
  }

  getExtraGas(srcCurrency: Currency, dstCurrency: Currency): Promise<number> {
    return this.api.getExtraGas(srcCurrency, dstCurrency);
  }

  getUnclaimed(currency: Currency, address: string): Promise<CurrencyAmount> {
    return this.api.getUnclaimed(currency, address);
  }

  getAllowance(currency: Currency, address: string): Promise<CurrencyAmount> {
    return this.api.getAllowance(currency, address);
  }

  isRegistered(currency: Currency, address: string): Promise<boolean> {
    return this.api.isRegistered(currency, address);
  }

  supportsTransfer(srcCurrency: Currency, dstCurrency: Currency): boolean {
    return this.api.supportsTransfer(srcCurrency, dstCurrency);
  }

  async register(currency: Currency): Promise<TransactionResult> {
    const tx = await this.api.register(currency);
    const result = await tx.signAndSubmitTransaction(this.getSigner());
    return result;
  }

  async claim(currency: Currency): Promise<TransactionResult> {
    const tx = await this.api.claim(currency);
    const result = await tx.signAndSubmitTransaction(this.getSigner());
    return result;
  }

  get estimateNative() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const strategy = this;
    return {
      async register(currency: Currency): Promise<CurrencyAmount> {
        const tx = await strategy.api.register(currency);
        return tx.estimateNative(strategy.getSigner());
      },
    };
  }
}

export function getEvmSigner() {
  const {evm} = walletStore;
  assert(evm?.signer);
  return evm.signer;
}

export function getAptosSigner() {
  const {aptos} = walletStore;
  assert(aptos?.signer);
  return aptos.signer;
}
