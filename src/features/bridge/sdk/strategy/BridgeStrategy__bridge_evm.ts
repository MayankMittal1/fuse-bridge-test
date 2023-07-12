import {AptosBridge__evm} from '@layerzerolabs/ui-bridge-aptos';
import {Currency, CurrencyAmount} from '@layerzerolabs/ui-core';

import {AbstractBridgeStrategy, getEvmSigner} from './AbstractBridgeStrategy';
import {BridgeOutput, BridgeStrategy} from './BridgeStrategy';

export class BridgeStrategy__bridge_evm
  extends AbstractBridgeStrategy<AptosBridge__evm>
  implements BridgeStrategy
{
  constructor(api: AptosBridge__evm) {
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
