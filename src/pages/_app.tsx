import type { AppProps } from 'next/app';
import { GlobalStyles } from '@/styles/globalStyles';
import { darkTheme } from '@/styles/theme';
import { Header } from '@/components/global';
import '@/styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles theme={darkTheme} />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
