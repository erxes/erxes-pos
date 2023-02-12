import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import Visa from 'icons/Visa';
import { useEffect, useState } from 'react';
import { useUI } from 'ui/context';

export const KHANBANK_CARD = 'khaanCard';

const Card = () => {
  const { setModalView, openModal } = useUI();
  const [loading, setLoading] = useState(true);

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
