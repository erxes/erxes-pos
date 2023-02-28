import useAddPayment from 'lib/useAddPayment';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import { useCheckoutContext } from 'modules/checkout/context';
import type { ConfigsState } from 'modules/types';

const Payment = ({ type, title, icon }: ConfigsState['paymentTypes'][0]) => {
  const { amounts } = useCheckoutContext();
  const amount = amounts[type] || 0;
  const { addPayment, loading } = useAddPayment();

  const handleClick = () => {
    addPayment({
      paidAmounts: [{ _id: Math.random().toString(), amount, type }],
    });
  };

  return (
    <PaymentMethod
      name={type}
      onClick={handleClick}
      btnText={title}
      loading={loading}
    >
      <span className="flex-v-center">
        <h4 className={`icon-${icon}`}></h4>
        <h6>{title}</h6>
      </span>
    </PaymentMethod>
  );
};

export default Payment;
