import { gql, useMutation } from '@apollo/client';
import { mutations, queries } from 'modules/checkout/graphql';
import useOrderCUData from './useOrderCUData';
import { toast } from 'react-toastify';
import { ORDER_STATUSES } from 'modules/constants';

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
      const { _id } = (data || {}).ordersAdd || {};
      orderChangeStatus({
        variables: {
          _id,
          status: ORDER_STATUSES.NEW,
        },
        onCompleted() {
          onCompleted && onCompleted(_id);
        },
      });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const [ordersEdit, { loading: loadingEdit }] = useMutation(
    gql(mutations.ordersEdit),
    {
      variables: orderData,
      onCompleted(data) {
        const { _id } = (data || {}).ordersEdit || {};
        return onCompleted && onCompleted(_id);
      },
      refetchQueries: [{ query: gql(queries.orderDetail) }, 'orderDetail'],
      onError(error) {
        toast.error(error.message);
      },
    }
  );

  if (orderData._id) {
    return { orderCU: ordersEdit, loading: loadingEdit };
  }

  return { orderCU: ordersAdd, loading: loading || loadingChangeStatus };
};

export default useOrderCU;
