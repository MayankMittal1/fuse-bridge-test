import { getNativeCurrency, Token, isNativeCurrency, CurrencyAmount, MaxUint256, isToken, isEvmChainId, toBigNumber, castCurrencyAmountUnsafe, toCurrencyAmount, getDefaultMessageDuration } from '@layerzerolabs/ui-core';
import { ROUTER_ADDRESS, ROUTER_ETH_ADDRESS, PoolId } from '@layerzerolabs/sg-sdk';
import { validateInput } from '@layerzerolabs/ui-bridge-sdk';
import { createTransaction, ONE_ADDRESS } from '@layerzerolabs/ui-evm';
import assert from 'assert';
import { constants, utils, Contract } from 'ethers';
import { ERC20__api } from '@layerzerolabs/ui-erc20-sdk';
import pMemoize from 'p-memoize';
import { ChainId } from '@layerzerolabs/lz-sdk';
import { compact } from 'lodash-es';

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/config/mainnet/pools.json
var pools_default = [
  {
    chainId: 101,
    poolId: 1,
    sharedDecimals: 6,
    token: {
      chainId: 101,
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      symbol: "USDC",
      decimals: 6,
      name: "USD Coin"
    },
    lpToken: {
      chainId: 101,
      address: "0xdf0770dF86a8034b3EFEf0A1Bb3c889B8332FF56",
      symbol: "S*USDC",
      decimals: 6,
      name: "USD Coin-LP"
    }
  },
  {
    chainId: 101,
    poolId: 2,
    sharedDecimals: 6,
    token: {
      chainId: 101,
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      symbol: "USDT",
      decimals: 6,
      name: "Tether USD"
    },
    lpToken: {
      chainId: 101,
      address: "0x38EA452219524Bb87e18dE1C24D3bB59510BD783",
      symbol: "S*USDT",
      decimals: 6,
      name: "Tether USD-LP"
    }
  },
  {
    chainId: 101,
    poolId: 11,
    sharedDecimals: 18,
    token: {
      chainId: 101,
      address: "0x0C10bF8FcB7Bf5412187A595ab97a3609160b5c6",
      symbol: "USDD",
      decimals: 18,
      name: "Decentralized USD"
    },
    lpToken: {
      chainId: 101,
      address: "0x692953e758c3669290cb1677180c64183cEe374e",
      symbol: "S*USDD",
      decimals: 18,
      name: "Decentralized USD-LP"
    }
  },
  {
    chainId: 101,
    poolId: 13,
    sharedDecimals: 18,
    token: {
      chainId: 101,
      address: "0x72E2F4830b9E45d52F80aC08CB2bEC0FeF72eD9c",
      symbol: "SGETH",
      decimals: 18,
      name: "Stargate Ether Vault"
    },
    lpToken: {
      chainId: 101,
      address: "0x101816545F6bd2b1076434B54383a1E633390A2E",
      symbol: "S*SGETH",
      decimals: 18,
      name: "Stargate Ether Vault-LP"
    }
  },
  {
    chainId: 101,
    poolId: 3,
    sharedDecimals: 6,
    token: {
      chainId: 101,
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      symbol: "DAI",
      decimals: 18,
      name: "Dai Stablecoin"
    },
    lpToken: {
      chainId: 101,
      address: "0x0Faf1d2d3CED330824de3B8200fc8dc6E397850d",
      symbol: "S*DAI",
      decimals: 6,
      name: "Dai Stablecoin-LP"
    }
  },
  {
    chainId: 101,
    poolId: 7,
    sharedDecimals: 6,
    token: {
      chainId: 101,
      address: "0x853d955aCEf822Db058eb8505911ED77F175b99e",
      symbol: "FRAX",
      decimals: 18,
      name: "Frax"
    },
    lpToken: {
      chainId: 101,
      address: "0xfA0F307783AC21C39E939ACFF795e27b650F6e68",
      symbol: "S*FRAX",
      decimals: 6,
      name: "Frax-LP"
    }
  },
  {
    chainId: 101,
    poolId: 14,
    sharedDecimals: 6,
    token: {
      chainId: 101,
      address: "0x57Ab1ec28D129707052df4dF418D58a2D46d5f51",
      symbol: "sUSD",
      decimals: 18,
      name: "Synth sUSD"
    },
    lpToken: {
      chainId: 101,
      address: "0x590d4f8A68583639f215f675F3a259Ed84790580",
      symbol: "S*sUSD",
      decimals: 6,
      name: "Synth sUSD-LP"
    }
  },
  {
    chainId: 101,
    poolId: 15,
    sharedDecimals: 6,
    token: {
      chainId: 101,
      address: "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0",
      symbol: "LUSD",
      decimals: 18,
      name: "LUSD Stablecoin"
    },
    lpToken: {
      chainId: 101,
      address: "0xE8F55368C82D38bbbbDb5533e7F56AfC2E978CC2",
      symbol: "S*LUSD",
      decimals: 6,
      name: "LUSD Stablecoin-LP"
    }
  },
  {
    chainId: 101,
    poolId: 16,
    sharedDecimals: 6,
    token: {
      chainId: 101,
      address: "0x8D6CeBD76f18E1558D4DB88138e2DeFB3909fAD6",
      symbol: "MAI",
      decimals: 18,
      name: "Mai Stablecoin"
    },
    lpToken: {
      chainId: 101,
      address: "0x9cef9a0b1bE0D289ac9f4a98ff317c33EAA84eb8",
      symbol: "S*MAI",
      decimals: 6,
      name: "Mai Stablecoin-LP"
    }
  },
  {
    chainId: 101,
    poolId: 17,
    sharedDecimals: 18,
    token: {
      chainId: 101,
      address: "0x9E32b13ce7f2E80A01932B42553652E053D6ed8e",
      symbol: "Metis",
      decimals: 18,
      name: "Metis Token"
    },
    lpToken: {
      chainId: 101,
      address: "0xd8772edBF88bBa2667ed011542343b0eDDaCDa47",
      symbol: "S*Metis",
      decimals: 18,
      name: "Metis Token-LP"
    }
  },
  {
    chainId: 101,
    poolId: 19,
    sharedDecimals: 6,
    token: {
      chainId: 101,
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      symbol: "USDT",
      decimals: 6,
      name: "Tether USD"
    },
    lpToken: {
      chainId: 101,
      address: "0x430Ebff5E3E80A6C58E7e6ADA1d90F5c28AA116d",
      symbol: "S*USDT",
      decimals: 6,
      name: "Tether USD-LP"
    }
  },
  {
    chainId: 101,
    poolId: 20,
    sharedDecimals: 18,
    token: {
      chainId: 101,
      address: "0x4691937a7508860F876c9c0a2a617E7d9E945D4B",
      symbol: "WOO",
      decimals: 18,
      name: "Wootrade Network"
    },
    lpToken: {
      chainId: 101,
      address: "0x1CE66c52C36757Daf6551eDc04800A0Ec9983A09",
      symbol: "S*WOO",
      decimals: 18,
      name: "Wootrade Network-LP"
    }
  },
  {
    chainId: 102,
    poolId: 2,
    sharedDecimals: 6,
    token: {
      chainId: 102,
      address: "0x55d398326f99059fF775485246999027B3197955",
      symbol: "USDT",
      decimals: 18,
      name: "Tether USD"
    },
    lpToken: {
      chainId: 102,
      address: "0x9aA83081AA06AF7208Dcc7A4cB72C94d057D2cda",
      symbol: "S*USDT",
      decimals: 6,
      name: "Tether USD-LP"
    }
  },
  {
    chainId: 102,
    poolId: 5,
    sharedDecimals: 6,
    token: {
      chainId: 102,
      address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      symbol: "BUSD",
      decimals: 18,
      name: "BUSD Token"
    },
    lpToken: {
      chainId: 102,
      address: "0x98a5737749490856b401DB5Dc27F522fC314A4e1",
      symbol: "S*BUSD",
      decimals: 6,
      name: "BUSD Token-LP"
    }
  },
  {
    chainId: 102,
    poolId: 11,
    sharedDecimals: 18,
    token: {
      chainId: 102,
      address: "0xd17479997F34dd9156Deef8F95A52D81D265be9c",
      symbol: "USDD",
      decimals: 18,
      name: "Decentralized USD"
    },
    lpToken: {
      chainId: 102,
      address: "0x4e145a589e4c03cBe3d28520e4BF3089834289Df",
      symbol: "S*USDD",
      decimals: 18,
      name: "Decentralized USD-LP"
    }
  },
  {
    chainId: 102,
    poolId: 16,
    sharedDecimals: 6,
    token: {
      chainId: 102,
      address: "0x3F56e0c36d275367b8C502090EDF38289b3dEa0d",
      symbol: "MAI",
      decimals: 18,
      name: "Mai Stablecoin"
    },
    lpToken: {
      chainId: 102,
      address: "0x7BfD7f2498C4796f10b6C611D9db393D3052510C",
      symbol: "S*MAI",
      decimals: 6,
      name: "Mai Stablecoin-LP"
    }
  },
  {
    chainId: 102,
    poolId: 17,
    sharedDecimals: 18,
    token: {
      chainId: 102,
      address: "0xe552Fb52a4F19e44ef5A967632DBc320B0820639",
      symbol: "Metis",
      decimals: 18,
      name: "Metis Token"
    },
    lpToken: {
      chainId: 102,
      address: "0xD4CEc732b3B135eC52a3c0bc8Ce4b8cFb9dacE46",
      symbol: "S*Metis",
      decimals: 18,
      name: "Metis Token-LP"
    }
  },
  {
    chainId: 102,
    poolId: 19,
    sharedDecimals: 6,
    token: {
      chainId: 102,
      address: "0x55d398326f99059fF775485246999027B3197955",
      symbol: "USDT",
      decimals: 18,
      name: "Tether USD"
    },
    lpToken: {
      chainId: 102,
      address: "0x68C6c27fB0e02285829e69240BE16f32C5f8bEFe",
      symbol: "S*USDT",
      decimals: 6,
      name: "Tether USD-LP"
    }
  },
  {
    chainId: 102,
    poolId: 20,
    sharedDecimals: 18,
    token: {
      chainId: 102,
      address: "0x4691937a7508860F876c9c0a2a617E7d9E945D4B",
      symbol: "WOO",
      decimals: 18,
      name: "Wootrade Network"
    },
    lpToken: {
      chainId: 102,
      address: "0x5a0F550bfCaDe1D898034D57A6f72E7Aef32CE79",
      symbol: "S*WOO",
      decimals: 18,
      name: "Wootrade Network-LP"
    }
  },
  {
    chainId: 106,
    poolId: 1,
    sharedDecimals: 6,
    token: {
      chainId: 106,
      address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      symbol: "USDC",
      decimals: 6,
      name: "USD Coin"
    },
    lpToken: {
      chainId: 106,
      address: "0x1205f31718499dBf1fCa446663B532Ef87481fe1",
      symbol: "S*USDC",
      decimals: 6,
      name: "USD Coin-LP"
    }
  },
  {
    chainId: 106,
    poolId: 2,
    sharedDecimals: 6,
    token: {
      chainId: 106,
      address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
      symbol: "USDt",
      decimals: 6,
      name: "TetherToken"
    },
    lpToken: {
      chainId: 106,
      address: "0x29e38769f23701A2e4A8Ef0492e19dA4604Be62c",
      symbol: "S*USDt",
      decimals: 6,
      name: "TetherToken-LP"
    }
  },
  {
    chainId: 106,
    poolId: 7,
    sharedDecimals: 6,
    token: {
      chainId: 106,
      address: "0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64",
      symbol: "FRAX",
      decimals: 18,
      name: "Frax"
    },
    lpToken: {
      chainId: 106,
      address: "0x1c272232Df0bb6225dA87f4dEcD9d37c32f63Eea",
      symbol: "S*FRAX",
      decimals: 6,
      name: "Frax-LP"
    }
  },
  {
    chainId: 106,
    poolId: 16,
    sharedDecimals: 6,
    token: {
      chainId: 106,
      address: "0x5c49b268c9841AFF1Cc3B0a418ff5c3442eE3F3b",
      symbol: "MAI",
      decimals: 18,
      name: "Mai Stablecoin"
    },
    lpToken: {
      chainId: 106,
      address: "0x8736f92646B2542B3e5F3c63590cA7Fe313e283B",
      symbol: "S*MAI",
      decimals: 6,
      name: "Mai Stablecoin-LP"
    }
  },
  {
    chainId: 106,
    poolId: 19,
    sharedDecimals: 6,
    token: {
      chainId: 106,
      address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
      symbol: "USDt",
      decimals: 6,
      name: "TetherToken"
    },
    lpToken: {
      chainId: 106,
      address: "0xEAe5c2F6B25933deB62f754f239111413A0A25ef",
      symbol: "S*USDt",
      decimals: 6,
      name: "TetherToken-LP"
    }
  },
  {
    chainId: 106,
    poolId: 20,
    sharedDecimals: 18,
    token: {
      chainId: 106,
      address: "0xaBC9547B534519fF73921b1FBA6E672b5f58D083",
      symbol: "WOO.e",
      decimals: 18,
      name: "Wootrade Network"
    },
    lpToken: {
      chainId: 106,
      address: "0x45524dc9d05269E1101Ad7Cff1639AE2aA20989d",
      symbol: "S*WOO.e",
      decimals: 18,
      name: "Wootrade Network-LP"
    }
  },
  {
    chainId: 109,
    poolId: 1,
    sharedDecimals: 6,
    token: {
      chainId: 109,
      address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      symbol: "USDC",
      decimals: 6,
      name: "USD Coin (PoS)"
    },
    lpToken: {
      chainId: 109,
      address: "0x1205f31718499dBf1fCa446663B532Ef87481fe1",
      symbol: "S*USDC",
      decimals: 6,
      name: "USD Coin (PoS)-LP"
    }
  },
  {
    chainId: 109,
    poolId: 2,
    sharedDecimals: 6,
    token: {
      chainId: 109,
      address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      symbol: "USDT",
      decimals: 6,
      name: "(PoS) Tether USD"
    },
    lpToken: {
      chainId: 109,
      address: "0x29e38769f23701A2e4A8Ef0492e19dA4604Be62c",
      symbol: "S*USDT",
      decimals: 6,
      name: "(PoS) Tether USD-LP"
    }
  },
  {
    chainId: 109,
    poolId: 3,
    sharedDecimals: 6,
    token: {
      chainId: 109,
      address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      symbol: "DAI",
      decimals: 18,
      name: "(PoS) Dai Stablecoin"
    },
    lpToken: {
      chainId: 109,
      address: "0x1c272232Df0bb6225dA87f4dEcD9d37c32f63Eea",
      symbol: "S*DAI",
      decimals: 6,
      name: "(PoS) Dai Stablecoin-LP"
    }
  },
  {
    chainId: 109,
    poolId: 16,
    sharedDecimals: 6,
    token: {
      chainId: 109,
      address: "0xa3Fa99A148fA48D14Ed51d610c367C61876997F1",
      symbol: "miMATIC",
      decimals: 18,
      name: "miMATIC"
    },
    lpToken: {
      chainId: 109,
      address: "0x8736f92646B2542B3e5F3c63590cA7Fe313e283B",
      symbol: "S*miMATIC",
      decimals: 6,
      name: "miMATIC-LP"
    }
  },
  {
    chainId: 109,
    poolId: 20,
    sharedDecimals: 18,
    token: {
      chainId: 109,
      address: "0x1B815d120B3eF02039Ee11dC2d33DE7aA4a8C603",
      symbol: "WOO",
      decimals: 18,
      name: "Wootrade Network (PoS)"
    },
    lpToken: {
      chainId: 109,
      address: "0xEAe5c2F6B25933deB62f754f239111413A0A25ef",
      symbol: "S*WOO",
      decimals: 18,
      name: "Wootrade Network (PoS)-LP"
    }
  },
  {
    chainId: 110,
    poolId: 1,
    sharedDecimals: 6,
    token: {
      chainId: 110,
      address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
      symbol: "USDC",
      decimals: 6,
      name: "USD Coin (Arb1)"
    },
    lpToken: {
      chainId: 110,
      address: "0x892785f33CdeE22A30AEF750F285E18c18040c3e",
      symbol: "S*USDC",
      decimals: 6,
      name: "USD Coin (Arb1)-LP"
    }
  },
  {
    chainId: 110,
    poolId: 2,
    sharedDecimals: 6,
    token: {
      chainId: 110,
      address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      symbol: "USDT",
      decimals: 6,
      name: "Tether USD"
    },
    lpToken: {
      chainId: 110,
      address: "0xB6CfcF89a7B22988bfC96632aC2A9D6daB60d641",
      symbol: "S*USDT",
      decimals: 6,
      name: "Tether USD-LP"
    }
  },
  {
    chainId: 110,
    poolId: 13,
    sharedDecimals: 18,
    token: {
      chainId: 110,
      address: "0x82CbeCF39bEe528B5476FE6d1550af59a9dB6Fc0",
      symbol: "SGETH",
      decimals: 18,
      name: "Stargate Ether Vault"
    },
    lpToken: {
      chainId: 110,
      address: "0x915A55e36A01285A14f05dE6e81ED9cE89772f8e",
      symbol: "S*SGETH",
      decimals: 18,
      name: "Stargate Ether Vault-LP"
    }
  },
  {
    chainId: 110,
    poolId: 7,
    sharedDecimals: 6,
    token: {
      chainId: 110,
      address: "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F",
      symbol: "FRAX",
      decimals: 18,
      name: "Frax"
    },
    lpToken: {
      chainId: 110,
      address: "0xaa4BF442F024820B2C28Cd0FD72b82c63e66F56C",
      symbol: "S*FRAX",
      decimals: 6,
      name: "Frax-LP"
    }
  },
  {
    chainId: 110,
    poolId: 16,
    sharedDecimals: 6,
    token: {
      chainId: 110,
      address: "0x3F56e0c36d275367b8C502090EDF38289b3dEa0d",
      symbol: "MAI",
      decimals: 18,
      name: "Mai Stablecoin"
    },
    lpToken: {
      chainId: 110,
      address: "0xF39B7Be294cB36dE8c510e267B82bb588705d977",
      symbol: "S*MAI",
      decimals: 6,
      name: "Mai Stablecoin-LP"
    }
  },
  {
    chainId: 110,
    poolId: 15,
    sharedDecimals: 6,
    token: {
      chainId: 110,
      address: "0x93b346b6BC2548dA6A1E7d98E9a421B42541425b",
      symbol: "LUSD",
      decimals: 18,
      name: "LUSD Stablecoin"
    },
    lpToken: {
      chainId: 110,
      address: "0x600E576F9d853c95d58029093A16EE49646F3ca5",
      symbol: "S*LUSD",
      decimals: 6,
      name: "LUSD Stablecoin-LP"
    }
  },
  {
    chainId: 110,
    poolId: 20,
    sharedDecimals: 18,
    token: {
      chainId: 110,
      address: "0xcAFcD85D8ca7Ad1e1C6F82F651fA15E33AEfD07b",
      symbol: "WOO",
      decimals: 18,
      name: "Wootrade Network"
    },
    lpToken: {
      chainId: 110,
      address: "0x1aE7ca4092C0027bBbB1ce99934528aCf6e7074B",
      symbol: "S*WOO",
      decimals: 18,
      name: "Wootrade Network-LP"
    }
  },
  {
    chainId: 111,
    poolId: 1,
    sharedDecimals: 6,
    token: {
      chainId: 111,
      address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
      symbol: "USDC",
      decimals: 6,
      name: "USD Coin"
    },
    lpToken: {
      chainId: 111,
      address: "0xDecC0c09c3B5f6e92EF4184125D5648a66E35298",
      symbol: "S*USDC",
      decimals: 6,
      name: "USD Coin-LP"
    }
  },
  {
    chainId: 111,
    poolId: 13,
    sharedDecimals: 18,
    token: {
      chainId: 111,
      address: "0xb69c8CBCD90A39D8D3d3ccf0a3E968511C3856A0",
      symbol: "SGETH",
      decimals: 18,
      name: "Stargate Ether Vault"
    },
    lpToken: {
      chainId: 111,
      address: "0xd22363e3762cA7339569F3d33EADe20127D5F98C",
      symbol: "S*SGETH",
      decimals: 18,
      name: "Stargate Ether Vault-LP"
    }
  },
  {
    chainId: 111,
    poolId: 3,
    sharedDecimals: 6,
    token: {
      chainId: 111,
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      symbol: "DAI",
      decimals: 18,
      name: "Dai Stablecoin"
    },
    lpToken: {
      chainId: 111,
      address: "0x165137624F1f692e69659f944BF69DE02874ee27",
      symbol: "S*DAI",
      decimals: 6,
      name: "Dai Stablecoin-LP"
    }
  },
  {
    chainId: 111,
    poolId: 7,
    sharedDecimals: 6,
    token: {
      chainId: 111,
      address: "0x2E3D870790dC77A83DD1d18184Acc7439A53f475",
      symbol: "FRAX",
      decimals: 18,
      name: "Frax"
    },
    lpToken: {
      chainId: 111,
      address: "0x368605D9C6243A80903b9e326f1Cddde088B8924",
      symbol: "S*FRAX",
      decimals: 6,
      name: "Frax-LP"
    }
  },
  {
    chainId: 111,
    poolId: 14,
    sharedDecimals: 6,
    token: {
      chainId: 111,
      address: "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9",
      symbol: "sUSD",
      decimals: 18,
      name: "Synth sUSD"
    },
    lpToken: {
      chainId: 111,
      address: "0x2F8bC9081c7FCFeC25b9f41a50d97EaA592058ae",
      symbol: "S*sUSD",
      decimals: 6,
      name: "Synth sUSD-LP"
    }
  },
  {
    chainId: 111,
    poolId: 15,
    sharedDecimals: 6,
    token: {
      chainId: 111,
      address: "0xc40F949F8a4e094D1b49a23ea9241D289B7b2819",
      symbol: "LUSD",
      decimals: 18,
      name: "LUSD Stablecoin"
    },
    lpToken: {
      chainId: 111,
      address: "0x3533F5e279bDBf550272a199a223dA798D9eff78",
      symbol: "S*LUSD",
      decimals: 6,
      name: "LUSD Stablecoin-LP"
    }
  },
  {
    chainId: 111,
    poolId: 16,
    sharedDecimals: 6,
    token: {
      chainId: 111,
      address: "0xdFA46478F9e5EA86d57387849598dbFB2e964b02",
      symbol: "MAI",
      decimals: 18,
      name: "Mai Stablecoin"
    },
    lpToken: {
      chainId: 111,
      address: "0x5421FA1A48f9FF81e4580557E86C7C0D24C18036",
      symbol: "S*MAI",
      decimals: 6,
      name: "Mai Stablecoin-LP"
    }
  },
  {
    chainId: 111,
    poolId: 20,
    sharedDecimals: 18,
    token: {
      chainId: 111,
      address: "0x871f2F2ff935FD1eD867842FF2a7bfD051A5E527",
      symbol: "WOO",
      decimals: 18,
      name: "Wootrade Network"
    },
    lpToken: {
      chainId: 111,
      address: "0xB0a7e3b4aedB6F103BC43f2603c6e73151c8886b",
      symbol: "S*WOO",
      decimals: 18,
      name: "Wootrade Network-LP"
    }
  },
  {
    chainId: 112,
    poolId: 1,
    sharedDecimals: 6,
    token: {
      chainId: 112,
      address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
      symbol: "USDC",
      decimals: 6,
      name: "USD Coin"
    },
    lpToken: {
      chainId: 112,
      address: "0x12edeA9cd262006cC3C4E77c90d2CD2DD4b1eb97",
      symbol: "S*USDC",
      decimals: 6,
      name: "USD Coin-LP"
    }
  },
  {
    chainId: 112,
    poolId: 20,
    sharedDecimals: 18,
    token: {
      chainId: 112,
      address: "0x6626c47c00F1D87902fc13EECfaC3ed06D5E8D8a",
      symbol: "WOO",
      decimals: 18,
      name: "Wootrade Network"
    },
    lpToken: {
      chainId: 112,
      address: "0x333b6E02eFFD8bE6075F3de0D8075FeD842dd9a3",
      symbol: "S*WOO",
      decimals: 18,
      name: "Wootrade Network-LP"
    }
  },
  {
    chainId: 151,
    poolId: 17,
    sharedDecimals: 18,
    token: {
      chainId: 151,
      address: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
      symbol: "Metis",
      decimals: 18,
      name: "Metis Token"
    },
    lpToken: {
      chainId: 151,
      address: "0xAad094F6A75A14417d39f04E690fC216f080A41a",
      symbol: "S*Metis",
      decimals: 18,
      name: "Metis Token-LP"
    }
  },
  {
    chainId: 151,
    poolId: 19,
    sharedDecimals: 6,
    token: {
      chainId: 151,
      address: "0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC",
      symbol: "m.USDT",
      decimals: 6,
      name: "USDT Token"
    },
    lpToken: {
      chainId: 151,
      address: "0x2b60473a7C41Deb80EDdaafD5560e963440eb632",
      symbol: "S*m.USDT",
      decimals: 6,
      name: "USDT Token-LP"
    }
  }
];
function toConfig(input) {
  var _a, _b, _c, _d, _e;
  const pools = input.pools.map((json) => {
    const chainId = json.chainId;
    const poolId = json.poolId;
    const { sharedDecimals } = json;
    const token = toToken(json.token);
    const lpToken = toToken(json.lpToken);
    const currency = json.poolId === 13 ? getNativeCurrency(chainId) : token;
    const pool = {
      poolId,
      chainId,
      token,
      lpToken,
      currency,
      sharedDecimals
    };
    return pool;
  });
  const farms = (_a = input.farms) == null ? void 0 : _a.map((json) => {
    const chainId = json.chainId;
    const lpToken = toToken(json.lpToken);
    const rewardToken = toToken(json.rewardToken);
    const farm = {
      type: json.type,
      address: json.address,
      pid: json.pid,
      chainId,
      lpToken,
      rewardToken
    };
    return farm;
  });
  const ofts = (_b = input.ofts) == null ? void 0 : _b.map((oftConfig) => __spreadProps(__spreadValues({}, oftConfig), {
    tokens: oftConfig.tokens.map(toToken)
  }));
  return {
    pools,
    ofts: ofts != null ? ofts : [],
    farms: farms != null ? farms : [],
    router: (_c = input.router) != null ? _c : ROUTER_ADDRESS,
    routerEth: (_d = input.routerEth) != null ? _d : ROUTER_ETH_ADDRESS,
    disabled: (_e = input.disabled) != null ? _e : []
  };
}
function toToken({ address, chainId, decimals, symbol, name }) {
  return new Token(chainId, address, decimals, symbol, name);
}

