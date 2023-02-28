/* eslint-disable react-hooks/exhaustive-deps */
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import { useEffect, useState } from 'react';
import { useUI } from 'ui/context';
import TDBLogo from 'icons/TDBLogo';
import useTDB from './useTDB';

const TDBCard = () => {
  const { setModalView, openModal } = useUI();
  const [loading, setLoading] = useState(true);

  const { tdbCardInfo, endPoint, objToString, method, headers, TDB_CARD } =
    useTDB();

  useEffect(() => {
    if (tdbCardInfo) {
      const details: any = {
        operation: 'Logon',
        hostIndex: 0,
        ecrRefNo: 0,
      };

      fetch(endPoint, {
        method,
        headers,
        body: objToString(details),
      })
        .then((res) => res.json())
        .then((res: any) => {
          if (res && res.ecrResult && res.ecrResult.RespCode === '00') {
            setLoading(false);
          }
        })
        .catch((e) => console.log(e.message));
    }
  }, []);

  if (loading) return null;

  return (
    <PaymentMethod
      name={TDB_CARD}
      onClick={() => {
        setModalView('TDB_VIEW');
        openModal();
      }}
      btnText="Гүйлгээ хийх"
    >
      <TDBLogo className="-tdb" />
    </PaymentMethod>
  );
};

export default TDBCard;
