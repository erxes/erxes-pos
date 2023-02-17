/* eslint-disable react-hooks/exhaustive-deps */
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import { useEffect, useState } from 'react';
import { useUI } from 'ui/context';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import TDBLogo from 'icons/TDBLogo';

export const TDB_CARD = 'TDBCard';

const TDBCard = () => {
  const { setModalView, openModal } = useUI();
  const [loading, setLoading] = useState(true);
  const { paymentTypes } = useConfigsContext();

  const PATH = 'http://localhost:8088';

  useEffect(() => {
    if (paymentTypes.find((pt) => pt.type === TDB_CARD)) {
      const details: any = {
        operation: 'Logon',
        hostIndex: 0,
        ecrRefNo: 0
      };

      const formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      const formBodyStr = formBody.join('&');

      fetch(`${PATH}/ecrt1000`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formBodyStr,
      })
        .then((res) => res.json())
        .then((res: any) => {
          console.log(res, "---");
          if (res && res.ecrResult && res.ecrResult.RespCode === '00') {
            setLoading(false);
          }
        })
        .catch((e) => console.log(e, 'errorr'));
    }
  }, []);

  if (loading) return null;

  return (
    <PaymentMethod
      name={TDB_CARD}
      onClick={() => {
        setModalView('_VIEW');
        openModal();
      }}
      btnText="Гүйлгээ хийх"
    >
      <TDBLogo className="-tdb" />
    </PaymentMethod>
  );
};

export default TDBCard;
