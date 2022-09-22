import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { mutations, queries } from '../../graphql';
import { useUI } from 'ui/context';
import { toast } from 'react-toastify';

import Button from 'ui/Button';

const CancelPayment = () => {
  const router = useRouter();
  const { qpayId, ...rest } = router.query;
  const { closeModal } = useUI();

  const [cancel, { loading }] = useMutation(gql(mutations.qpayCancelInvoice), {
    variables: {
      id: qpayId,
    },
    refetchQueries: [{ query: gql(queries.orderDetail) }, 'orderDetail'],
    onCompleted() {
      closeModal();
      toast.success('Aмжилттай цуцаллаа');
      router.push({ pathname: router.pathname, query: rest }, undefined, {
        shallow: true,
      });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return (
    <Button variant="slim" onClick={() => cancel()} loading={loading}>
      Цуцлах
    </Button>
  );
};

export default CancelPayment;
