import { gql, useMutation } from '@apollo/client';
import { mutations } from 'modules/checkout/graphql';
import { toast } from 'react-toastify';
import { trimGraphqlError, goToReceipt } from 'modules/utils';
import { useApp } from 'modules/AppContext';

const useSettlePayment = (onCompleted: any) => {
  const { billType, orderDetail, registerNumber } = useApp();
  const { _id, putResponses } = orderDetail;

  const putResponse = putResponses[0];

  const updatedOnCompleted = () => {
    goToReceipt(_id);
    onCompleted && onCompleted();
  };

  const [settlePayment, { loading }] = useMutation(
    gql(mutations.ordersSettlePayment),
    {
      variables: {
        billType,
        registerNumber,
        _id,
      },
      onCompleted: updatedOnCompleted,
      onError(error) {
        toast.error(trimGraphqlError(error.message));
      },
    }
  );
  return {
    settlePayment:
      (putResponse || {}).success === 'true'
        ? updatedOnCompleted
        : settlePayment,
    loading,
  };
};

export default useSettlePayment;
