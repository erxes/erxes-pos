import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import Loading from 'modules/common/ui/Loading';
import { getMode } from 'modules/utils';
import type { IEbarimt } from '../types';

const PosView = dynamic(() => import('../components/Ebarimt/pos'), {
  suspense: true,
});

const KioskView = dynamic(() => import('../components/Ebarimt/kiosk'), {
  suspense: true,
});

const EbarimtContainer = () => {
  const [type, setType] = useState<IEbarimt['type']>('');
  const mode = getMode();

  const props = {
    type,
    setType,
  };

  return (
    <Suspense fallback={<Loading />}>
      {mode === 'pos' && <PosView {...props} />}
      {mode === 'kiosk' && <KioskView {...props} />}
    </Suspense>
  );
};

export default EbarimtContainer;
