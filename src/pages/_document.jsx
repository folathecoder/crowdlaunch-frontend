import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { OG_URL } from '@/data/appInfo';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
          <meta name="theme-color" content="#000000" />
          <meta
            property="og:url"
            content="https://crowdlaunch.vercel.app/"
            key="ogurl"
          />
          <meta
            property="og:site_name"
            content="crowdlaunch"
            key="ogsitename"
          />
          <meta property="og:image" content={OG_URL} />
          <meta property="og:image:type" content={OG_URL} />
          <meta property="og:image:width" content={OG_URL} />
          <meta property="og:image:height" content={OG_URL} />
          <meta name="twitter:image" content={OG_URL} />
          <meta name="twitter:image:type" content={OG_URL} />
          <meta name="twitter:image:width" content={OG_URL} />
          <meta name="twitter:image:height" content={OG_URL} />
          <meta name="twitter:card" content="summary" key="twcard" />
          <meta name="twitter:creator" content="crowdlaunch" key="twhandle" />
          <meta property="og:image:alt" content="Crowdlaunch" />
          <meta property="twitter:image:alt" content="Crowdlaunch" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="540" />
          <link
            rel="apple-touch-icon"
            href="/public/images/header/AppLogo.svg"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
            integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
            crossOrigin="anonymous"
          ></link>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,800;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
