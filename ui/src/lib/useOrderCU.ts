import { gql, useMutation } from '@apollo/client';
import { mutations, queries } from 'modules/checkout/graphql';
import { queries as checkoutQueries } from 'modules/checkout/graphql';
import useOrderCUData from './useOrderCUData';
import { ORDER_STATUSES } from '../modules/constants';

const useOrderCU = (onCompleted?: any) => {
  const orderData = useOrderCUData();

  const [orderChangeStatus, { loading: loadingChangeStatus }] = useMutation(
    gql(mutations.orderChangeStatus),
    {
      refetchQueries: [{ query: gql(queries.fullOrders) }, 'fullOrders'],
    }
  );

  const [ordersAdd, { loading }] = useMutation(gql(mutations.ordersAdd), {
    variables: orderData,
    onCompleted(data) {
      return orderChangeStatus({
        variables: { _id: data.ordersAdd._id, status: ORDER_STATUSES.CONFIRM },
        onCompleted(data) {
          return onCompleted && onCompleted(data.orderChangeStatus._id);
        },
      });
    },
  });

  const [ordersEdit, { loading: loadingEdit }] = useMutation(
    gql(mutations.ordersEdit),
    {
      variables: orderData,
      onCompleted(data) {
        return onCompleted && onCompleted(orderData._id);
      },
      refetchQueries: [
        { query: gql(checkoutQueries.orderDetail) },
        'orderDetail',
      ],
    }
  );

  if (orderData._id) {
    return { orderCU: ordersEdit, loading: loadingEdit };
  }

  return { orderCU: ordersAdd, loading: loading || loadingChangeStatus };
};

export default useOrderCU;