// src/config/mainnet.ts
var mainnet = toConfig({ pools: pools_default });
var _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_router",
        type: "address"
      },
      {
        internalType: "address",
        name: "_token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_sharedDecimals",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_localDecimals",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_feeLibrary",
        type: "address"
      },
      {
        internalType: "string",
        name: "_name",
        type: "string"
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountLP",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountSD",
        type: "uint256"
      }
    ],
    name: "Burn",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "dstChainId",
        type: "uint16"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "dstPoolId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "weight",
        type: "uint256"
      }
    ],
    name: "ChainPathUpdate",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "chainId",
        type: "uint16"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "srcPoolId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountSD",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "idealBalance",
        type: "uint256"
      }
    ],
    name: "CreditChainPath",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "batched",
        type: "bool"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "swapDeltaBP",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lpDeltaBP",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "defaultSwapMode",
        type: "bool"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "defaultLPMode",
        type: "bool"
      }
    ],
    name: "DeltaParamUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "feeLibraryAddr",
        type: "address"
      }
    ],
    name: "FeeLibraryUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "mintFeeBP",
        type: "uint256"
      }
    ],
    name: "FeesUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountLP",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountSD",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "InstantRedeemLocal",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountLP",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountSD",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "mintFeeAmountSD",
        type: "uint256"
      }
    ],
    name: "Mint",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountLP",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountSD",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "chainId",
        type: "uint16"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "dstPoolId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "RedeemLocal",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amountSD",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amountToMintSD",
        type: "uint256"
      }
    ],
    name: "RedeemLocalCallback",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "chainId",
        type: "uint16"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "dstPoolId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountLP",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountSD",
        type: "uint256"
      }
    ],
    name: "RedeemRemote",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "dstChainId",
        type: "uint16"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "dstPoolId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "credits",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "idealBalance",
        type: "uint256"
      }
    ],
    name: "SendCredits",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "swapStop",
        type: "bool"
      }
    ],
    name: "StopSwapUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "chainId",
        type: "uint16"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "dstPoolId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountSD",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "eqReward",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "eqFee",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "protocolFee",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lpFee",
        type: "uint256"
      }
    ],
    name: "Swap",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountSD",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "protocolFee",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "dstFee",
        type: "uint256"
      }
    ],
    name: "SwapRemote",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountSD",
        type: "uint256"
      }
    ],
    name: "WithdrawMintFeeBalance",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountSD",
        type: "uint256"
      }
    ],
    name: "WithdrawProtocolFeeBalance",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "srcChainId",
        type: "uint16"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "srcPoolId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "swapAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "mintAmount",
        type: "uint256"
      }
    ],
    name: "WithdrawRemote",
    type: "event"
  },
  {
    inputs: [],
    name: "BP_DENOMINATOR",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      }
    ],
    name: "activateChainPath",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "batched",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_fullMode",
        type: "bool"
      }
    ],
    name: "callDelta",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "chainPathIndexLookup",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "chainPaths",
    outputs: [
      {
        internalType: "bool",
        name: "ready",
        type: "bool"
      },
      {
        internalType: "uint16",
        name: "dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "dstPoolId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "weight",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "lkb",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "credits",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "idealBalance",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "convertRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_weight",
        type: "uint256"
      }
    ],
    name: "createChainPath",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "credits",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "idealBalance",
            type: "uint256"
          }
        ],
        internalType: "struct Pool.CreditObj",
        name: "_c",
        type: "tuple"
      }
    ],
    name: "creditChainPath",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256"
      }
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "defaultLPMode",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "defaultSwapMode",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "deltaCredit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "eqFeePool",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "feeLibrary",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      }
    ],
    name: "getChainPath",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "ready",
            type: "bool"
          },
          {
            internalType: "uint16",
            name: "dstChainId",
            type: "uint16"
          },
          {
            internalType: "uint256",
            name: "dstPoolId",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "weight",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "lkb",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "credits",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "idealBalance",
            type: "uint256"
          }
        ],
        internalType: "struct Pool.ChainPath",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getChainPathsLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256"
      }
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_amountLP",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_to",
        type: "address"
      }
    ],
    name: "instantRedeemLocal",
    outputs: [
      {
        internalType: "uint256",
        name: "amountSD",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "localDecimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "lpDeltaBP",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_amountLD",
        type: "uint256"
      }
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "mintFeeBP",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "mintFeeBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8"
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32"
      }
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "poolId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "protocolFeeBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_amountLP",
        type: "uint256"
      },
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_to",
        type: "address"
      }
    ],
    name: "redeemLocal",
    outputs: [
      {
        internalType: "uint256",
        name: "amountSD",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_srcChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_srcPoolId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_amountSD",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_amountToMintSD",
        type: "uint256"
      }
    ],
    name: "redeemLocalCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_srcChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_srcPoolId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_amountSD",
        type: "uint256"
      }
    ],
    name: "redeemLocalCheckOnRemote",
    outputs: [
      {
        internalType: "uint256",
        name: "swapAmount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "mintAmount",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_from",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_amountLP",
        type: "uint256"
      }
    ],
    name: "redeemRemote",
    outputs: [
      {
        internalType: "uint256",
        name: "amountLD",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "router",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      }
    ],
    name: "sendCredits",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "credits",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "idealBalance",
            type: "uint256"
          }
        ],
        internalType: "struct Pool.CreditObj",
        name: "c",
        type: "tuple"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_batched",
        type: "bool"
      },
      {
        internalType: "uint256",
        name: "_swapDeltaBP",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_lpDeltaBP",
        type: "uint256"
      },
      {
        internalType: "bool",
        name: "_defaultSwapMode",
        type: "bool"
      },
      {
        internalType: "bool",
        name: "_defaultLPMode",
        type: "bool"
      }
    ],
    name: "setDeltaParam",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_mintFeeBP",
        type: "uint256"
      }
    ],
    name: "setFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_feeLibraryAddr",
        type: "address"
      }
    ],
    name: "setFeeLibrary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_swapStop",
        type: "bool"
      }
    ],
    name: "setSwapStop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      },
      {
        internalType: "uint16",
        name: "_weight",
        type: "uint16"
      }
    ],
    name: "setWeightForChainPath",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "sharedDecimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "stopSwap",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_from",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_amountLD",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_minAmountLD",
        type: "uint256"
      },
      {
        internalType: "bool",
        name: "newLiquidity",
        type: "bool"
      }
    ],
    name: "swap",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "eqFee",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "eqReward",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "lpFee",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "protocolFee",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "lkbRemove",
            type: "uint256"
          }
        ],
        internalType: "struct Pool.SwapObj",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "swapDeltaBP",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_srcChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_srcPoolId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "eqFee",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "eqReward",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "lpFee",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "protocolFee",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "lkbRemove",
            type: "uint256"
          }
        ],
        internalType: "struct Pool.SwapObj",
        name: "_s",
        type: "tuple"
      }
    ],
    name: "swapRemote",
    outputs: [
      {
        internalType: "uint256",
        name: "amountLD",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalWeight",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address"
      }
    ],
    name: "withdrawMintFeeBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address"
      }
    ],
    name: "withdrawProtocolFeeBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
