import Golomt from 'icons/Golomt';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import { objToBase64 } from 'modules/utils';
import { useEffect, useState } from 'react';
import { useUI } from 'ui/context';

export const GOLOMT_CARD = 'golomtCard';

const GolomtCard = () => {
  const { setModalView, openModal } = useUI();
  const [loading, setLoading] = useState(true);

  const PATH = 'http://localhost:8500';

  const data = {
    portNo: '7',
    requestID: '789',
    terminalID: '13152634',
    operationCode: '26',
    amount: '0',
    bandwidth: '115200',
    timeout: '540000',
    currencyCode: '496',
    cMode: '',
    cMode2: '',
    additionalData: '',
    cardEntryMode: '',
    fileData: '',
  };

  useEffect(() => {
    fetch(`${PATH}/requestToPos/message?data=${objToBase64(data)}`)
      .then((res) => res.json())
      .then((res: any) => {
        if (res?.responseCode === '00') {
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  if (loading) return null;

  return (
    <PaymentMethod
      name={GOLOMT_CARD}
      onClick={() => {
        setModalView('GOLOMT_VIEW');
        openModal();
      }}
      btnText="Гүйлгээ хийх"
    >
      <Golomt className="-golomtCard" />
    </PaymentMethod>
  );
};

export default GolomtCard;
