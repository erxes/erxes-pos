import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { mutations, queries } from '../graphql';
import Cash from './cash';
import Card from './card';
import Qpay from './qpay';

const PaymentMethods = () => {
  const router = useRouter();

  const [addPayment] = useMutation(gql(mutations.ordersAddPayment), {
    variables: {
      _id: router.query.orderId,
    },
    refetchQueries: [
      {
        query: gql(queries.orderDetail),
      },
      'OrderDetail',
    ],
  });

  return (
    <div className="row payment-methods">
      <Cash addPayment={addPayment} />
      <Card />
      <Qpay />
    </div>
  );
};

export default PaymentMethods;