var Pool__factory = class {
  static createInterface() {
    return new utils.Interface(_abi);
  }
  static connect(address, signerOrProvider) {
    return new Contract(address, _abi, signerOrProvider);
  }
};
Pool__factory.abi = _abi;
var _abi2 = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "chainId",
        type: "uint16"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "srcAddress",
        type: "bytes"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountLD",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "payload",
        type: "bytes"
      }
    ],
    name: "CachedSwapSaved",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "chainId",
        type: "uint16"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "srcAddress",
        type: "bytes"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountLD",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "payload",
        type: "bytes"
      },
      {
        indexed: false,
        internalType: "string",
        name: "reason",
        type: "string"
      }
    ],
    name: "ReceiveFailed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "bridgeFunctionType",
        type: "uint8"
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "chainId",
        type: "uint16"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "srcAddress",
        type: "bytes"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      }
    ],
    name: "Revert",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256"
      },
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      }
    ],
    name: "activateChainPath",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_amountLD",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_to",
        type: "address"
      }
    ],
    name: "addLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "bridge",
    outputs: [
      {
        internalType: "contract Bridge",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16"
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "cachedSwapLookup",
    outputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amountLD",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "payload",
        type: "bytes"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256"
      },
      {
        internalType: "bool",
        name: "_fullMode",
        type: "bool"
      }
    ],
    name: "callDelta",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "bytes",
        name: "_srcAddress",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256"
      }
    ],
    name: "clearCachedSwap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256"
      },
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_weight",
        type: "uint256"
      }
    ],
    name: "createChainPath",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_token",
        type: "address"
      },
      {
        internalType: "uint8",
        name: "_sharedDecimals",
        type: "uint8"
      },
      {
        internalType: "uint8",
        name: "_localDecimals",
        type: "uint8"
      },
      {
        internalType: "string",
        name: "_name",
        type: "string"
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string"
      }
    ],
    name: "createPool",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_srcPoolId",
        type: "uint256"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "credits",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "idealBalance",
            type: "uint256"
          }
        ],
        internalType: "struct Pool.CreditObj",
        name: "_c",
        type: "tuple"
      }
    ],
    name: "creditChainPath",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "contract Factory",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_srcPoolId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_amountLP",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_to",
        type: "address"
      }
    ],
    name: "instantRedeemLocal",
    outputs: [
      {
        internalType: "uint256",
        name: "amountSD",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "mintFeeOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "protocolFeeOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint8",
        name: "_functionType",
        type: "uint8"
      },
      {
        internalType: "bytes",
        name: "_toAddress",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "_transferAndCallPayload",
        type: "bytes"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "dstGasForCall",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "dstNativeAmount",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "dstNativeAddr",
            type: "bytes"
          }
        ],
        internalType: "struct Router.lzTxObj",
        name: "_lzTxParams",
        type: "tuple"
      }
    ],
    name: "quoteLayerZeroFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_srcPoolId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      },
      {
        internalType: "address payable",
        name: "_refundAddress",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_amountLP",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "_to",
        type: "bytes"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "dstGasForCall",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "dstNativeAmount",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "dstNativeAddr",
            type: "bytes"
          }
        ],
        internalType: "struct Router.lzTxObj",
        name: "_lzTxParams",
        type: "tuple"
      }
    ],
    name: "redeemLocal",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_srcChainId",
        type: "uint16"
      },
      {
        internalType: "bytes",
        name: "_srcAddress",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_srcPoolId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_amountSD",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_mintAmountSD",
        type: "uint256"
      }
    ],
    name: "redeemLocalCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_srcChainId",
        type: "uint16"
      },
      {
        internalType: "bytes",
        name: "_srcAddress",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_srcPoolId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_amountSD",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "_to",
        type: "bytes"
      }
    ],
    name: "redeemLocalCheckOnRemote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_srcPoolId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      },
      {
        internalType: "address payable",
        name: "_refundAddress",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_amountLP",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_minAmountLD",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "_to",
        type: "bytes"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "dstGasForCall",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "dstNativeAmount",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "dstNativeAddr",
            type: "bytes"
          }
        ],
        internalType: "struct Router.lzTxObj",
        name: "_lzTxParams",
        type: "tuple"
      }
    ],
    name: "redeemRemote",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "bytes",
        name: "_srcAddress",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256"
      }
    ],
    name: "retryRevert",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16"
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "revertLookup",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "bytes",
        name: "_srcAddress",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256"
      },
      {
        internalType: "address payable",
        name: "_refundAddress",
        type: "address"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "dstGasForCall",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "dstNativeAmount",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "dstNativeAddr",
            type: "bytes"
          }
        ],
        internalType: "struct Router.lzTxObj",
        name: "_lzTxParams",
        type: "tuple"
      }
    ],
    name: "revertRedeemLocal",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_srcPoolId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      },
      {
        internalType: "address payable",
        name: "_refundAddress",
        type: "address"
      }
    ],
    name: "sendCredits",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract Bridge",
        name: "_bridge",
        type: "address"
      },
      {
        internalType: "contract Factory",
        name: "_factory",
        type: "address"
      }
    ],
    name: "setBridgeAndFactory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256"
      },
      {
        internalType: "bool",
        name: "_batched",
        type: "bool"
      },
      {
        internalType: "uint256",
        name: "_swapDeltaBP",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_lpDeltaBP",
        type: "uint256"
      },
      {
        internalType: "bool",
        name: "_defaultSwapMode",
        type: "bool"
      },
      {
        internalType: "bool",
        name: "_defaultLPMode",
        type: "bool"
      }
    ],
    name: "setDeltaParam",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_feeLibraryAddr",
        type: "address"
      }
    ],
    name: "setFeeLibrary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_mintFeeBP",
        type: "uint256"
      }
    ],
    name: "setFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      }
    ],
    name: "setMintFeeOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      }
    ],
    name: "setProtocolFeeOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256"
      },
      {
        internalType: "bool",
        name: "_swapStop",
        type: "bool"
      }
    ],
    name: "setSwapStop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256"
      },
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      },
      {
        internalType: "uint16",
        name: "_weight",
        type: "uint16"
      }
    ],
    name: "setWeightForChainPath",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_srcPoolId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      },
      {
        internalType: "address payable",
        name: "_refundAddress",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_amountLD",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_minAmountLD",
        type: "uint256"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "dstGasForCall",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "dstNativeAmount",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "dstNativeAddr",
            type: "bytes"
          }
        ],
        internalType: "struct Router.lzTxObj",
        name: "_lzTxParams",
        type: "tuple"
      },
      {
        internalType: "bytes",
        name: "_to",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "_payload",
        type: "bytes"
      }
    ],
    name: "swap",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_srcChainId",
        type: "uint16"
      },
      {
        internalType: "bytes",
        name: "_srcAddress",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_srcPoolId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_dstPoolId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_dstGasForCall",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "eqFee",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "eqReward",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "lpFee",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "protocolFee",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "lkbRemove",
            type: "uint256"
          }
        ],
        internalType: "struct Pool.SwapObj",
        name: "_s",
        type: "tuple"
      },
      {
        internalType: "bytes",
        name: "_payload",
        type: "bytes"
      }
    ],
    name: "swapRemote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_to",
        type: "address"
      }
    ],
    name: "withdrawMintFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_to",
        type: "address"
      }
    ],
    name: "withdrawProtocolFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
