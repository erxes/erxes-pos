import { IComponent } from 'modules/types';
import { useMutation, gql } from '@apollo/client';
import { mutations } from '../graphql';
import Login from '../components/Login';

export type IHandleLogin = (email: string, password: string) => void;

const LoginContainer: IComponent = () => {
  const [login, { loading }] = useMutation(gql(mutations.login));

  const handleLogin: IHandleLogin = (email, password) => {
    login({ variables: { email, password } });
  };

  return <Login login={handleLogin} loading={loading} />;
};

export default LoginContainer;
