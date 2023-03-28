import { memo } from 'react';
import Image from 'ui/Image';
import HeaderMenu from './HeaderMenu';
import { IComponent } from 'modules/types';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import { useRouter } from 'next/router';
import { useApp } from 'modules/AppContext';

const PosHeader: IComponent = ({ children }) => {
  const { logoUrl } = useConfigsContext();
  const router = useRouter();
  const { setInitialState } = useApp();

  return (
    <header className="pos-header flex-v-center flex-0">
      <div className="flex-v-center flex-0">
        <HeaderMenu />
        <div className="gray-border">
          <a
            className="logo"
            onClick={() => {
              setInitialState();
              router.push('/');
            }}
          >
            <div className="img-wrap">
              <Image
                src={logoUrl || ''}
                fill
                priority
                alt="Erxes"
                fallBack={'/logo-dark.png'}
                onError={(error: any) => console.log(error.message)}
              />
            </div>
          </a>
        </div>
      </div>
      {children}
    </header>
  );
};
export default memo(PosHeader);
