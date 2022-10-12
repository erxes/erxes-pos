import type { IComponent } from 'modules/types';
import { useConfigsContext } from '../containers/Configs';
import Image from 'ui/Image';

const LoginLayout: IComponent = ({ children }) => {
  const { currentConfig, logoUrl } = useConfigsContext();

  const { name } = currentConfig || {};

  return (
    <div className="login flex-center">
      <div className="login-content">
        <Image
          alt="name"
          fill
          src={logoUrl || ''}
          fallBack={'/logo-dark.png'}
        />
        <h2 className="text-center">{name}</h2>
        {children}
      </div>
    </div>
  );
};

export default LoginLayout;
