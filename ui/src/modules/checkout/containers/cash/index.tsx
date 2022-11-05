import { useCheckoutContext } from 'modules/checkout/context';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import CashIcon from 'modules/common/icons/🤑';
import useAddPayment from 'lib/useAddPayment';

const Cash = () => {
  const { cash } = useCheckoutContext();

  const { addPayment, loading } = useAddPayment();

  const handleClick = () => {
    addPayment({
      cashAmount: cash,
    });
  };

  return (
    <PaymentMethod
      name="cash"
      onClick={handleClick}
      btnText="Төлөх"
      loading={loading}
    >
      <CashIcon className="-cash" />
      &nbsp;&nbsp;<h6>Бэлнээр</h6>
    </PaymentMethod>
  );
};

export default Cash;
