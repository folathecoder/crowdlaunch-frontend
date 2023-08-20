import '@/styles/global.css';
import 'react-image-crop/dist/ReactCrop.css';
import { Cloudinary } from '@cloudinary/url-gen';
import type { AppProps } from 'next/app';
import { GlobalStyles } from '@/styles/globalStyles';
import { blackTheme } from '@/styles/theme';
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
import AppProvider from '@/contexts/AppContext';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>
          <GlobalStyles theme={blackTheme} />
          <AppProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </AppProvider>
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </WagmiConfig>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
