import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { mutations, queries } from 'modules/checkout/graphql';
import { toast } from 'react-toastify';

const useCancelQpay = (onCompleted: any) => {
  const router = useRouter();
  const { qpayId } = router.query;

  const [cancel, { loading }] = useMutation(gql(mutations.qpayCancelInvoice), {
    variables: {
      id: qpayId,
    },
    refetchQueries: [{ query: gql(queries.orderDetail) }, 'orderDetail'],
    onCompleted() {
      onCompleted && onCompleted();
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { cancel, loading };
};

export default useCancelQpay;
