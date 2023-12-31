import {ChainId} from '@layerzerolabs/lz-sdk';

const WIDGET_SWAP_ADDRESS: Partial<Record<ChainId, string>> = {
  [ChainId.RINKEBY]: '0x1aE3A80BDCdFEC8c76c6049248E4139160b72FF1',
  [ChainId.BSC_TESTNET]: '0xcE375F5d95204DB9b110BE3b3C886A33c8168eB2',
  [ChainId.FUJI]: '0xcE375F5d95204DB9b110BE3b3C886A33c8168eB2',
  [ChainId.MUMBAI]: '0xcE375F5d95204DB9b110BE3b3C886A33c8168eB2',
  [ChainId.ARBITRUM_RINKEBY]: '0xcE375F5d95204DB9b110BE3b3C886A33c8168eB2',
  [ChainId.OPTIMISM_KOVAN]: '0xcE375F5d95204DB9b110BE3b3C886A33c8168eB2',
  [ChainId.FANTOM_TESTNET]: '0xcbF0B97dbe30406e974F2d1ADF19CD6667d70632',
  [ChainId.ETHEREUM]: '0x02489ac60F7f581445b7D2Dd59bb0A415A1009Df',
  [ChainId.BSC]: '0xa8BA2FF9d0D7d175b2729866bE3D9c51cACb2e00',
  [ChainId.AVALANCHE]: '0x0cFF9ACef65A64B5D76e83B70787b27F7416644C',
  [ChainId.POLYGON]: '0xc2a6a1a8accc8bd757bf4b34fbacb20fbea87f55',
  [ChainId.ARBITRUM]: '0x962F92cEe9A559d705f8999C92752EbCDD550616',
  [ChainId.OPTIMISM]: '0x16419058f15a86795933f78dC624B384D09E3a4e',
  [ChainId.FANTOM]: '0x7eA8d498d4db3a8895454F4BF3bD56385ba80968',
};

export function getPartnerWidgetAddress(chainId: ChainId): string {
  const address = WIDGET_SWAP_ADDRESS[chainId];
  if (!address) throw new Error(`NO PARTNER_SWAP_ADDRESS for ${chainId}`);
  return address;
}
