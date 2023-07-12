import {ChainId} from '@layerzerolabs/lz-sdk';
import {OnftToken} from '@layerzerolabs/ui-bridge-onft';
import {
  OnftContract,
  OnftInflightTransaction,
  OnftTokenAmount,
  OnftTransferInput,
} from '@layerzerolabs/ui-bridge-onft';
import {AdapterParams, FeeQuote, TransactionResult} from '@layerzerolabs/ui-core';

export type OnftBridgeStrategy = {
  supports(nft: OnftContract): boolean;
  transfer(input: OnftTransferInput): Promise<TransactionResult>;
  getMessageFee(
    assets: OnftTokenAmount[],
    dstChainId: ChainId,
    adapterParams: AdapterParams,
  ): Promise<FeeQuote>;
  getAssets(nft: OnftContract, address: string): Promise<OnftTokenAmount[]>;
  getExtraGas(assets: OnftToken[], dstChainId: ChainId): Promise<number>;
  isApproved(assets: OnftToken[], owner: string): Promise<boolean>;
  approve(assets: OnftToken[]): Promise<TransactionResult>;
  getInflight(address: string): Promise<OnftInflightTransaction[]>;
};
