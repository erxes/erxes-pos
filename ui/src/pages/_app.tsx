import 'simplebar/dist/simplebar.min.css';
import 'styles/styles.min.css';
import { StrictMode } from 'react';
import { IComponent } from 'modules/types';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import apolloClient from 'modules/apolloClient';
import { Suspense } from 'react';
import { AppContextProvider } from '../modules/AppContext';
import UIProvider from 'ui/context';
import ConfigsProvider from 'modules/auth/containers/Configs';
import CheckAuth from 'modules/auth/CheckAuth';

const Noop: IComponent = ({ children }) => <>{children}</>;

function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;
  return (
    <StrictMode>
      <ApolloProvider client={apolloClient}>
        <AppContextProvider>
          <UIProvider>
            <ConfigsProvider>
              <CheckAuth>
                <Suspense>
                  <Layout pageProps={pageProps}>
                    <Component {...pageProps} />
                  </Layout>
                </Suspense>
              </CheckAuth>
            </ConfigsProvider>
          </UIProvider>
        </AppContextProvider>
      </ApolloProvider>
    </StrictMode>
  );
}

export default App;
