import { FC, ReactNode, Suspense } from 'react';
import { getMode } from './utils';
import Loading from 'ui/Loading';

interface IProps {
  kiosk: ReactNode;
  pos: ReactNode;
}

const CheckMode: FC<IProps> = ({ pos, kiosk }) => {
  const mode = getMode();
  return (
    <Suspense fallback={<Loading />}>
      {mode === 'pos' && pos}
      {mode === 'kiosk' && kiosk}
    </Suspense>
  );
};

export const checkLayoutMode = (pos: any, kiosk: any) => {
  const mode = getMode();
  if (mode === 'pos') return pos;
  if (mode === 'kiosk') return kiosk;
};

export default CheckMode;