var Router__factory = class {
  static createInterface() {
    return new utils.Interface(_abi2);
  }
  static connect(address, signerOrProvider) {
    return new Contract(address, _abi2, signerOrProvider);
  }
};
Router__factory.abi = _abi2;
var _abi3 = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_stargateEthVault",
        type: "address"
      },
      {
        internalType: "address",
        name: "_stargateRouter",
        type: "address"
      },
      {
        internalType: "uint16",
        name: "_poolId",
        type: "uint16"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "addLiquidityETH",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "poolId",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "stargateEthVault",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "stargateRouter",
    outputs: [
      {
        internalType: "contract IStargateRouter",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "address payable",
        name: "_refundAddress",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "_toAddress",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "_amountLD",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_minAmountLD",
        type: "uint256"
      }
    ],
    name: "swapETH",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    stateMutability: "payable",
    type: "receive"
  }
];
var RouterETH__factory = class {
  static createInterface() {
    return new utils.Interface(_abi3);
  }
  static connect(address, signerOrProvider) {
    return new Contract(address, _abi3, signerOrProvider);
  }
};
RouterETH__factory.abi = _abi3;
var _abi4 = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_factory",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lpFeeBP",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "protocolFeeBP",
        type: "uint256"
      }
    ],
    name: "FeesUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    inputs: [],
    name: "BP_DENOMINATOR",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "eqFeeBP",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "eqRewardBP",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "contract Factory",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_srcPoolId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "uint16",
        name: "",
        type: "uint16"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_amountSD",
        type: "uint256"
      }
    ],
    name: "getFees",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "eqFee",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "eqReward",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "lpFee",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "protocolFee",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "lkbRemove",
            type: "uint256"
          }
        ],
        internalType: "struct Pool.SwapObj",
        name: "s",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "lpFeeBP",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "protocolFeeBP",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_lpFeeBP",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_protocolFeeBP",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_eqFeeBP",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_eqRewardBP",
        type: "uint256"
      }
    ],
    name: "setFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
