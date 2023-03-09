/* eslint-disable react-hooks/exhaustive-deps */
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import Visa from 'icons/Visa';
import { useEffect, useState } from 'react';
import { useUI } from 'ui/context';
import { useConfigsContext } from 'modules/auth/containers/Configs';

export const KHANBANK_CARD = 'khaanCard';

const Card = () => {
  const { setModalView, openModal } = useUI();
  const [loading, setLoading] = useState(true);
  const { paymentTypes } = useConfigsContext();

  const PATH = 'http://localhost:27028';

  useEffect(() => {
    (paymentTypes || []).find((pt) => pt.type === KHANBANK_CARD) &&
      fetch(`${PATH}/ajax/get-status-info`)
        .then((res) => res.json())
        .then((res: any) => {
          if (res && res.status_code === 'ok') {
            setLoading(false);
          }
        })
        .catch((e) => null);
  }, []);

  if (loading) return null;

  return (
    <PaymentMethod
      name={KHANBANK_CARD}
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
