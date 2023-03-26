import { useRouter } from 'next/router';
import { useApp } from 'modules/AppContext';
import { gql, useQuery } from '@apollo/client';
import { queries } from '../graphql';
import Loading from 'ui/Loading';
import NotFound from 'modules/common/Layout/NotFound';

const OrderDetailContainer = ({ handleSuccess, children }: any) => {
  const {
    setOrderDetail,
    orderDetail,
    setBillType,
    setRegisterNumber,
    setType,
  } = useApp();

  const router = useRouter();

  const { loading, data } = useQuery(gql(queries.orderDetail), {
    variables: {
      _id: router.query.orderId,
    },
    skip: !router.query.orderId,
    onCompleted(data) {
      const { orderDetail } = data;
      const { registerNumber, billType, type, customer } = orderDetail || {};
      setOrderDetail(orderDetail ? orderDetail : {});
      billType && setBillType(billType);
      registerNumber ? setRegisterNumber(registerNumber) : customer?.code && setRegisterNumber(customer?.code)
      handleSuccess && handleSuccess(orderDetail);
      type && setType(type);
    },
  });

  if (loading || !orderDetail) return <Loading />;

  if (!data.orderDetail) return <NotFound />;

  return children;
};

export default OrderDetailContainer;
