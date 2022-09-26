import { IProps } from 'modules/types';
import { useState, FC } from 'react';
import type { IHandleLogin } from '../containers/Login';
import ChooseConfig from '../containers/ChooseConfig';
import Button from 'ui/Button';
import Input from 'ui/Input';

type ILogin = IProps & {
  login: IHandleLogin;
  loading: boolean;
  error: any;
};

const Login: FC<ILogin> = ({ login, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleLogin}>
      <div>{(error || {}).message}</div>
      <ChooseConfig />
      <label htmlFor="email">Email</label>
      <Input type="email" placeholder="Email" onChange={setEmail} />
      <label htmlFor="password">Password</label>
      <Input type="password" placeholder="Password" onChange={setPassword} />
      <Button type="submit" className="primary" disabled={loading}>
        Login
      </Button>
    </form>
  );
};

export default Login;
