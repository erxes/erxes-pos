import type { IComponent } from 'modules/types';
import { useConfigsContext } from '../containers/Configs';
import Image from 'ui/Image';

const LoginLayout: IComponent = ({ children }) => {
  const { currentConfig, logoUrl } = useConfigsContext();

  const { name } = currentConfig || {};

  return (
    <div className="login flex-center">
      <div className="login-wrapper flex-center">
        <div className="login-content">
          <div className="logo-wrap">
            <Image
              alt="name"
              fill
              src={logoUrl || ''}
              fallBack={'/logo-dark.png'}
            />
          </div>
          <h5>Welcome to {name}!</h5>
          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
