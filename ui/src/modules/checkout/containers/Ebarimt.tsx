import { useApp } from 'modules/AppContext';
import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import Loading from 'modules/common/ui/Loading';

const PosView = dynamic(() => import('../components/Ebarimt/pos'), {
  suspense: true,
});

const KioskView = dynamic(() => import('../components/Ebarimt/kiosk'), {
  suspense: true,
});

const EbarimtContainer = () => {
  const { mode } = useApp();
  const [isOrganization, setIsOrganization] = useState(false);

  const props = {
    isOrganization,
    setIsOrganization,
  };

  return (
    <Suspense fallback={<Loading />}>
      {mode === 'pos' && <PosView {...props} />}
      {mode === 'kiosk' && <KioskView {...props} />}
    </Suspense>
  );
};

export default EbarimtContainer;
