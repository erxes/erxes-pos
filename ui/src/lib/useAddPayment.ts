import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { mutations, queries } from 'modules/checkout/graphql';
import { useCheckoutContext } from 'modules/checkout/context';
import { toast } from 'react-toastify';
const useAddPayment = (onCompleted?: any) => {
  const router = useRouter();
  const { changeActivePayment } = useCheckoutContext();
  const [addPay, { loading }] = useMutation(gql(mutations.ordersAddPayment), {
    variables: {
      _id: router.query.orderId,
    },
    refetchQueries: [
      {
        query: gql(queries.orderDetail),
      },
      'orderDetail',
    ],
    onError(error) {
      toast.error(error.message);
    },
    onCompleted() {
      changeActivePayment('');
      onCompleted && onCompleted();
    },
  });

  const addPayment = useCallback(
    (variables: any) =>
      addPay({
        variables: {
          _id: router.query.orderId,
          ...variables,
        },
      }),
    [addPay, router.query.orderId]
  );

  return { addPayment, loading };
};

export default useAddPayment;
