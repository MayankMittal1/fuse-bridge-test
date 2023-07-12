import {TransferInput} from '@layerzerolabs/ui-bridge-sdk';
import {
  AdapterParams,
  Currency,
  CurrencyAmount,
  FeeQuote,
  TransactionResult,
} from '@layerzerolabs/ui-core';

// Todo: make interface explicit - not bridgeStore dependent
export type BridgeStrategy = {
  approve(amount: CurrencyAmount): Promise<TransactionResult>;
  transfer(input: TransferInput): Promise<TransactionResult>;

  getMessageFee(
    srcCurrency: Currency,
    dstCurrency: Currency,
    adapterParams: AdapterParams,
  ): Promise<FeeQuote>;
  getOutput(inputAmount: CurrencyAmount, dstCurrency: Currency): Promise<BridgeOutput>;
  getLimit(srcCurrency: Currency, dstCurrency: Currency): Promise<CurrencyAmount>;
  getExtraGas(srcCurrency: Currency, dstCurrency: Currency): Promise<number>;
  getUnclaimed(currency: Currency, address: string): Promise<CurrencyAmount>;
  getAllowance(currency: Currency, address: string): Promise<CurrencyAmount>;

  supportsClaim(currency: Currency): boolean;
  supportsRegister(currency: Currency): boolean;
  supportsTransfer(srcCurrency: Currency, dstCurrency: Currency): boolean;
  isRegistered(currency: Currency, address: string): Promise<boolean>;
  register(currency: Currency): Promise<TransactionResult>;
  claim(currency: Currency): Promise<TransactionResult>;

  //
  estimateNative: {
    register(currency: Currency): Promise<CurrencyAmount>;
  };
};

export type BridgeOutput = {amount: CurrencyAmount; totalFee: CurrencyAmount};
