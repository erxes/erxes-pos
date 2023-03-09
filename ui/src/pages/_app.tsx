import 'simplebar/dist/simplebar.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../../public/icon.min.css';
import 'styles/styles.min.css';
import { IComponent } from 'modules/types';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import apolloClient from 'modules/apolloClient';
import { AppContextProvider } from '../modules/AppContext';
import UIProvider from 'ui/context';
import { CheckoutContextProvider } from 'modules/checkout/context';
import ConfigsProvider from 'modules/auth/containers/Configs';
import CheckAuth from 'modules/auth/CheckAuth';
import { ToastContainer } from 'react-toastify';
import RestartKiosk from 'modules/kiosk/components/Restart';
import Head from 'next/head';

const Noop: IComponent = ({ children }) => <>{children}</>;

function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  return (
    <ApolloProvider client={apolloClient}>
      <AppContextProvider>
        <UIProvider>
          <ConfigsProvider>
            <CheckAuth>
              <CheckoutContextProvider>
                <Head>
                  <link rel="manifest" href="/manifest.json" />
                  <link
                    href="/icons/favicon-16x16.png"
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                  />
                  <link
                    href="/icons/favicon-32x32.png"
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                  />
                  <link rel="apple-touch-icon" href="/apple-icon.png"></link>
                  <meta name="theme-color" content="#ffffff" />
                </Head>
                <Layout pageProps={pageProps}>
                  <Component {...pageProps} />
                </Layout>
                <RestartKiosk />
              </CheckoutContextProvider>
            </CheckAuth>
          </ConfigsProvider>
        </UIProvider>
      </AppContextProvider>
      <ToastContainer theme="dark" position="top-center" limit={1} />
    </ApolloProvider>
  );
}

export default App;
