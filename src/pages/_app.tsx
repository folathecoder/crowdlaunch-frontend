import '@/styles/global.css';
import 'react-image-crop/dist/ReactCrop.css';

import type { AppProps } from 'next/app';
import { GlobalStyles } from '@/styles/globalStyles';
import { blackTheme } from '@/styles/theme';
import { Header, Footer } from '@/components/global';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  wagmiConfig,
  WagmiConfig,
  RainbowKitProvider,
  chains,
  darkTheme,
} from '@/wallet/walletConfig';
import AppProvider from '@/contexts/AppContext';
import { appInfo } from '@/wallet/walletInfo';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            chains={chains}
            theme={darkTheme()}
            appInfo={appInfo}
          >
            <GlobalStyles theme={blackTheme} />
            <AppProvider>
              <Header />
              <Component {...pageProps} />
              <Footer />
            </AppProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
