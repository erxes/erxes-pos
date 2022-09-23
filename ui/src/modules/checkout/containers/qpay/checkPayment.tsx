import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { mutations, queries } from '../../graphql';
import { toast } from 'react-toastify';
import Button from 'ui/Button';
import { getMode } from 'modules/utils';

const CheckPayment = () => {
  const router = useRouter();
  const mode = getMode();
  const { orderId, qpayId } = router.query;
  const [check, { loading }] = useMutation(gql(mutations.qpayCheckPayment), {
    variables: {
      orderId,
      id: qpayId,
    },
    refetchQueries: [{ query: gql(queries.orderDetail) }, 'orderDetail'],
    onCompleted(data) {
      if (data.qpayCheckPayment.status === 'PAID') {
      }

      toast.success('Checked');
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return (
    <Button onClick={() => check()} loading={loading}>
      {mode === 'kiosk' ? <h5>Шалгах</h5> : 'Шалгах'}
    </Button>
  );
};

export default CheckPayment;
