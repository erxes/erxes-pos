import { gql, useMutation } from '@apollo/client';
import { mutations, queries } from 'modules/checkout/graphql';
import useOrderCUData from './useOrderCUData';
import { toast } from 'react-toastify';

const useOrderCU = (onCompleted?: any) => {
  const orderData = useOrderCUData();

  const [ordersAdd, { loading }] = useMutation(gql(mutations.ordersAdd), {
    variables: orderData,
    onCompleted(data) {
      const { _id } = (data || {}).ordersAdd || {};
      onCompleted && onCompleted(_id);
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

  return { orderCU: ordersAdd, loading };
};

export default useOrderCU;
