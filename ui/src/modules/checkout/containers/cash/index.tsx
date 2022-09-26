import { useCheckoutContext } from 'modules/checkout/context';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import CashIcon from 'modules/common/icons/🤑';

const Cash = ({ addPayment }: any) => {
  const { cash } = useCheckoutContext();

  const handleClick = () => {
    addPayment({
      variables: {
        cashAmount: cash,
      },
    });
  };

  return (
    <PaymentMethod name="cash" onClick={handleClick} btnText="Төлөх">
      <CashIcon />
      &nbsp;&nbsp;<h6>Бэлнээр</h6>
    </PaymentMethod>
  );
};

export default Cash;
