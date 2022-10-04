import { useRouter } from 'next/router';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import { gql, useMutation } from '@apollo/client';
import { mutations, queries } from '../graphql';
import Cash from './cash';
import Card from './card';
import Qpay from './qpay';
import Recievable from './recievable';
import { toast } from 'react-toastify';
import { getMode } from 'modules/utils';

const PaymentMethods = () => {
  const router = useRouter();
  const { allowReceivable } = useConfigsContext();

  const [addPayment] = useMutation(gql(mutations.ordersAddPayment), {
    variables: {
      _id: router.query.orderId,
    },
    refetchQueries: [
      {
        query: gql(queries.orderDetail),
      },
      'orderDetail',
    ],
    onError(error) {
      toast.error(error.message);
    },
  });

  return (
    <div className="row payment-methods">
      {getMode() === 'pos' && <Cash addPayment={addPayment} />}
      <Card addPayment={addPayment} />
      <Qpay />
      {getMode() === 'pos' && allowReceivable && (
        <Recievable addPayment={addPayment} />
      )}
    </div>
  );
};

export default PaymentMethods;
