import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeaderMenu from './HeaderMenu';
import { IComponent } from 'modules/types';

const PosHeader: IComponent = ({ children }) => {
  return (
    <header className="pos-header flex-v-center flex-0">
      <div className="flex-v-center flex-0">
        <HeaderMenu />
        <div className="gray-border">
          <Link href="/">
            <a className="logo">
              <div className="img-wrap">
                <Image
                  src="/logo-dark.png"
                  layout="fill"
                  objectFit="contain"
                  priority
                  alt="Erxes"
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
