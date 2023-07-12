import {ChainId} from '@layerzerolabs/lz-sdk';
import {PoolId} from '@layerzerolabs/sg-sdk';
import {AdapterParams, getNativeCurrency, parseCurrencyAmount, Token} from '@layerzerolabs/ui-core';
import {validateOutput} from '@layerzerolabs/ui-bridge-sdk';
import {getProvider} from '@layerzerolabs/ui-evm';
import {test, expect} from 'vitest';
import {StargateBridge__evm} from '../src/bridge/StargateBridge__evm';
import {mainnet as config} from '../src/config/mainnet';
import {StargateSDK} from '../src/StargateSDK';

import assert from 'assert';

test('StargateBridge', async () => {
  const providerFactory = getProvider;
  const api = new StargateBridge__evm(providerFactory, new StargateSDK(config));

  const srcPool = config.pools.find(
    (p) => p.poolId === PoolId.USDC && p.chainId === ChainId.ETHEREUM,
  );
  const dstPool = config.pools.find(
    (p) => p.poolId === PoolId.USDC && p.chainId === ChainId.AVALANCHE,
  );

  assert(srcPool);
  assert(dstPool);
  const srcNative = getNativeCurrency(srcPool.chainId);

  const limit = await api.getLimit(srcPool.currency, dstPool.currency);
  expect(limit).toBeDefined();

  const adapterParams = AdapterParams.forV1();
  const fee = await api.getMessageFee(srcPool.currency, dstPool.currency, adapterParams);

  expect(fee.nativeFee.currency.equals(srcNative)).toBeTruthy();

  const inputAmount = parseCurrencyAmount(srcPool.currency, '100');
  const output = await api.getOutput(inputAmount, dstPool.currency);
  console.log(output.amount.toExact());
  validateOutput(inputAmount, dstPool.currency, output);
  expect(output.amount.currency.equals(dstPool.currency)).toBeTruthy();

  const limitOutput = await api.getOutput(limit, dstPool.currency);
  console.log('limit', limit.toExact());
  console.log('output', limitOutput.amount.toExact());
  console.log('fee', limitOutput.fee.totalFee.toExact());
});
