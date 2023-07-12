import {OftWrapperBridge__evm} from '@layerzerolabs/ui-bridge-oft-wrapper';
import {Currency, CurrencyAmount} from '@layerzerolabs/ui-core';

import {AbstractBridgeStrategy, getEvmSigner} from './AbstractBridgeStrategy';
import {BridgeOutput, BridgeStrategy} from './BridgeStrategy';

export class BridgeStrategy__stargate_wrapper_evm
  extends AbstractBridgeStrategy<OftWrapperBridge__evm>
  implements BridgeStrategy
{
  constructor(api: OftWrapperBridge__evm) {
    super(api);
  }

  getSigner = getEvmSigner;

  async getOutput(inputAmount: CurrencyAmount, dstCurrency: Currency): Promise<BridgeOutput> {
    const output = await this.api.getOutput(inputAmount, dstCurrency);
    const totalFee = output.fee.callerFee.add(output.fee.oftFee).add(output.fee.wrapperFee);
    return {
      amount: output.amount,
      totalFee,
    };
  }
}
