import { useState } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { mutations, queries } from '../../graphql';
import { toast } from 'react-toastify';
import Button from 'ui/Button';
import { getMode } from 'modules/utils';
import useInterval from 'use-interval';

const CheckPayment = () => {
  const router = useRouter();
  const mode = getMode();
  const [cancelInterval, setCancelInterval] = useState(false);

  const { orderId, qpayId } = router.query;
  const [check, { loading }] = useMutation(gql(mutations.qpayCheckPayment), {
    variables: {
      orderId,
      id: qpayId,
    },
    refetchQueries: [{ query: gql(queries.orderDetail) }, 'orderDetail'],
    onCompleted(data) {
      const invoice = data.qpayCheckPayment;

      if (
        invoice &&
        invoice.qpayPaymentId &&
        invoice.paymentDate &&
        invoice.status === 'PAID'
      ) {
        setCancelInterval(false);
      }
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  useInterval(check, cancelInterval ? null : 3000);

  return (
    <Button onClick={() => check()} loading={loading}>
      {mode === 'kiosk' ? <h5>Шалгах</h5> : 'Шалгах'}
    </Button>
  );
};

export default CheckPayment;
