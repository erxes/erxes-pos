import 'styles/styles.min.css';
import { IComponent } from 'modules/types';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import apolloClient from 'modules/apolloClient';
import { AppContextProvider } from '../modules/AppContext';
import ConfigsProvider from 'modules/auth/containers/Configs';
import CheckAuth from 'modules/auth/CheckAuth';

const Noop: IComponent = ({ children }) => <>{children}</>;

function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;
  return (
    <ApolloProvider client={apolloClient}>
      <AppContextProvider>
        <ConfigsProvider>
          <CheckAuth>
            <Layout pageProps={pageProps}>
              <Component {...pageProps} />
            </Layout>
          </CheckAuth>
        </ConfigsProvider>
      </AppContextProvider>
    </ApolloProvider>
  );
}

export default App;
