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
  const { setOrderDetail, orderDetail } = useCheckoutContext();

  const { loading } = useQuery(gql(queries.orderDetail), {
    variables: {
      _id: id,
    },
    onCompleted(data) {
      setOrderDetail(data.orderDetail);
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
