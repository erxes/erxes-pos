import Button from 'modules/common/ui/Button';
import useOrderCUData from 'lib/useOrderCUData';
import { gql, useMutation } from '@apollo/client';
import { mutations } from 'modules/checkout/graphql';
import { toast } from 'react-toastify';

const OrderFinish = () => {
  const { _id } = useOrderCUData();
  const [finishOrder, { loading }] = useMutation(gql(mutations.ordersFinish), {
    onError(error) {
      toast.error(error.message);
    },
  });
  return (
    <Button
      className="pay"
      onClick={() => _id && finishOrder({ variables: { id: _id } })}
    >
      Дуусгах
    </Button>
  );
};

export default OrderFinish;
