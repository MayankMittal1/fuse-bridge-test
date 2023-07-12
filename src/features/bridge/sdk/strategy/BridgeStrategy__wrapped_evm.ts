import {BridgeApi} from '@layerzerolabs/ui-bridge-sdk';
import {BridgeFee} from '@layerzerolabs/ui-bridge-wrapped-token';
import {Currency, CurrencyAmount} from '@layerzerolabs/ui-core';
import {Signer} from 'ethers';

import {AbstractBridgeStrategy, getEvmSigner} from './AbstractBridgeStrategy';
import {BridgeOutput, BridgeStrategy} from './BridgeStrategy';

type Api = BridgeApi<Signer, BridgeFee>;

export class BridgeStrategy__wrapped_evm
  extends AbstractBridgeStrategy<Api>
  implements BridgeStrategy
{
  constructor(api: Api) {
    super(api);
  }

  getSigner = getEvmSigner;

  async getOutput(
    inputAmount: CurrencyAmount<Currency>,
    dstCurrency: Currency,
  ): Promise<BridgeOutput> {
    const output = await this.api.getOutput(inputAmount, dstCurrency);
    return {
      amount: output.amount,
      totalFee: output.fee,
    };
  }
}
