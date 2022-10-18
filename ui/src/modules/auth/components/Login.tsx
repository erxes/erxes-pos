import { IProps } from 'modules/types';
import { useState, FC } from 'react';
import type { IHandleLogin } from '../containers/Login';
import ChooseConfig from '../containers/ChooseConfig';
import Button from 'ui/Button';
import Input from 'ui/Input';
import Eye from 'icons/Eye';
import EyeSlash from 'icons/EyeSlash';

type ILogin = IProps & {
  login: IHandleLogin;
  loading: boolean;
  error: any;
};

const Login: FC<ILogin> = ({ login, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState<any>(false);

  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleLogin}>
      <ChooseConfig />
      <label htmlFor="email">Enter your email</label>
      <Input
        type="email"
        placeholder="example@mail.com"
        onChange={setEmail}
        required
      />
      <label htmlFor="password">Enter your password</label>
      <div className="-password">
        <Input
          type={showPass ? '' : 'password'}
          placeholder="************"
          onChange={setPassword}
          required
        />
        <Button
          variant="ghost"
          type="button"
          onClick={() => setShowPass((prev: boolean) => !prev)}
        >
          {showPass ? <EyeSlash /> : <Eye />}
        </Button>
      </div>
      <Button type="submit" className="primary" disabled={loading}>
        SIGN IN
      </Button>
    </form>
  );
};

export default Login;
