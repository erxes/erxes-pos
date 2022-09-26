import 'simplebar/dist/simplebar.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/styles.min.css';
import { IComponent } from 'modules/types';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import apolloClient from 'modules/apolloClient';
import { Suspense } from 'react';
import { AppContextProvider } from '../modules/AppContext';
import UIProvider from 'ui/context';
import ConfigsProvider from 'modules/auth/containers/Configs';
import CheckAuth from 'modules/auth/CheckAuth';
import { ToastContainer } from 'react-toastify';
import Loading from 'ui/Loading';

const Noop: IComponent = ({ children }) => <>{children}</>;

function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;
  return (
    <ApolloProvider client={apolloClient}>
      <AppContextProvider>
        <UIProvider>
          <ConfigsProvider>
            <CheckAuth>
              <Layout pageProps={pageProps}>
                <Component {...pageProps} />
              </Layout>
            </CheckAuth>
          </ConfigsProvider>
        </UIProvider>
      </AppContextProvider>
      <ToastContainer theme="dark" position="top-center" />
    </ApolloProvider>
  );
}

export default App;
