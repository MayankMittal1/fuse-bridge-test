import {waitForMessageReceived} from '@layerzerolabs/scan-client';
import {
  Coin,
  Currency,
  CurrencyAmount,
  Token,
  tryParseCurrencyAmount,
} from '@layerzerolabs/ui-core';
import {cloneDeepWith} from 'lodash-es';
import {autorun, makeAutoObservable, toJS} from 'mobx';

type TransactionType = string;
type Confirmation = {txHash: string; chainId: number};
type Timestamp = number;
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface TransactionProps<Input> {
  type: TransactionType;
  input: Input;
  chainId: number;
  expectedDate: Timestamp;
  submittedDate: Timestamp;
  error: unknown | undefined;
  txHash: string;
  confirmation: Confirmation | undefined;
  completed: boolean;
}
type TransactionConstructorProps<Input> = Optional<
  TransactionProps<Input>,
  'confirmation' | 'completed' | 'error' | 'completed' | 'submittedDate'
>;

export class Transaction<Input = unknown> implements TransactionProps<Input> {
  type: TransactionType;
  input: Input;
  chainId: number;
  expectedDate: Timestamp;
  submittedDate: Timestamp = timeStamp();
  error: unknown | undefined = undefined;
  txHash: string;
  confirmation: Confirmation | undefined = undefined;
  completed = false;

  constructor(props: TransactionConstructorProps<Input>) {
    makeAutoObservable(this);
    this.chainId = props.chainId;
    this.txHash = props.txHash;
    this.expectedDate = props.expectedDate;
    this.input = props.input;
    this.type = props.type;
  }

  update(props: Partial<TransactionProps<Input>>) {
    Object.assign(this, props);
  }

  get srcChainId(): number {
    return this.chainId;
  }

  get dstChainId(): number | undefined {
    // put your logic here
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const input = this.input as any;
    if (input) {
      if (typeof input.dstChainId === 'number') {
        return input.dstChainId;
      }
    }
  }
}

export class TransactionStore {
  transactions: Transaction<unknown>[] = [];
  constructor() {
    makeAutoObservable(this, {}, {autoBind: true});
  }

  get isPending(): boolean {
    return this.pendingTransactions.length > 0;
  }
  get hasPending(): boolean {
    return this.isPending;
  }
  get recentTransactions() {
    return this.transactions.slice().reverse();
  }
  get pendingTransactions() {
    return this.recentTransactions.filter(
      (transaction) => !transaction.completed && !transaction.error,
    );
  }
  create<T>(props: TransactionConstructorProps<T>) {
    const tx = new Transaction(props);
    this.transactions.push(tx);
    return tx;
  }

  saveSnapshot() {
    if (typeof localStorage === 'undefined') return;
    try {
      const snapshot = this.transactions.map((t) => toJS(t));
      localStorage.setItem('transactions', JSON.stringify(serialize(snapshot)));
    } catch (e) {
      console.error(e);
      //
    }
  }

  restoreSnapshot() {
    if (typeof localStorage === 'undefined') return;
    try {
      const snapshot = JSON.parse(localStorage.getItem('transactions') ?? '[]');
      if (snapshot?.length) {
        this.transactions = parse(snapshot).map((tx: Transaction) => new Transaction(tx));
        this.transactions
          .filter((tx) => isCrossChainTx(tx) && !tx.completed && !tx.error)
          .forEach((tx) => {
            if (!tx.txHash) return;
            waitForMessageReceived(tx.chainId, tx.txHash, 5_000).then(
              (message) => {
                tx.update({
                  completed: true,
                  confirmation: {
                    chainId: message.dstChainId,
                    txHash: message.dstTxHash,
                  },
                });
              },
              (error) => {
                tx.update({error});
              },
            );
          });
      }
    } catch (e) {
      console.error(e);
      //
    }
  }
}

export function initTransactionStore(store: TransactionStore) {
  if (typeof localStorage === 'undefined') return;
  store.restoreSnapshot();
  recordTransactions(store);
}

function recordTransactions(store: TransactionStore) {
  return autorun(() => {
    store.saveSnapshot();
  });
}

function isCrossChainTx(tx: Transaction) {
  const input: any = tx.input;
  if (!input) return false;
  return input.srcChainId && input.dstChainId;
}

function tryParse(unknown: any): any {
  try {
    if (unknown !== null && typeof unknown === 'object') {
      if (unknown['$type'] === 'BigInt') {
        return BigInt((unknown as any).value);
      }
      if (unknown['$type'] === 'Token') {
        const token = unknown as Token;
        return new Token(token.chainId, token.address, token.decimals, token.symbol, token.name);
      }
      if (unknown['$type'] === 'Coin') {
        const coin = unknown as Coin;
        return new Coin(coin.chainId, coin.decimals, coin.symbol, coin.name);
      }
      if (unknown['$type'] === 'CurrencyAmount') {
        const amount = unknown as {currency: Currency; value: string};
        const currency = tryParse(amount.currency) as Currency;
        return tryParseCurrencyAmount(currency, amount.value);
      }
    }
  } catch (e) {
    console.log('tryParse', e);
  }
}

function trySerialize(unknown: any): any {
  try {
    if (typeof unknown === 'bigint') {
      return {$type: 'BigInt', value: unknown.toString()};
    }
    if (unknown !== null && typeof unknown === 'object') {
      if (unknown instanceof Coin) {
        return {$type: 'Coin', ...unknown};
      }
      if (unknown instanceof Token) {
        return {$type: 'Token', ...unknown};
      }
      if (unknown instanceof CurrencyAmount) {
        return {
          $type: 'CurrencyAmount',
          currency: trySerialize(unknown.currency),
          value: unknown.toExact(),
        };
      }
    }
  } catch (e) {
    console.error('trySerialize', e);
  }
}

function serialize(obj: any) {
  return cloneDeepWith(obj, trySerialize);
}

function parse(obj: any) {
  return cloneDeepWith(obj, tryParse);
}

const timeStamp = () => Math.floor(Date.now() / 1000);

export const transactionStore = new TransactionStore();
