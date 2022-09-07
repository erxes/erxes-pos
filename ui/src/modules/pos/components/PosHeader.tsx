import { FC, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ActiveOrders from 'modules/slots/containers/ActiveOrders';
import PosHeaderMenu from './PosHeaderMenu';

interface PosHeaderProps {}

const PosHeader: FC<PosHeaderProps> = ({}) => {
  return (
    <header className="pos-header flex-v-center">
      <div className="flex-v-center flex-0">
        <PosHeaderMenu />
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
      <ActiveOrders />
    </header>
  );
};
export default memo(PosHeader);
