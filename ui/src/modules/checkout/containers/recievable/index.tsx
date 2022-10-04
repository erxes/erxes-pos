import { useCheckoutContext } from 'modules/checkout/context';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
// import CashIcon from 'modules/common/icons/🤑';

const Recievable = ({ addPayment }: any) => {
  const { receivable } = useCheckoutContext();

  const handleClick = () => {
    addPayment({
      variables: {
        receivableAmount: receivable,
      },
    });
  };

  return (
    <PaymentMethod name="receivable" onClick={handleClick} btnText="Тооцох">
      {/* <CashIcon /> */}
      &nbsp;&nbsp;<h6>Дараах</h6>
    </PaymentMethod>
  );
};

export default Recievable;
