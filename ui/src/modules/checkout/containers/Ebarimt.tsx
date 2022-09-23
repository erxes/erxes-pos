import dynamic from 'next/dynamic';

import CheckMode from 'modules/CheckMode';

const PosView = dynamic(() => import('../components/Ebarimt/pos'), {
  suspense: true,
});

const KioskView = dynamic(() => import('../components/Ebarimt/kiosk'), {
  suspense: true,
});

const EbarimtContainer = () => {
  return <CheckMode pos={<PosView />} kiosk={<KioskView />} />;
};

export default EbarimtContainer;
