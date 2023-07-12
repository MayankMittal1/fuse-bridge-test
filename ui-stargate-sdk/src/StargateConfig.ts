import {ChainId} from '@layerzerolabs/lz-sdk';
import {Currency, Token} from '@layerzerolabs/ui-core';

export type FarmType = 'LPStaking' | 'LPStakingTime';

export type Pool = {
  chainId: ChainId;
  poolId: number;
  lpToken: Token;
  token: Token;
  currency: Currency;
};

export type Farm = {
  chainId: ChainId;
  pid: number;
  type: FarmType;
  address: string;
  lpToken: Token;
  rewardToken: Token;
};

export type TokenLike = Pick<Token, 'address' | 'chainId' | 'symbol' | 'name' | 'decimals'>;

export type PoolLike = {
  chainId: ChainId;
  poolId: number;
  lpToken: TokenLike;
  token: TokenLike;
  sharedDecimals: number;
};

export type FarmLike = {
  chainId: ChainId;
  pid: number;
  type: FarmType;
  address: string;
  lpToken: TokenLike;
  rewardToken: TokenLike;
};

export type Path = {
  srcPool: Pool;
  dstPool: Pool;
};

export type StargateConfig = {
  pools: Pool[];
  farms: Farm[];
  router: Record<number, string>;
  routerEth: Record<number, string>;
  ofts: OftBridgeConfig[];
  disabled: {srcChainId?: number; dstChainId?: number; srcPoolId?: number; dstPoolId?: number}[];
};

export type OftProxyConfig = {
  chainId: ChainId;
  address: string;
};

export type OftVersion = 0 | 1 | 2;

export type OftBridgeConfig = {
  proxy: OftProxyConfig[];
  version: OftVersion;
  tokens: Token[];
  fee: boolean;
  sharedDecimals?: number;
};

export type OftBridgeConfigLike = {
  tokens: TokenLike[];
} & Omit<OftBridgeConfig, 'tokens'>;

export type StargateConfigLike = {
  pools: PoolLike[];
  farms?: FarmLike[];
  ofts?: OftBridgeConfigLike[];
  router?: StargateConfig['router'];
  routerEth?: StargateConfig['router'];
  disabled?: StargateConfig['disabled'];
};
