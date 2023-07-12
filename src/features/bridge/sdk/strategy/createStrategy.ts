import {BridgeApi, TransferInput} from '@layerzerolabs/ui-bridge-sdk';
import {Currency, CurrencyAmount, TransactionResult} from '@layerzerolabs/ui-core';

import {AbstractBridgeStrategy} from './AbstractBridgeStrategy';
import {BridgeOutput, BridgeStrategy} from './BridgeStrategy';

export function createStrategy<ApiFee, Signer>(
  api: BridgeApi<Signer, ApiFee>,
  getOutput: (ApiOutput: Awaited<ReturnType<typeof api['getOutput']>>) => BridgeOutput,
  getSigner: () => Signer,
): BridgeStrategy {
  class Strategy extends AbstractBridgeStrategy<typeof api, Signer> {
    async approve(amount: CurrencyAmount): Promise<TransactionResult> {
      const tx = await this.api.approve(amount);
      const signer = this.getSigner();
      return tx.signAndSubmitTransaction(signer);
    }
    async transfer(input: TransferInput): Promise<TransactionResult> {
      const tx = await this.api.transfer(input);
      const signer = this.getSigner();
      return tx.signAndSubmitTransaction(signer);
    }
    async getOutput(amount: CurrencyAmount, dstCurrency: Currency): Promise<BridgeOutput> {
      const apiOutput = await this.api.getOutput(amount, dstCurrency);
      return getOutput(apiOutput);
    }
    getSigner = getSigner;
  }
  return new Strategy(api);
}
