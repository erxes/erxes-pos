import dynamic from 'next/dynamic';
import { IProps } from 'modules/types';
import { Suspense, FC } from 'react';
import { useConfigsContext } from '../containers/Configs';
import { useState } from 'react';
import type { IHandleLogin } from '../containers/Login';
import Button from 'modules/common/ui/Button';
import Input from 'modules/common/ui/Input';

type ILogin = IProps & {
  login: IHandleLogin;
  loading: boolean;
  error: any;
};

const ChooseConfig = dynamic(() => import('../containers/ChooseConfig'), {
  suspense: true,
});

const Login: FC<ILogin> = ({ login, loading, error }) => {
  const { configs } = useConfigsContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleLogin}>
      <div>{(error || {}).message}</div>
      {configs && configs.length > 1 && (
        <Suspense fallback={<div />}>
          <ChooseConfig />
        </Suspense>
      )}
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
