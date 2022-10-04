import { useApp } from 'modules/AppContext';
import { useUI } from 'ui/context';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { mutations } from '../graphql';
import Button from 'ui/Button';
import { toast } from 'react-toastify';
import { trimGraphqlError } from 'modules/utils';

const PrintEBarimt = () => {
  const { closeModal } = useUI();
  const { billType, orderDetail, registerNumber } = useApp();
  const { _id } = orderDetail;
  const router = useRouter();

  const showReciept = () => {
    window.open(`/order-receipt/${_id}`, '_blank');
    closeModal();
    router.push('/');
  };

  const onCompleted = () => {
    return showReciept();
  };

  const [settlePayment, { loading }] = useMutation(
    gql(mutations.ordersSettlePayment),
    {
      variables: {
        billType,
        registerNumber,
        _id,
      },
      onCompleted() {
        onCompleted();
      },
      onError(error) {
        toast.error(trimGraphqlError(error.message));
      },
    }
  );

  return (
    <Button loading={loading} className="print" onClick={() => settlePayment()}>
      Хэвлэх
    </Button>
  );
};

export default PrintEBarimt;
