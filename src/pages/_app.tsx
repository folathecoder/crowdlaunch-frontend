import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { GlobalStyles } from '@/styles/globalStyles';
import { darkTheme } from '@/styles/theme';
import { Header } from '@/components/global';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import useWallet from '@/wallet/useWallet';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const {
    ethereumClient,
    projectId,
    wagmiConfig,
    Web3Modal,
    WagmiConfig,
    isConnected,
    isDisconnected,
    activeWallet,
  } = useWallet();

  console.log(activeWallet);

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <Provider store={store}>
          <GlobalStyles theme={darkTheme} />
          <Header />
          <Component {...pageProps} />
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </Provider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default MyApp;
