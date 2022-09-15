import { useLazyQuery, gql } from '@apollo/client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { IEbarimt } from '../types';
import { queries } from '../graphql';
import CheckMode from 'modules/CheckMode';

const PosView = dynamic(() => import('../components/Ebarimt/pos'), {
  suspense: true,
});

const KioskView = dynamic(() => import('../components/Ebarimt/kiosk'), {
  suspense: true,
});

const EbarimtContainer = () => {
  const [checkRegister, { loading, data }] = useLazyQuery(
    gql(queries.ordersCheckCompany)
  );
  const [type, setType] = useState<IEbarimt['type']>('');

  const props = {
    type,
    setType,
    loading,
    data,
    checkRegister,
  };

  return (
    <CheckMode pos={<PosView {...props} />} kiosk={<KioskView {...props} />} />
  );
};

export default EbarimtContainer;
