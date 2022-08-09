import { FC, memo } from 'react';
import Image from 'next/image';
import SlotsHeader from '../../slots/components/SlotHeader';
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
    <header className="pos-header">
      <div>
        <PosHeaderMenu />
        <div className="gray-border">
          <div className="logo">
            <Image
              src="https://www.erxes.org/img/logo_dark.svg"
              width={80}
              height={40}
              objectFit="contain"
              priority
              alt="Erxes"
            />
          </div>
        </div>
      </div>
      <SlotsHeader />
    </header>
  );
};
export default memo(PosHeader);
