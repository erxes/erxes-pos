import { FC, memo } from 'react';
import Image from 'next/image';
import SlotsHeader from '../../slots/components/SlotHeader';
import Link from 'next/link';
// import dynamic from 'next/dynamic';
// import { Header, GrayBorder } from './styles';
import PosHeaderMenu from './PosHeaderMenu';
// import SlotsHeader from '../../slots/components/SlotsHeader';

// const DynamicHeader = dynamic(() => import('../components/header'), {
//   suspense: true,
// })

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
      <SlotsHeader />
    </header>
  );
};
export default memo(PosHeader);
