import type { IComponent } from 'modules/types';
import { useConfigsContext } from '../containers/Configs';

const LoginLayout: IComponent = ({ children }) => {
  const { currentConfig } = useConfigsContext();

  const { name } = currentConfig || {};

  return (
    <div className="login flex-center">
      <div className="login-content">
        <div className="img-wrap"></div>
        <h2 className="text-center">{name}</h2>
        {children}
      </div>
    </div>
  );
};

export default LoginLayout;