var StargateFeeLibrary__factory = class {
  static createInterface() {
    return new utils.Interface(_abi4);
  }
  static connect(address, signerOrProvider) {
    return new Contract(address, _abi4, signerOrProvider);
  }
};
StargateFeeLibrary__factory.abi = _abi4;
var _abi5 = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_stargateRouter",
        type: "address"
      },
      {
        internalType: "address",
        name: "_stargateRouterETH",
        type: "address"
      },
      {
        internalType: "address",
        name: "_stargateFactory",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes2",
        name: "partnerId",
        type: "bytes2"
      }
    ],
    name: "PartnerSwap",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes2",
        name: "partnerId",
        type: "bytes2"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tenthBps",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "widgetFee",
        type: "uint256"
      }
    ],
    name: "WidgetSwapped",
    type: "event"
  },
  {
    inputs: [],
    name: "MAX_UINT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "TENTH_BPS_DENOMINATOR",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes2",
        name: "_partnerId",
        type: "bytes2"
      }
    ],
    name: "partnerSwap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "stargateFactory",
    outputs: [
      {
        internalType: "contract IStargateFactory",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "stargateRouter",
    outputs: [
      {
        internalType: "contract IStargateRouter",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "stargateRouterETH",
    outputs: [
      {
        internalType: "contract IStargateRouterETH",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_amountLD",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_minAmountLD",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "_to",
        type: "bytes"
      },
      {
        internalType: "bytes2",
        name: "_partnerId",
        type: "bytes2"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "tenthBps",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "feeCollector",
            type: "address"
          }
        ],
        internalType: "struct IStargateWidget.FeeObj",
        name: "_feeObj",
        type: "tuple"
      }
    ],
    name: "swapETH",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16"
      },
      {
        internalType: "uint16",
        name: "_srcPoolId",
        type: "uint16"
      },
      {
        internalType: "uint16",
        name: "_dstPoolId",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_amountLD",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_minAmountLD",
        type: "uint256"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "dstGasForCall",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "dstNativeAmount",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "dstNativeAddr",
            type: "bytes"
          }
        ],
        internalType: "struct IStargateRouter.lzTxObj",
        name: "_lzTxParams",
        type: "tuple"
      },
      {
        internalType: "bytes",
        name: "_to",
        type: "bytes"
      },
      {
        internalType: "bytes2",
        name: "_partnerId",
        type: "bytes2"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "tenthBps",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "feeCollector",
            type: "address"
          }
        ],
        internalType: "struct IStargateWidget.FeeObj",
        name: "_feeObj",
        type: "tuple"
      }
    ],
    name: "swapTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "tokenApproved",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
