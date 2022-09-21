import { useRouter } from 'next/router';
import { useMutation, gql } from '@apollo/client';
import { useCheckoutContext } from 'modules/checkout/context';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import { mutations } from '../../graphql';
import CashIcon from 'modules/common/icons/🤑';

const Cash = ({ addPayment }: any) => {
  const router = useRouter();
  const { orderId } = router.query;

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
