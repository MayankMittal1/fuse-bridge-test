import {ChainId} from '@layerzerolabs/lz-sdk';
import {
  OnftBridgeApi,
  OnftContract,
  OnftInflightTransaction,
  OnftToken,
  OnftTokenAmount,
  OnftTransferInput,
} from '@layerzerolabs/ui-bridge-onft';
import {AdapterParams, FeeQuote, TransactionResult} from '@layerzerolabs/ui-core';
import {assertWallet} from '@layerzerolabs/ui-wallet';
import assert from 'assert';
import {Signer} from 'ethers';

import {walletStore} from '@/core/stores/walletStore';

import {OnftBridgeStrategy} from './OnftBridgeStrategy';

export class OnftBridgeStrategy__evm implements OnftBridgeStrategy {
  constructor(protected readonly api: OnftBridgeApi<Signer>) {}

  getInflight(address: string): Promise<OnftInflightTransaction[]> {
    return this.api.getInflight(address);
  }

  getExtraGas(assets: OnftToken[], dstChainId: ChainId): Promise<number> {
    return this.api.getExtraGas(assets, dstChainId);
  }

  supports(nft: OnftContract): boolean {
    return this.api.supports(nft);
  }

  isApproved(assets: OnftToken[], owner: string): Promise<boolean> {
    return this.api.isApproved(assets, owner);
  }
  async approve(assets: OnftToken[]): Promise<TransactionResult> {
    const signer = walletStore.evm?.signer;
    assert(signer);
    // todo: ensure correct chain;
    // await switchChain(asset.nft.chainId);
    const tx = await this.api.approve(assets);
    return tx.signAndSubmitTransaction(signer);
  }

  async transfer(input: OnftTransferInput): Promise<TransactionResult> {
    const tx = await this.api.transfer(input);
    const wallet = walletStore.evm;
    assert(wallet);
    await assertWallet(wallet, {chainId: input.srcChainId, address: input.srcAddress});
    const {signer} = wallet;

    assert(signer);
    const result = await tx.signAndSubmitTransaction(signer);
    return result;
  }

  getMessageFee(
    assets: OnftTokenAmount[],
    dstChainId: ChainId,
    adapterParams: AdapterParams,
  ): Promise<FeeQuote> {
    return this.api.getMessageFee(assets, dstChainId, adapterParams);
  }

  getAssets(nft: OnftContract, address: string): Promise<OnftTokenAmount[]> {
    return this.api.getAssets(nft, address);
  }

  async estimateNative() {
    throw new Error('Not implemented');
  }
}
