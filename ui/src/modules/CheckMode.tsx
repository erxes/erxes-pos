import { FC, ReactNode, Suspense } from 'react';
import { getMode } from './utils';
import Loading from 'ui/Loading';
import NotFound from './common/Layout/NotFound';

interface IProps {
  kiosk?: ReactNode;
  pos?: ReactNode;
  waiting?: ReactNode;
  kitchen?: ReactNode;
}

const CheckMode: FC<IProps> = (props) => {
  const mode = getMode();

  const renderMode = (currentMode: 'kiosk' | 'pos' | 'waiting' | 'kitchen') => {
    if (mode === currentMode) {
      return props[currentMode] ? props[currentMode] : <NotFound />;
    }
  };

  return (
    <Suspense fallback={<Loading className="h-100vh primary" />}>
      {renderMode('kiosk')}
      {renderMode('pos')}
      {renderMode('waiting')}
      {renderMode('kitchen')}
    </Suspense>
  );
};

export const checkLayoutMode = (pos: any, kiosk: any) => {
  const mode = getMode();
  if (mode === 'pos') return pos;
  if (mode === 'kiosk') return kiosk;
};

export default CheckMode;
