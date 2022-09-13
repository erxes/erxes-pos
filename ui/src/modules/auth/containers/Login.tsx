import type { IComponent } from 'modules/types';
import { useMutation, gql } from '@apollo/client';
import { mutations } from '../graphql';
import Login from '../components/Login';

export type IHandleLogin = (email: string, password: string) => void;

const LoginContainer: IComponent = () => {
  const [login, { loading, error }] = useMutation(gql(mutations.login), {
    onCompleted(data) {
      if (data.posLogin === 'loggedIn') return (window.location.href = '/');
    },
    onError(error) {
      console.error(error);
    },
  });

  const handleLogin: IHandleLogin = (email, password) => {
    login({ variables: { email, password } });
  };

  return <Login login={handleLogin} loading={loading} error={error} />;
};

export default LoginContainer;
