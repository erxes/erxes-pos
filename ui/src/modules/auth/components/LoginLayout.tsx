import type { IComponent } from 'modules/types';
import Image from 'next/future/image';
import { useConfigsContext } from '../containers/Configs';

const LoginLayout: IComponent = ({ children }) => {
  const { currentConfig } = useConfigsContext();

  const { uiOptions, name } = currentConfig || {};

  return (
    <div className="login flex-center">
      {/* <Image src="/background.png" fill sizes="100vw" alt="erxes" /> */}
      <div className="login-content">
        <div className="img-wrap">
          {/* <Image fill src={uiOptions.logo || '/logo-dark.png'} alt="name" /> */}
        </div>
        <h2 className="text-center">{name}</h2>
        {children}
      </div>
    </div>
  );
};

export default LoginLayout;
