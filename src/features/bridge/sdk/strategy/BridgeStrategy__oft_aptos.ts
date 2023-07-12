import {OftBridge__aptos} from '@layerzerolabs/ui-bridge-oft';
import {Currency, CurrencyAmount} from '@layerzerolabs/ui-core';

import {AbstractBridgeStrategy, getAptosSigner} from './AbstractBridgeStrategy';
import {BridgeOutput, BridgeStrategy} from './BridgeStrategy';

export class BridgeStrategy__oft_aptos
  extends AbstractBridgeStrategy<OftBridge__aptos>
  implements BridgeStrategy
{
  constructor(api: OftBridge__aptos) {
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
