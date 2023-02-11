import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import Visa from 'icons/Visa';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import { useEffect, useState } from 'react';
import { useUI } from 'ui/context';

export const DATA_BANK_CARD = 'dataBankCard';

const Card = () => {
  const { setModalView, openModal } = useUI();
  const [loading, setLoading] = useState(true);
  const { paymentTypes } = useConfigsContext();

  if (!paymentTypes.find(pt => pt.type === 'khaanCard')) {
    return null;
  }

  const PATH = 'http://localhost:27028';

  useEffect(() => {
    fetch(`${PATH}/ajax/get-status-info`)
      .then((res) => res.json())
      .then((res: any) => {
        if (res && res.status_code === 'ok') {
          setLoading(false);
        }
      })
      .catch((e) => {});
  }, []);

  if (loading) return null;

  return (
    <PaymentMethod
      name={DATA_BANK_CARD}
      onClick={() => {
        setModalView('VISA_VIEW');
        openModal();
      }}
      btnText="Гүйлгээ хийх"
    >
      <Visa className="-card" />
    </PaymentMethod>
  );
};

export default Card;
