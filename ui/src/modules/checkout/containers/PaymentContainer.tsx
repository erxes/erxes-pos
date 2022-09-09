import { useRouter } from 'next/router';
import { useCheckoutContext } from '../context';
import { gql, useQuery } from '@apollo/client';
import { queries } from '../graphql';
import PaymentControls from '../components/PaymentControls';
import PaymentReport from '../components/PaymentReport';
import Loading from 'ui/Loading';

const PaymentContainer = () => {
  const router = useRouter();
  const { id } = router.query;
  const { setOrderDetail, orderDetail, setRemainder } = useCheckoutContext();

  const { loading } = useQuery(gql(queries.orderDetail), {
    variables: {
      _id: id,
    },
    onCompleted(data) {
      const { orderDetail } = data;
      setOrderDetail(orderDetail);
      setRemainder(orderDetail.totalAmount);
    },
  });

  if (loading || !orderDetail) return <Loading />;

  return (
    <div className="checkout row">
      <PaymentControls />
      <PaymentReport />
    </div>
  );
};

export default PaymentContainer;
