import {compact, maxBy} from 'lodash-es';
import {useEffect} from 'react';

import {bridgeStore} from '@/bridge/stores/bridgeStore';
import {balanceStore} from '@/core/stores/balanceStore';
import {walletStore} from '@/core/stores/walletStore';

export function useDefaultSrcCurrency() {
  const {address, chainId: srcChainId} = walletStore.evm ?? {};
  const {form} = bridgeStore;

  // are balances from current chain loaded
  const isReady =
    address &&
    bridgeStore.currencies.every((currency) =>
      currency.chainId === srcChainId ? balanceStore.getBalance(currency, address) : true,
    );

  useEffect(() => {
    if (!srcChainId) return;
    if (form.srcChainId) return;
    bridgeStore.setSrcChainId(srcChainId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, srcChainId]);

  useEffect(() => {
    if (!isReady) return;
    if (!address) return;
    if (!form.srcChainId) return;
    if (form.srcCurrency) return;
    if (form.dstCurrency) return;
    const {srcCurrencyOptions} = bridgeStore;

    const balances = compact(
      srcCurrencyOptions
        .filter((o) => o.currency.chainId === srcChainId)
        .map(({currency}) => balanceStore.getBalance(currency, address)),
    );

    const maxBalance = maxBy(balances, (b) => {
      try {
        return parseFloat(b.toExact());
      } catch {
        return 0;
      }
    });
    if (maxBalance) {
      bridgeStore.setSrcCurrency(maxBalance.currency);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [address, form.srcChainId, srcChainId, isReady]);
}
