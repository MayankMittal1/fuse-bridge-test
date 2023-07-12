<p align="center">
  <a href="https://layerzero.network">
    <img alt="LayerZero" style="max-width: 500px" src="https://d3a2dpnnrypp5h.cloudfront.net/bridge-app/lz.png"/>
  </a>
</p>

<h1 align="center">LayerZero Bridge Example dApp</h1>

<!-- Deploy buttons -->

<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FLayerZero-Labs%2Ffactory%2Ftree%2Fexamples%2Fbridge-app&demo-title=LayerZero%20dApp&demo-description=Showcase%20dApp%20for%20LayerZero%20omnichain%20interoperability%20protocol&demo-url=https%3A%2F%2Ffactory.layerzero.network%2Fbridge&demo-image=https%3A%2F%2Flayerzero.network%2Ficons%2Fshare.png">
    <img src="https://d3a2dpnnrypp5h.cloudfront.net/bridge-app/deploy-to-vercel.svg" alt="Deploy with Vercel"/>
  </a>
  <a href="https://app.netlify.com/start/deploy?repository=https%3A%2F%2Fgithub.com%2FLayerZero-Labs%2Ffactory&base=examples%2Fbridge-app">
    <img src="https://d3a2dpnnrypp5h.cloudfront.net/bridge-app/deploy-to-netlify.svg" alt="Deploy to Netlify"/>
  </a>
</p>

An example LayerZero dApp built on top of next.js

## Quick Start

The easiest way to create a dApp for your LayerZero tokens is to use our [`create-lz-app`](https://www.npmjs.com/package/create-lz-app) utility:

```bash
npx create-lz-app ./my-project-directory
```

This utility will walk you through the process of dApp configuration and will create a working Next.js application you can then deploy using e.g. Vercel or Netlify.

## Development

This app adheres to Next.js standards so the development workflow should feel pretty familiar:

```bash
# Let's asssume you are using yarn as a package manager

# To install dependencies
yarn

# To start a development server
yarn dev

# To create a production build
yarn build
```

## Project Structure

The example app is organized by feature. You’ll find verticals for the [fungible token bridge](src/features/bridge/README.md) and [non-fungible token (ONFT) bridge](src/features/onft/README.md) in the features folder, along with [core](src/features/core/README.md) pieces used in each. Within each vertical folder you’ll find stores, components, and configuration specific to that use case.

```
bridge-app
├── README.md
├── node_modules
├── package.json
├── tsconfig.json
├── public
│   └── static
│        └── icons
└── src
    ├── config.ts
    ├── bootstrap.tsx
    ├── features
    |  ├──core
    |  ├──bridge
    |  └──onft
    └── pages
      ├── bridge.tsx
      ├── oft.tsx
      ├── onft.tsx
      └── _app.tsx
```

## Configuration

The app is initialized in the [\_app.tsx](src/pages/_app.tsx) file where we call the `bootstrap` function that sets up our generic stores, wallet configuration, and registers the tokens we want to support.

### Tokens

All of your token configuration should live in the root [config](src/config.ts) file. Here you will define your `lzAppConfig` which will describe exactly which tokens of which type your bridge will support. The example app ships with support for [OFT](https://tome.app/layerzero-labs/oft-1-pager-v0-cldwqsurl0cysbz3wkog5hlxi) and [Wrapped Assets](https://github.com/LayerZero-Labs/wrapped-asset-bridge) in the **Fungible Token Bridge** and [ERC721](https://layerzero.gitbook.io/docs/evm-guides/layerzero-omnichain-contracts/onft/721) and [ERC1155](https://layerzero.gitbook.io/docs/evm-guides/layerzero-omnichain-contracts/onft/1155) in the **Non-fungible Token Bridge**.

To specify which tokens you want to support, modify the `lzAppConfig` with your own configuration. See the [Fungible Token Bridge App](src/features/bridge/README.md) and [Non-fungible Token (ONFT) Bridge App](src/features/onft/README.md) readmes for more details on what is supported out of the box, and how to set up your own configuration.

```ts
export const lzAppConfig = {
  bridge: {
    oft: [
      //
      oft_mainnet.BTC,
      oft_mainnet.JOE,
      oft_mainnet.PEPE,
      oft_testnet.CAKE,
      oft_testnet.BTC,
    ],
    wrappedAsset: [
      //
      wrapped_mainnet,
      wrapped_testnet,
    ],
    onft: [
      //
      erc721_testnet,
      erc721_mainnet,
      erc1155_testnet,
    ],
  },
};
```

### Wallet Configuration

The example app ships with support for the following wallets

- Petra
- Fewcha
- Martian
- Wallet Connect
- Metamask
- Phantom
- Coinbase Wallet
- Core
- Pontem
- Brave
- PhantomEvm
- Solflare
- Coinbase Wallet Solana

You can enable any combination of these in the [`createWallet`](src/features/core/config/createWallets.ts) helper by adding or removing from the wallets array.

### Providers

Some stores require blockchain or api communication. To do this we abstract this layer into `providers`, and assign them to the store on initialization.

An example is the fungible token `balanceStore` that needs to know how to get balances from any wallet type. In the bootstrap file, we add three providers that act as the infrastructure layer for the `balanceStore`.

```js
balanceStore.addProviders([
  new BalanceProvider__aptos(aptosResourceProvider),
  new BalanceProvider__evm(providerFactory),
  new BalanceProvider__solana(new SolanaConnection('https://api.devnet.solana.com')),
]);
```

Each `provider` is aware of which type of balance it supports and selects itself to provide the balance in those cases.

### ONFT Balances Providers

To read ONFT balances for your collection you will likely need to implement your own balance provider. We recommend using a third party indexing service like [Alchemy](https://docs.alchemy.com/reference/nft-api-quickstart), [Infura](https://www.infura.io/platform/nft-api), or [Simple Hash](https://docs.simplehash.com/reference/overview).

Your custom provider should implement the [`ONFTBalanceProvider`](https://github.com/LayerZero-Labs/ui-monorepo/blob/main/packages/ui-bridge-onft/src/balance/OnftBalanceProvider.ts) interface

```ts
interface OnftBalanceProvider {
  supports(contract: OnftContract): boolean;
  getAssets(contract: OnftContract, owner: string): Promise<OnftTokenAmount[]>;
}
```

Where `supports` returns `true` if the contract address belongs to your collection, and `getAssets` should request assets from your third party integration. Once implemented, you can swap the default balance provider in [`bootstrap.ts`](src/bootstrap.ts) to complete your configuration.

### RPC Provider

The core bootstrap is where we initialize a `providerFactory`. In this context we're referring to rpc node providers, and the factory maps a `chainId` to a `FailoverProvider`. See the `ui-evm` documentation for more details, in short we connect to RPC nodes based on a weighted score, and fallback to another option in case of multiple failures.

The `providerFactory` is used in some the the generic store providers and is sent to the app specific bootstrapping steps.

## Included Apps

### [Fungible Token Bridge App](src/features/bridge/README.md)

Create a fungible token bridge that can transfer OFTs, wrapped assets, native assets, and ERC20s across networks.

### [Non-fungible Token (ONFT) Bridge App](src/features/onft/README.md)

Create an app that can bridge [Omnichain Non-fungible Tokens](https://layerzero.gitbook.io/docs/evm-guides/layerzero-omnichain-contracts).

## Disclaimer

DISCLAIMER: THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND
NON-INFRINGEMENT. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR ANYONE
DISTRIBUTING THE SOFTWARE BE LIABLE FOR ANY DAMAGES OR OTHER
LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
