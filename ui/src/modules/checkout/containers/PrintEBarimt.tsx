import { useApp } from 'modules/AppContext';
import { useUI } from 'ui/context';
import { gql, useMutation } from '@apollo/client';
import { mutations } from '../graphql';
import Button from 'ui/Button';
import { toast } from 'react-toastify';
import { trimGraphqlError } from 'modules/utils';

const PrintEBarimt = () => {
  const { closeModal } = useUI();
  const { billType, orderDetail, registerNumber } = useApp();
  const { _id } = orderDetail;

  const showReciept = () => {
    window.open(`/order-receipt/${_id}`, '_blank');
    closeModal();
  };

  const onCompleted = ({ success, message, getInformation }: any) => {
    if (success === 'true') {
      toast.success('Амжилттай');
      return showReciept();
    }
    if (message) return toast.info(message);
    if (getInformation) return toast.info(getInformation);
  };

  const [settlePayment, { loading }] = useMutation(
    gql(mutations.ordersSettlePayment),
    {
      variables: {
        billType,
        registerNumber,
        _id,
      },
      onCompleted(data) {
        const { ordersSettlePayment } = data;
        if (ordersSettlePayment) {
          onCompleted(ordersSettlePayment);
        }
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