var StargateWidget__factory = class {
  static createInterface() {
    return new utils.Interface(_abi5);
  }
  static connect(address, signerOrProvider) {
    return new Contract(address, _abi5, signerOrProvider);
  }
};
StargateWidget__factory.abi = _abi5;

// src/utils/currencyKey.ts
function currencyKey(currency) {
  return [currency.chainId, currency.symbol, currency.address].join(":");
}

// src/bridge/StargateBridge__evm.ts
var StargateBridge__evm = class {
  constructor(providerFactory, sdk) {
    this.providerFactory = providerFactory;
    this.sdk = sdk;
    this.feeLibraryCache = /* @__PURE__ */ new Map();
    this.getFeeLibraryAddress = pMemoize(
      async (lpToken) => {
        const provider = this.providerFactory(lpToken.chainId);
        const pool = Pool__factory.connect(lpToken.address, provider);
        return pool.feeLibrary();
      },
      { cacheKey: ([lpToken]) => currencyKey(lpToken) }
    );
    this.erc20 = new ERC20__api(providerFactory);
  }
  async getAllowance(currency, address) {
    if (isNativeCurrency(currency))
      return CurrencyAmount.fromRawAmount(currency, MaxUint256);
    const router = this.sdk.getRouterAddress(currency.chainId);
    return this.erc20.forToken(currency).allowance(address, router);
  }
  async approve(amount) {
    const srcCurrency = amount.currency;
    assert(isToken(srcCurrency), "Not a token");
    const router = this.sdk.getRouterAddress(srcCurrency.chainId);
    return this.erc20.forToken(amount.currency).approve(amount, router);
  }
  supportsTransfer(srcCurrency, dstCurrency) {
    if (!isEvmChainId(srcCurrency.chainId))
      return false;
    const pools = this.sdk.getAllPools();
    if (!pools.some((pool) => pool.currency.equals(srcCurrency)))
      return false;
    const path = this.sdk.tryGetPath(srcCurrency, dstCurrency);
    if (!path)
      return false;
    return !this.sdk.isDisabledPath(path.srcPool, path.dstPool);
  }
  supportsClaim(currency) {
    if (!isEvmChainId(currency.chainId))
      return false;
    const pools = this.sdk.getAllPools();
    return pools.some((pool) => pool.currency.equals(currency));
  }
  supportsRegister(currency) {
    return this.supportsClaim(currency);
  }
  async isRegistered(currency, address) {
    return true;
  }
  async getUnclaimed(currency, address) {
    return CurrencyAmount.fromRawAmount(currency, 0);
  }
  claim(currency) {
    throw new Error("Method not supported.");
  }
  register(currency) {
    throw new Error("Method not supported.");
  }
  transfer(input) {
    const { srcPool } = this.sdk.getPath(input.srcCurrency, input.dstCurrency);
    if ((srcPool == null ? void 0 : srcPool.poolId) === 13)
      return this.transferEth(input);
    return this.transferToken(input);
  }
  async transferEth(input) {
    const { srcPool, dstPool } = this.sdk.getPath(input.srcCurrency, input.dstCurrency);
    assert(srcPool.poolId === 13, "eth");
    assert(dstPool.poolId === 13, "eth");
    const provider = this.providerFactory(input.srcChainId);
    const routerEthAddress = this.sdk.getRouterEthAddress(srcPool.chainId);
    const router = RouterETH__factory.connect(routerEthAddress, provider);
    const amountLD = toBigNumber(input.amount);
    const minAmountLD = toBigNumber(input.minAmount);
    const value = toBigNumber(input.amount.add(input.fee.nativeFee));
    const populatedTransaction = router.populateTransaction.swapETH(
      input.dstChainId,
      input.srcAddress,
      input.dstAddress,
      amountLD,
      minAmountLD,
      { value }
    );
    return createTransaction(populatedTransaction, { provider });
  }
  async transferToken(input) {
    validateInput(input);
    const { srcPool, dstPool } = this.sdk.getPath(input.srcCurrency, input.dstCurrency);
    const provider = this.providerFactory(input.srcChainId);
    const routerAddress = this.sdk.getRouterAddress(srcPool.chainId);
    const router = Router__factory.connect(routerAddress, provider);
    const amountLD = toBigNumber(input.amount);
    const minAmountLD = toBigNumber(
      // at this point the conversion is safe
      castCurrencyAmountUnsafe(input.minAmount, input.srcCurrency)
    );
    const { adapterParams } = input;
    const lzTxParams = this.lzTxParams(adapterParams);
    const payload = "0x";
    const value = toBigNumber(input.fee.nativeFee);
    const populatedTransaction = router.populateTransaction.swap(
      input.dstChainId,
      srcPool.poolId,
      dstPool.poolId,
      input.srcAddress,
      amountLD,
      minAmountLD,
      lzTxParams,
      input.dstAddress,
      payload,
      { value }
    );
    return createTransaction(populatedTransaction, {
      provider
    });
  }
  async getMessageFee(srcCurrency, dstCurrency, adapterParams) {
    const srcChainId = srcCurrency.chainId;
    const dstChainId = dstCurrency.chainId;
    const routerAddress = this.sdk.getRouterAddress(srcChainId);
    const provider = this.providerFactory(srcChainId);
    const router = Router__factory.connect(routerAddress, provider);
    const payload = "0x";
    const lzTxParams = this.lzTxParams(adapterParams);
    const native = getNativeCurrency(srcChainId);
    const [nativeFee, lzFee] = await router.quoteLayerZeroFee(
      dstChainId,
      1 /* TYPE_SWAP_REMOTE */,
      ONE_ADDRESS,
      payload,
      lzTxParams
    );
    return {
      nativeFee: toCurrencyAmount(native, nativeFee),
      zroFee: toCurrencyAmount(native, lzFee)
    };
  }
  lzTxParams(adapterParams) {
    var _a;
    const lzTxParams = {
      dstGasForCall: adapterParams.extraGas,
      dstNativeAddr: (_a = adapterParams.dstNativeAddress) != null ? _a : ONE_ADDRESS,
      dstNativeAmount: adapterParams.dstNativeAmount ? toBigNumber(adapterParams.dstNativeAmount) : constants.Zero
    };
    return lzTxParams;
  }
  async getFeeLibrary(lpToken) {
    const feeLibraryAddress = await this.getFeeLibraryAddress(lpToken);
    const provider = this.providerFactory(lpToken.chainId);
    const feeLibrary = StargateFeeLibrary__factory.connect(feeLibraryAddress, provider);
    return feeLibrary;
  }
  async getOutput(inputAmountLD, dstCurrency) {
    const srcCurrency = inputAmountLD.currency;
    const { srcPool, dstPool } = this.sdk.getPath(srcCurrency, dstCurrency);
    const feeLibrary = await this.getFeeLibrary(srcPool.lpToken);
    const amountSD = amountLDtoSD(inputAmountLD, srcPool.lpToken);
    const srcAddress = ONE_ADDRESS;
    const fees = await feeLibrary.getFees(
      srcPool.poolId,
      dstPool.poolId,
      dstPool.chainId,
      srcAddress,
      toBigNumber(amountSD)
    );
    const feeSD = {
      eqFee: toCurrencyAmount(srcPool.lpToken, fees.eqFee),
      eqReward: toCurrencyAmount(srcPool.lpToken, fees.eqReward),
      lpFee: toCurrencyAmount(srcPool.lpToken, fees.lpFee),
      protocolFee: toCurrencyAmount(srcPool.lpToken, fees.protocolFee),
      lkbRemove: toCurrencyAmount(srcPool.lpToken, fees.lkbRemove)
    };
    const feeLD = {
      eqFee: amountSDtoLD(feeSD.eqFee, srcPool.currency),
      eqReward: amountSDtoLD(feeSD.eqReward, srcPool.currency),
      lpFee: amountSDtoLD(feeSD.lpFee, srcPool.currency),
      protocolFee: amountSDtoLD(feeSD.protocolFee, srcPool.currency),
      lkbRemove: amountSDtoLD(feeSD.lkbRemove, srcPool.currency)
    };
    const totalFeeSD = feeSD.eqFee.add(feeSD.protocolFee).add(feeSD.lpFee).subtract(feeSD.eqReward);
    const totalFeeLD = amountSDtoLD(totalFeeSD, srcCurrency);
    const inputAmountSD = amountLDtoSD(inputAmountLD, srcPool.lpToken);
    const outputAmountSD = inputAmountSD.subtract(totalFeeSD);
    const outputAmountRD = amountSDtoLD(outputAmountSD, dstPool.currency);
    const output = {
      amount: outputAmountRD,
      fee: __spreadValues({
        totalFee: totalFeeLD
      }, feeLD)
    };
    return output;
  }
  async getLimit(srcCurrency, dstCurrency) {
    const { srcPool, dstPool } = this.sdk.getPath(srcCurrency, dstCurrency);
    const provider = this.providerFactory(srcPool.chainId);
    const pool = Pool__factory.connect(srcPool.lpToken.address, provider);
    const chainPath = await pool.getChainPath(dstPool.chainId, dstPool.poolId);
    const balanceLP = toCurrencyAmount(srcPool.lpToken, chainPath.balance);
    const balanceLD = amountSDtoLD(balanceLP, srcCurrency);
    return balanceLD;
  }
  async getExtraGas(srcCurrency, dstCurrency) {
    return 0;
  }
  async getDuration(srcCurrency, dstCurrency) {
    return getDefaultMessageDuration(srcCurrency.chainId, dstCurrency.chainId);
  }
};
function amountLDtoSD(amountLD, lpToken) {
  const sharedDecimals = lpToken.decimals;
  return CurrencyAmount.fromRawAmount(
    lpToken,
    amountLD.multiply(BigInt(10) ** BigInt(sharedDecimals)).divide(amountLD.decimalScale).quotient
  );
}
function amountSDtoLD(amountSD, baseToken, localDecimals = baseToken.decimals) {
  return CurrencyAmount.fromRawAmount(
    baseToken,
    amountSD.multiply(BigInt(10) ** BigInt(localDecimals)).divide(amountSD.decimalScale).quotient
  );
}
var WIDGET_SWAP_ADDRESS = {
  [ChainId.RINKEBY]: "0x1aE3A80BDCdFEC8c76c6049248E4139160b72FF1",
  [ChainId.BSC_TESTNET]: "0xcE375F5d95204DB9b110BE3b3C886A33c8168eB2",
  [ChainId.FUJI]: "0xcE375F5d95204DB9b110BE3b3C886A33c8168eB2",
  [ChainId.MUMBAI]: "0xcE375F5d95204DB9b110BE3b3C886A33c8168eB2",
  [ChainId.ARBITRUM_RINKEBY]: "0xcE375F5d95204DB9b110BE3b3C886A33c8168eB2",
  [ChainId.OPTIMISM_KOVAN]: "0xcE375F5d95204DB9b110BE3b3C886A33c8168eB2",
  [ChainId.FANTOM_TESTNET]: "0xcbF0B97dbe30406e974F2d1ADF19CD6667d70632",
  [ChainId.ETHEREUM]: "0x76d4d68966728894961AA3DDC1d5B0e45668a5A6",
  [ChainId.BSC]: "0x2Eb9ea9dF49BeBB97e7750f231A32129a89b82ee",
  [ChainId.AVALANCHE]: "0x20293eDD4f52F81234b3997B9AE4742c48005858",
  [ChainId.POLYGON]: "0xdc2716B92480225533aBC3328C2Ab961f2A9247d",
  [ChainId.ARBITRUM]: "0x6c33A7b29C8B012D060F3a5046f3ee5aC48f4780",
  [ChainId.OPTIMISM]: "0x46Bc16F76B0aE14Abb820D3410843Ba54D8ef6f0",
  [ChainId.FANTOM]: "0xC8e5157EC44E00ff85Bf15D4f50974d3A8166427",
  [ChainId.METIS]: "0xb63c87D146cbE60B3C0419003Ebd24F21374c8Ae"
};
function getWidgetAddress(chainId) {
  return WIDGET_SWAP_ADDRESS[chainId];
}
var StargateWidgetBridge__evm = class extends StargateBridge__evm {
  constructor(providerFactory, sdk, partnerConfig) {
    super(providerFactory, sdk);
    this.partnerConfig = partnerConfig;
    this.tenthBpsDenominator = 1e5;
  }
  async getPartnerFee(inputAmountLD) {
    return inputAmountLD.multiply(this.partnerConfig.tenthBps).divide(this.tenthBpsDenominator);
  }
  async getAllowance(currency, address) {
    if (isNativeCurrency(currency))
      return CurrencyAmount.fromRawAmount(currency, MaxUint256);
    const spender = getWidgetAddress(currency.chainId);
    return this.erc20.forToken(currency).allowance(address, spender);
  }
  async approve(amount) {
    const srcCurrency = amount.currency;
    assert(isToken(srcCurrency), "Not a token");
    const widgetAddress = getWidgetAddress(srcCurrency.chainId);
    assert(widgetAddress, "widgetAddress");
    return this.erc20.forToken(amount.currency).approve(amount, widgetAddress);
  }
  async getOutput(inputAmountLD, dstCurrency) {
    const partnerFee = await this.getPartnerFee(inputAmountLD);
    const swapAmount = inputAmountLD.subtract(partnerFee);
    const output = await super.getOutput(swapAmount, dstCurrency);
    const fee = __spreadProps(__spreadValues({}, output.fee), {
      partnerFee
    });
    return {
      amount: output.amount,
      fee
    };
  }
  async transferEth(input) {
    const contract = this.getWidgetContract(input.srcChainId);
    const partnerId = utils.solidityPack(["uint16"], [this.partnerConfig.partnerId]);
    const value = toBigNumber(input.fee.nativeFee.add(input.amount));
    const populatedTransaction = contract.populateTransaction.swapETH(
      toBigNumber(input.amount),
      toBigNumber(input.minAmount),
      input.dstChainId,
      input.dstAddress,
      partnerId,
      this.feeObj,
      { value }
    );
    return createTransaction(populatedTransaction, { provider: contract.provider });
  }
  get feeObj() {
    const feeObj = {
      tenthBps: this.partnerConfig.tenthBps,
      feeCollector: this.partnerConfig.feeCollector
    };
    return feeObj;
  }
  async getMessageFee(srcCurrency, dstCurrency, adapterParams) {
    const fee = await super.getMessageFee(srcCurrency, dstCurrency, adapterParams);
    return __spreadProps(__spreadValues({}, fee), {
      // Transfers that include a partnerId i.e. Widget transfers require slightly more native
      nativeFee: fee.nativeFee.multiply(110).divide(100)
    });
  }
  async transferToken(input) {
    var _a;
    const contract = this.getWidgetContract(input.srcChainId);
    const { srcPool, dstPool } = this.sdk.getPath(input.srcCurrency, input.dstCurrency);
    const lzTxParams = {
      dstGasForCall: 0,
      dstNativeAmount: input.adapterParams.dstNativeAmount ? toBigNumber(input.adapterParams.dstNativeAmount) : 0,
      dstNativeAddr: (_a = input.adapterParams.dstNativeAddress) != null ? _a : input.dstAddress
    };
    const partnerId = utils.solidityPack(["uint16"], [this.partnerConfig.partnerId]);
    const value = toBigNumber(input.fee.nativeFee);
    const minAmountLD = toBigNumber(
      // at this point the conversion is safe
      castCurrencyAmountUnsafe(input.minAmount, input.srcCurrency)
    );
    const populatedTransaction = contract.populateTransaction.swapTokens(
      input.dstChainId,
      srcPool.poolId,
      dstPool.poolId,
      toBigNumber(input.amount),
      minAmountLD,
      lzTxParams,
      input.dstAddress,
      partnerId,
      this.feeObj,
      { value }
    );
    return createTransaction(populatedTransaction, { provider: contract.provider });
  }
  getWidgetContract(chainId) {
    const address = WIDGET_SWAP_ADDRESS[chainId];
    assert(address, "WIDGET_SWAP_ADDRESS");
    const provider = this.providerFactory(chainId);
    return StargateWidget__factory.connect(address, provider);
  }
};
var StargateSDK = class {
  constructor(config = mainnet) {
    this.config = config;
    // groups that can be swapped between
    this.swapGroups = [[PoolId.BUSD, PoolId.USDC, PoolId.USDT]];
    this.tryGetPoolByPoolId = (poolId, chainId) => {
      const pool = this.config.pools.find((p) => p.chainId === chainId && p.poolId === poolId);
      return pool;
    };
    this.getPoolByPoolId = (poolId, chainId) => {
      const pool = this.tryGetPoolByPoolId(poolId, chainId);
      if (pool)
        return pool;
      throw new Error(`No pool for poolId: ${poolId} and chainId: ${chainId}`);
    };
    this.getAllChainPaths = () => {
      const { pools } = this.config;
      return compact(
        pools.flatMap(
          (srcPool) => pools.map(
            (dstPool) => this.isValidPath(srcPool, dstPool) ? { srcPool, dstPool } : void 0
          )
        )
      );
    };
    this.getAllPools = () => {
      return this.config.pools;
    };
    this.getAllFarms = () => {
      return this.config.farms;
    };
    this.isValidPath = (srcPool, dstPool) => {
      if (srcPool.chainId === dstPool.chainId)
        return false;
      if (srcPool.poolId === 19 && dstPool.poolId === 19) {
        if (!isMetis(srcPool.chainId) && !isMetis(dstPool.chainId)) {
          return false;
        }
      }
      return srcPool.poolId === dstPool.poolId || // exchange groups
      this.swapGroups.some(
        (group) => group.includes(srcPool.poolId) && group.includes(dstPool.poolId)
      );
    };
    this.tryGetPath = (srcCurrency, dstCurrency) => {
      if (!srcCurrency || !dstCurrency)
        return void 0;
      const srcPools = this.config.pools.filter((p) => p.currency.equals(srcCurrency));
      const dstPools = this.config.pools.filter((p) => p.currency.equals(dstCurrency));
      for (const srcPool of srcPools) {
        for (const dstPool of dstPools) {
          if (this.isValidPath(srcPool, dstPool))
            return { srcPool, dstPool };
        }
      }
      return void 0;
    };
    this.getPath = (srcCurrency, dstCurrency) => {
      const path = this.tryGetPath(srcCurrency, dstCurrency);
      if (path)
        return path;
      throw new Error("No path found");
    };
    this.getRouterAddress = (chainId) => {
      const address = this.tryGetRouterAddress(chainId);
      assert(address, "No router address");
      return address;
    };
    this.getRouterEthAddress = (chainId) => {
      const address = this.tryGetRouterEthAddress(chainId);
      assert(address, "No router ETH address");
      return address;
    };
  }
  // other
  tryGetRouterAddress(chainId) {
    return this.config.router[chainId];
  }
  tryGetRouterEthAddress(chainId) {
    return this.config.routerEth[chainId];
  }
  isDisabledPath(srcPool, dstPool) {
    for (const rule of this.config.disabled) {
      if (rule.srcChainId && srcPool.chainId !== rule.srcChainId)
        continue;
      if (rule.dstChainId && dstPool.chainId !== rule.dstChainId)
        continue;
      if (rule.srcPoolId && srcPool.poolId !== rule.srcPoolId)
        continue;
      if (rule.dstPoolId && dstPool.poolId !== rule.dstPoolId)
        continue;
      return true;
    }
    return false;
  }
};
function isMetis(chainId) {
  return chainId === ChainId.METIS || chainId === ChainId.METIS_TESTNET;
}

export { StargateBridge__evm, StargateSDK, StargateWidgetBridge__evm, mainnet, toConfig };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.mjs.map