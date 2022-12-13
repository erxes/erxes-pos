import React from 'react';
import { useUI } from 'modules/common/ui/context';
import { useCheckoutContext } from 'modules/checkout/context';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import OnlinePayment from 'icons/OnlinePayment';
import { toast } from 'react-toastify';

const Mobile = () => {
  const { mobile } = useCheckoutContext();
  const { setModalView, openModal } = useUI();

  const handleClick = () => {
    if ((mobile || 0) >= 10) {
      setModalView('MOBILE_VIEW');
      openModal();
      return;
    }
    return toast.error('10₮ дээш үнийн дүн оруулана уу');
  };

  return (
    <PaymentMethod name="mobile" onClick={handleClick} btnText="Хүсэлт илгээх">
      <OnlinePayment />
      &nbsp;&nbsp;<h6>Цахимаар</h6>
    </PaymentMethod>
  );
};

export default Mobile;
