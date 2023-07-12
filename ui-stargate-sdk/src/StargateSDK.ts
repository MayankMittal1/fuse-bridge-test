import {PoolId} from '@layerzerolabs/sg-sdk';
import {Currency} from '@layerzerolabs/ui-core';
import {compact} from 'lodash-es';
import assert from 'assert';
import {ChainId} from '@layerzerolabs/lz-sdk';
import {StargateConfig, Path} from './StargateConfig';
import {mainnet} from './config/mainnet';

export class StargateSDK {
  // groups that can be swapped between
  private swapGroups: PoolId[][] = [[PoolId.BUSD, PoolId.USDC, PoolId.USDT]];
  constructor(private config: StargateConfig = mainnet) {}

  tryGetPoolByPoolId = (poolId?: number, chainId?: number) => {
    const pool = this.config.pools.find((p) => p.chainId === chainId && p.poolId === poolId);
    return pool;
  };

  getPoolByPoolId = (poolId: number, chainId: number) => {
    const pool = this.tryGetPoolByPoolId(poolId, chainId);
    if (pool) return pool;
    throw new Error(`No pool for poolId: ${poolId} and chainId: ${chainId}`);
  };

  getAllChainPaths = (): Path[] => {
    const {pools} = this.config;
    return compact(
      pools.flatMap((srcPool) =>
        pools.map((dstPool) =>
          this.isValidPath(srcPool, dstPool) ? {srcPool, dstPool} : undefined,
        ),
      ),
    );
  };

  getAllPools = () => {
    return this.config.pools;
  };

  getAllFarms = () => {
    return this.config.farms;
  };

  private isValidPath = (srcPool: PoolLike, dstPool: PoolLike) => {
    // don't allow same chain transfers
    if (srcPool.chainId === dstPool.chainId) return false;

    // USDT.M metis special case - can be swapped only if one of the pools is metis
    if (srcPool.poolId === 19 && dstPool.poolId === 19) {
      if (!isMetis(srcPool.chainId) && !isMetis(dstPool.chainId)) {
        return false;
      }
    }

    return (
      srcPool.poolId === dstPool.poolId ||
      // exchange groups
      this.swapGroups.some(
        (group) => group.includes(srcPool.poolId) && group.includes(dstPool.poolId),
      )
    );
  };

  tryGetPath = (srcCurrency?: Currency, dstCurrency?: Currency) => {
    if (!srcCurrency || !dstCurrency) return undefined;
    const srcPools = this.config.pools.filter((p) => p.currency.equals(srcCurrency));
    const dstPools = this.config.pools.filter((p) => p.currency.equals(dstCurrency));
    for (const srcPool of srcPools) {
      for (const dstPool of dstPools) {
        if (this.isValidPath(srcPool, dstPool)) return {srcPool, dstPool};
      }
    }
    return undefined;
  };

  getPath = (srcCurrency: Currency, dstCurrency: Currency) => {
    const path = this.tryGetPath(srcCurrency, dstCurrency);
    if (path) return path;
    throw new Error('No path found');
  };

  // other

  tryGetRouterAddress(chainId: number) {
    return this.config.router[chainId];
  }
  getRouterAddress = (chainId: number) => {
    const address = this.tryGetRouterAddress(chainId);
    assert(address, 'No router address');
    return address;
  };
  tryGetRouterEthAddress(chainId: number) {
    return this.config.routerEth[chainId];
  }
  getRouterEthAddress = (chainId: number) => {
    const address = this.tryGetRouterEthAddress(chainId);
    assert(address, 'No router ETH address');
    return address;
  };
  isDisabledPath(srcPool: PoolLike, dstPool: PoolLike): boolean {
    for (const rule of this.config.disabled) {
      if (rule.srcChainId && srcPool.chainId !== rule.srcChainId) continue;
      if (rule.dstChainId && dstPool.chainId !== rule.dstChainId) continue;
      if (rule.srcPoolId && srcPool.poolId !== rule.srcPoolId) continue;
      if (rule.dstPoolId && dstPool.poolId !== rule.dstPoolId) continue;
      return true;
    }

    return false;
  }
}

function isMetis(chainId: number) {
  return chainId === ChainId.METIS || chainId === ChainId.METIS_TESTNET;
}

type PoolLike = {
  chainId: number;
  poolId: number;
};
