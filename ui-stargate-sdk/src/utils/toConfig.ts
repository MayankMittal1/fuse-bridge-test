import {Token, getNativeCurrency} from '@layerzerolabs/ui-core';
import {FarmType, StargateConfig, StargateConfigLike, TokenLike} from '../StargateConfig';
import {ROUTER_ADDRESS, ROUTER_ETH_ADDRESS} from '@layerzerolabs/sg-sdk';
import {ChainId} from '@layerzerolabs/lz-sdk';

export function toConfig(input: StargateConfigLike): StargateConfig {
  const pools = input.pools.map((json) => {
    const chainId = json.chainId as ChainId;
    const poolId = json.poolId as number;
    const {sharedDecimals} = json;
    const token = toToken(json.token);
    const lpToken = toToken(json.lpToken);
    const currency = json.poolId === 13 ? getNativeCurrency(chainId) : token;
    const pool = {
      poolId,
      chainId,
      token,
      lpToken,
      currency,
      sharedDecimals,
    };
    return pool;
  });
  const farms = input.farms?.map((json) => {
    const chainId = json.chainId as ChainId;
    const lpToken = toToken(json.lpToken);
    const rewardToken = toToken(json.rewardToken);
    const farm = {
      type: json.type as FarmType,
      address: json.address,
      pid: json.pid,
      chainId,
      lpToken,
      rewardToken,
    };
    return farm;
  });

  const ofts = input.ofts?.map((oftConfig) => ({
    ...oftConfig,
    tokens: oftConfig.tokens.map(toToken),
  }));

  return {
    pools,
    ofts: ofts ?? [],
    farms: farms ?? [],
    router: input.router ?? ROUTER_ADDRESS,
    routerEth: input.routerEth ?? ROUTER_ETH_ADDRESS,
    disabled: input.disabled ?? [],
  };
}

function toToken({address, chainId, decimals, symbol, name}: TokenLike): Token {
  return new Token(chainId, address, decimals, symbol, name);
}
