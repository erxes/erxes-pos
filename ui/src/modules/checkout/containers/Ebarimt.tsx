import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { IEbarimt } from '../types';

import CheckMode from 'modules/CheckMode';

const PosView = dynamic(() => import('../components/Ebarimt/pos'), {
  suspense: true,
});

const KioskView = dynamic(() => import('../components/Ebarimt/kiosk'), {
  suspense: true,
});

const EbarimtContainer = () => {
  const [type, setType] = useState<IEbarimt['type']>('');

  const props = {
    type,
    setType,
  };

  return (
    <CheckMode pos={<PosView {...props} />} kiosk={<KioskView {...props} />} />
  );
};

export default EbarimtContainer;
