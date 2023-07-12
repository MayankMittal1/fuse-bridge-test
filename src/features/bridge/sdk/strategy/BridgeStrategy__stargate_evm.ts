import {Currency, CurrencyAmount} from '@layerzerolabs/ui-core';
import {StargateBridge__evm} from '@layerzerolabs/ui-stargate-sdk';

import {AbstractBridgeStrategy, getEvmSigner} from './AbstractBridgeStrategy';
import {BridgeOutput, BridgeStrategy} from './BridgeStrategy';

export class BridgeStrategy__stargate_evm
  extends AbstractBridgeStrategy<StargateBridge__evm>
  implements BridgeStrategy
{
  constructor(api: StargateBridge__evm) {
    super(api);
  }

  getSigner = getEvmSigner;

  async getOutput(inputAmount: CurrencyAmount, dstCurrency: Currency): Promise<BridgeOutput> {
    const output = await this.api.getOutput(inputAmount, dstCurrency);
    return {
      amount: output.amount,
      totalFee: output.fee.totalFee,
    };
  }
}
