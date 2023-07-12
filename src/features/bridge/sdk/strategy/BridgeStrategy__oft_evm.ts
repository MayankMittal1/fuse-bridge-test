import {OftBridge__evm} from '@layerzerolabs/ui-bridge-oft';
import {Currency, CurrencyAmount} from '@layerzerolabs/ui-core';

import {AbstractBridgeStrategy, getEvmSigner} from './AbstractBridgeStrategy';
import {BridgeOutput, BridgeStrategy} from './BridgeStrategy';

export class BridgeStrategy__oft_evm
  extends AbstractBridgeStrategy<OftBridge__evm>
  implements BridgeStrategy
{
  constructor(api: OftBridge__evm) {
    super(api);
  }

  getSigner = getEvmSigner;

  async getOutput(inputAmount: CurrencyAmount, dstCurrency: Currency): Promise<BridgeOutput> {
    const output = await this.api.getOutput(inputAmount, dstCurrency);
    return {
      amount: output.amount,
      totalFee: output.fee,
    };
  }
}
