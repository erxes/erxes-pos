/* eslint-disable react-hooks/exhaustive-deps */
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import { useEffect, useState } from 'react';
import { useUI } from 'ui/context';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import TDBLogo from 'icons/TDBLogo';

export const TDB_CARD = 'TDBCard';
const PATH = 'http://localhost:8088';

export const objToString = (details: any) => {
  const formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
};

const TDBCard = () => {
  const { setModalView, openModal } = useUI();
  const [loading, setLoading] = useState(true);
  const { paymentTypes } = useConfigsContext();

  useEffect(() => {
    if (paymentTypes.find((pt) => pt.type === TDB_CARD)) {
      const details: any = {
        operation: 'Logon',
        hostIndex: 0,
        ecrRefNo: 0,
      };

      fetch(`${PATH}/ecrt1000`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
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
