import { gql, useMutation } from '@apollo/client';
import { mutations } from 'modules/checkout/graphql';
import { queries } from 'modules/checkout/graphql';
import { queries as checkoutQueries } from 'modules/checkout/graphql';
import useOrderCUData from './useOrderCUData';

const useOrderCU = (onCompleted?: any) => {
  const orderData = useOrderCUData();

  const [ordersAdd, { loading }] = useMutation(gql(mutations.ordersAdd), {
    variables: orderData,
    onCompleted(data) {
      return onCompleted && onCompleted(data.ordersAdd._id);
    },
    refetchQueries: [{ query: gql(queries.fullOrders) }, 'FullOrders'],
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

  return { orderCU: ordersAdd, loading };
};

export default useOrderCU;
