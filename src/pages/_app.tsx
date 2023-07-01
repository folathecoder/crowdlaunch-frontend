import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { GlobalStyles } from '@/styles/globalStyles';
import { darkTheme } from '@/styles/theme';
import { Header } from '@/components/global';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GlobalStyles theme={darkTheme} />
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
