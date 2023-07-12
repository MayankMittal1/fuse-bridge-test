import '../styles/style.css';
import 'react-toastify/dist/ReactToastify.css';

import {mainnet as aptos_mainnet} from '@layerzerolabs/ui-bridge-aptos';
import {createFailoverProvider, ProviderFactory} from '@layerzerolabs/ui-evm';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {memoize} from 'lodash-es';
import {observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {AccountModal} from '@/bridge/ui/AccountModal';
import {Bridge} from '@/bridge/ui/Bridge';
import {GasOnDestinationModal} from '@/bridge/ui/GasOnDestinationModal';
import {JsonRpcProviderContext} from '@/core/context/JsonRpcProviderContext';
import {useSystemAppearancePreference} from '@/core/hooks/useSystemAppearancePreference';
import {fiatStore} from '@/core/stores/fiatStore';
import {uiStore} from '@/core/stores/uiStore';
import {createBasicTheme, defaultTypography} from '@/core/theme';
import {GlobalStyles, Theme, ThemeProvider} from '@/core/ui/system';
import {ToastProvider} from '@/core/ui/Toast';
import {createMulticallProviderFactory} from '@/core/utils/multicall';

import {bootstrap} from './bootstrap';

const failoverProvider: ProviderFactory = memoize((chainId) => createFailoverProvider(chainId));
const multicallProvider = createMulticallProviderFactory(failoverProvider);

class LzBridgeElement extends HTMLElement {
  private static initialized = false;
  static observedAttributes = ['theme'];
  private root: Root = null!;

  connectedCallback() {
    this.root = createRoot(this);
    this.render();
  }

  private render() {
    this.root.render(
      <Layout>
        <Bridge />
      </Layout>,
    );
  }

  static bootstrap = (config?: {
    stargate?: {
      partner?: {
        feeCollector?: string | null;
        feeBps?: number | null;
        partnerId: number;
      };
    };
  }) => {
    if (this.initialized) throw new Error('App already initialized');
    this.initialized = true;

    bootstrap(
      {
        bridge: {
          aptos: [aptos_mainnet],
          onft: [],
          stargate: {
            partner: config?.stargate?.partner,
          },
          oft: [],
          wrappedToken: [],
        },
      },
      multicallProvider,
    );
  };
}

const queryClient = new QueryClient();

const Layout: React.FC<React.PropsWithChildren> = observer(({children}) => {
  const {walletModal} = uiStore;
  const theme = useSystemAppearancePreference({dark: darkTheme, light: lightTheme});

  useEffect(() => {
    fiatStore.update();
  }, []);

  return (
    <JsonRpcProviderContext.Provider value={multicallProvider}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <GlobalStyles
              styles={(theme: Theme) => ({
                body: {
                  backgroundColor: theme.palette.background.default,
                  fontFamily: theme.typography.fontFamily,
                },
              })}
            />
            {children}
            <GasOnDestinationModal
              open={uiStore.dstNativeAmountModal.value}
              onClose={uiStore.dstNativeAmountModal.close}
            />
            <AccountModal open={walletModal.value} onClose={walletModal.close} />
          </ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </JsonRpcProviderContext.Provider>
  );
});

customElements.define('lz-bridge', LzBridgeElement);

const darkTheme = createBasicTheme({
  typography: {
    ...defaultTypography,
    fontFamily: "'Kanit', sans-serif",
  },
  shape: {borderRadius: 18},
  palette: {
    mode: 'dark',
    primary: {
      main: '#1EC7D3',
      contrastText: '#191326',
      light: '#1EC7D3',
    },
    secondary: {
      main: '#372F47',
      contrastText: '#F4EEFF',
      light: '#372F47',
    },
    info: {main: '#1EC7D3'},
    success: {main: '#8AE06C'},
    error: {main: '#F56868'},
    warning: {main: '#F1DF38'},
    text: {
      primary: '#F4EEFF',
      secondary: '#B8ADD2',
    },
    divider: '#383241',
    background: {
      paper: '#27262D',
      default: '#27262D',
    },
  },
});
const lightTheme = createBasicTheme({
  typography: {
    ...defaultTypography,
    fontFamily: "'Kanit', sans-serif",
  },
  shape: {borderRadius: 18},
  palette: {
    mode: 'light',
    primary: {
      main: '#1EC7D3',
      contrastText: '#FFFFFF',
      light: '#1EC7D3',
    },
    secondary: {
      main: '#EEEAF4',
      contrastText: '#280D5F',
      light: '#EEEAF4d',
    },
    info: {main: '#1EC7D3'},
    success: {main: '#8AE06C'},
    error: {main: '#F56868'},
    warning: {main: '#F1DF38'},
    text: {
      primary: '#280D5F',
      secondary: '#7C70AB',
    },
    divider: '#E7E3EB',
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
    },
  },
});
