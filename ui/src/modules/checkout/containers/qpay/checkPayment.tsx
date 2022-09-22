import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { mutations, queries } from '../../graphql';
import { toast } from 'react-toastify';
import Button from 'ui/Button';

const CheckPayment = () => {
  const router = useRouter();
  const { orderId, qpayId } = router.query;
  const [check, { loading }] = useMutation(gql(mutations.qpayCheckPayment), {
    variables: {
      orderId,
      id: qpayId,
    },
    refetchQueries: [{ query: gql(queries.orderDetail) }, 'orderDetail'],
    onCompleted(data) {
      toast('Checked');
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return (
    <Button onClick={() => check()} loading={loading}>
      Шалгах
    </Button>
  );
};

export default CheckPayment;
