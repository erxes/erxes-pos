import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import Visa from 'icons/Visa';
import { useUI } from 'ui/context';

const Card = () => {
  const { setModalView, openModal } = useUI();

  return (
    <PaymentMethod
      name="card"
      onClick={() => {
        setModalView('VISA_VIEW');
        openModal();
      }}
      btnText="Гүйлгээ хийх"
    >
      <Visa />
    </PaymentMethod>
  );
};

export default Card;
