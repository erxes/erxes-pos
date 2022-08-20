import { FC } from 'react';
import type { AppProps } from 'next/app';
import 'styles/styles.min.css';
import { AppContextProvider } from '../modules/AppContext';

interface NoopProps {
  children: React.ReactNode;
}

const Noop: FC<NoopProps> = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;
  console.log('app');
  return (
    <>
      <AppContextProvider>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </AppContextProvider>
    </>
  );
}

export default MyApp;
