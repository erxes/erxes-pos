import { useRouter } from 'next/router';
import { useApp } from 'modules/AppContext';
import { gql, useQuery } from '@apollo/client';
import { queries } from '../graphql';
import Loading from 'ui/Loading';

const OrderDetailContainer = ({ handleSuccess, children }: any) => {
  const { setOrderDetail, orderDetail } = useApp();
  const router = useRouter();

  const { loading, data } = useQuery(gql(queries.orderDetail), {
    variables: {
      _id: router.query.orderId,
    },
    onCompleted(data) {
      const { orderDetail } = data;
      setOrderDetail(orderDetail ? orderDetail : {});
      handleSuccess && handleSuccess(orderDetail);
    },
  });

  if (loading || !orderDetail) return <Loading />;

  if (!data.orderDetail) return <h1>404</h1>;

  return children;
};

export default OrderDetailContainer;
