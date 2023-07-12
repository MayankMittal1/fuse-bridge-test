import {ChainId} from '@layerzerolabs/lz-sdk';
import {Wallet} from '@layerzerolabs/ui-wallet';
import {AptosWallet} from '@layerzerolabs/ui-wallet-aptos';
import {
  BraveWallet,
  CoinbaseWallet,
  CoreWallet,
  MetaMaskWallet,
  PhantomWallet as PhantomWalletEvm,
  WalletConnect,
} from '@layerzerolabs/ui-wallet-evm';
import {MartianWallet} from '@martianwallet/aptos-wallet-adapter';
import {PontemWallet} from '@pontem/wallet-adapter-plugin';
import {FewchaWallet} from 'fewcha-plugin-wallet-adapter';
import {PetraWallet} from 'petra-plugin-wallet-adapter';

export function createWallets(chains: ChainId[]): Record<string, Wallet<unknown>> {
  const wallets: Record<string, Wallet<unknown>> = {};
  // aptos
  wallets.petraWallet = new AptosWallet('Petra', new PetraWallet());
  wallets.fewchaWallet = new AptosWallet('Fewcha', new FewchaWallet());
  wallets.pontemWallet = new AptosWallet('Pontem', new PontemWallet());
  wallets.martianWallet = new AptosWallet('Martian', new MartianWallet());

  // evm
  wallets.metamaskWallet = new MetaMaskWallet();
  wallets.coinbaseWallet = new CoinbaseWallet();
  wallets.coreWallet = new CoreWallet();
  wallets.braveWallet = new BraveWallet();
  wallets.walletConnect = new WalletConnect({
    projectId: '10b5df65476df304efbb9a6b0c42f8b0',
    chains: chains,
    showQrModal: true,
  });
  wallets.phantomEvm = new PhantomWalletEvm();

  if (typeof window !== 'undefined') {
    Object.values(wallets).forEach((wallet) => wallet.autoConnect());
  }

  return wallets;
}
