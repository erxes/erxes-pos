import { gql, useMutation } from '@apollo/client';
import { mutations, queries } from 'modules/checkout/graphql';
import useOrderCUData from './useOrderCUData';
import { toast } from 'react-toastify';
import useAmounts from './useAmounts';

const useOrderCU = (onCompleted?: any) => {
  const orderData = useOrderCUData();
  const { paidAmount } = useAmounts();

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
    const checkRemainder =
      orderData.totalAmount >= (paidAmount || 0)
        ? ordersEdit
        : () => toast.error('Нийт дүн төлөгдсөн дүнгээс бага байна.');

    return { orderCU: checkRemainder, loading: loadingEdit };
  }

  return { orderCU: ordersAdd, loading };
};

export default useOrderCU;
