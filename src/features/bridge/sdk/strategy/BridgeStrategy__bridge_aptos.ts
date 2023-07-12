import {AptosBridge__aptos} from '@layerzerolabs/ui-bridge-aptos';
import {Currency, CurrencyAmount} from '@layerzerolabs/ui-core';

import {AbstractBridgeStrategy, getAptosSigner} from './AbstractBridgeStrategy';
import {BridgeOutput, BridgeStrategy} from './BridgeStrategy';

export class BridgeStrategy__bridge_aptos
  extends AbstractBridgeStrategy<AptosBridge__aptos>
  implements BridgeStrategy
{
  constructor(api: AptosBridge__aptos) {
    super(api);
  }

  getSigner = getAptosSigner;

  async getOutput(inputAmount: CurrencyAmount, dstCurrency: Currency): Promise<BridgeOutput> {
    const output = await this.api.getOutput(inputAmount, dstCurrency);
    return {
      amount: output.amount,
      totalFee: output.fee,
    };
  }
}
