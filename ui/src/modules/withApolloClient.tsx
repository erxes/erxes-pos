import client from './apolloClient';

const withClient = (App: any) => {
  return function Apollo(props: JSX.IntrinsicAttributes) {
    return <App {...props} apolloClient={client} />;
  };
};
export default withClient;
