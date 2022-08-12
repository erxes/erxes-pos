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
    <header className="pos-header flex-v-center">
      <div className="flex-v-center flex-0">
        <PosHeaderMenu />
        <div className="gray-border">
          <div className="logo">
            <div className="img-wrap">
              <Image
                src="https://www.erxes.org/img/logo_dark.svg"
                layout="fill"
                objectFit="contain"
                priority
                alt="Erxes"
              />
            </div>
          </div>
        </div>
      </div>
      <SlotsHeader />
    </header>
  );
};
export default memo(PosHeader);
