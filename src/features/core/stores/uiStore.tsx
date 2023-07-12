import {action, computed, makeAutoObservable, makeObservable, observable} from 'mobx';

import {makePersistable} from '../utils/makePersistable';
import {Transaction, transactionStore} from './transactionStore';

class Toggle {
  value = false;
  constructor() {
    makeObservable(
      this,
      {value: observable, open: action.bound, close: action.bound, toggle: action.bound},
      {autoBind: true},
    );
  }
  open() {
    this.value = true;
  }
  close() {
    this.value = false;
  }
  toggle() {
    this.value = !this.value;
  }
}

class WalletModal extends Toggle {
  activeTab: WalletTab = WalletTab.WALLET;

  constructor() {
    super();
    makeObservable(this, {activeTab: true, setActiveTab: action});
  }
  setActiveTab(activeTab: WalletTab) {
    this.activeTab = activeTab;
  }
}

class TransactionProgress extends Toggle {
  dismissed: string[] = [];

  constructor() {
    super();
    makeObservable(this, {
      dismissed: true,
      dismiss: action,
      transactions: computed.struct,
      hasPendingTransactions: computed.struct,
    });
    makePersistable(this, {name: 'ui.txProgress'});
  }
  get transactions(): Transaction[] {
    return (
      transactionStore.recentTransactions
        // show only cross chain transactions
        .filter((tx) => tx.srcChainId && tx.dstChainId)
        .filter((tx) => !this.dismissed.includes(tx.txHash))
    );
  }
  get hasPendingTransactions(): boolean {
    return this.transactions.some((transaction) => !transaction.completed && !transaction.error);
  }
  dismiss(txHash: string) {
    this.dismissed.push(txHash);
  }
}

export enum WalletTab {
  WALLET = 'Wallet',
  TRANSACTIONS = 'Transactions',
  UNCLAIMED = 'Unclaimed',
}

class UiStore {
  walletModal = new WalletModal();
  txProgress = new TransactionProgress();
  dstNativeAmountModal = new Toggle();
  claimReminderAlert = new Toggle();
  rpcErrorAlert = new Toggle();
  constructor() {
    makeAutoObservable(this, {}, {autoBind: true});
  }
}

export const uiStore = new UiStore();
