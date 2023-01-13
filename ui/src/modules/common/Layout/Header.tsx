import { memo } from 'react';
import Image from 'ui/Image';
import Link from 'next/link';
import HeaderMenu from './HeaderMenu';
import { IComponent } from 'modules/types';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import { useAddQuery } from 'lib/useQuery';
import { useApp } from 'modules/AppContext';

const PosHeader: IComponent = ({ children }) => {
  const { logoUrl } = useConfigsContext();
  const { query } = useAddQuery();
  const { setCart } = useApp();

  return (
    <header className="pos-header flex-v-center flex-0">
      <div className="flex-v-center flex-0">
        <HeaderMenu />
        <div
          className="gray-border"
          onClick={() => !query.orderId && setCart([])}
        >
          <Link href="/">
            <a className="logo">
              <div className="img-wrap">
                <Image
                  src={logoUrl || ''}
                  fill
                  priority
                  alt="Erxes"
                  fallBack={'/logo-dark.png'}
                />
              </div>
            </a>
          </Link>
        </div>
      </div>
      {children}
    </header>
  );
};
export default memo(PosHeader);
