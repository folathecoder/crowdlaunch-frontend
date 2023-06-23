import type { AppProps } from 'next/app';
import { GlobalStyles } from '@/styles/globalStyles';
import { darkTheme } from '@/styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles theme={darkTheme} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
