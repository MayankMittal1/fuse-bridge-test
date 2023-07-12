import '../../styles/style.css';
import 'react-toastify/dist/ReactToastify.css';

import createCache from '@emotion/cache';
import {CacheProvider} from '@emotion/react';
import {IconTheme, setIconTheme} from '@layerzerolabs/ui-core';
import {createFailoverProvider, ProviderFactory} from '@layerzerolabs/ui-evm';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {memoize} from 'lodash-es';
import {observer} from 'mobx-react';
import React, {useEffect} from 'react';

import {AccountModal} from '@/bridge/ui/AccountModal';
import {GasOnDestinationModal} from '@/bridge/ui/GasOnDestinationModal';
import {JsonRpcProviderContext} from '@/core/context/JsonRpcProviderContext';
import {UserThemePreferenceProvider} from '@/core/hooks/useUserThemePreference';
import {THEMES, useUserThemePreference} from '@/core/hooks/useUserThemePreference';
import {fiatStore} from '@/core/stores/fiatStore';
import {uiStore} from '@/core/stores/uiStore';
import {GlobalStyles, Theme} from '@/core/ui/system';
import {ToastProvider} from '@/core/ui/Toast';
import {createMulticallProviderFactory} from '@/core/utils/multicall';

import type {AppPropsWithLayout} from '../../types/next';
import {bootstrap} from '../bootstrap';
import {appConfig} from '../config';

const queryClient = new QueryClient();

const cache = createCache({
  key: 'bridge-app',
});

const failoverProvider: ProviderFactory = memoize((chainId) => createFailoverProvider(chainId));
const multicallProvider = createMulticallProviderFactory(failoverProvider);

bootstrap(appConfig, multicallProvider);

const App = observer(({Component, pageProps}: AppPropsWithLayout) => {
  const {walletModal} = uiStore;
  const getLayout = Component.getLayout ?? ((page) => page);
  const {userThemePreference} = useUserThemePreference();

  useEffect(() => {
    const iconTheme =
      THEMES[userThemePreference].palette.mode === 'light' ? IconTheme.LZ_LIGHT : IconTheme.LZ_DARK;
    setIconTheme(iconTheme);
  }, [userThemePreference]);

  useEffect(() => {
    fiatStore.update();
  }, []);

  return (
    <JsonRpcProviderContext.Provider value={multicallProvider}>
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={cache}>
          <UserThemePreferenceProvider>
            <ToastProvider>
              <GlobalStyles
                styles={(theme: Theme) => ({
                  body: {
                    backgroundColor: theme.palette.background.default,
                  },
                })}
              />
              {getLayout(<Component {...pageProps} />)}
              <GasOnDestinationModal
                open={uiStore.dstNativeAmountModal.value}
                onClose={uiStore.dstNativeAmountModal.close}
              />
              <AccountModal open={walletModal.value} onClose={walletModal.close} />
            </ToastProvider>
          </UserThemePreferenceProvider>
        </CacheProvider>
      </QueryClientProvider>
    </JsonRpcProviderContext.Provider>
  );
});

export default App;
