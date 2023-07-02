import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { GlobalStyles } from '@/styles/globalStyles';
import { darkTheme } from '@/styles/theme';
import { Header, Footer } from '@/components/global';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  ethereumClient,
  projectId,
  wagmiConfig,
  Web3Modal,
  WagmiConfig,
} from '@/wallet/walletConfig';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>
          <GlobalStyles theme={darkTheme} />
          <Header />
          <Component {...pageProps} />
          <Footer />
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </WagmiConfig>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
