import Button from 'modules/common/ui/Button';
import useOrderCUData from 'lib/useOrderCUData';
import { gql, useMutation } from '@apollo/client';
import { mutations } from 'modules/checkout/graphql';
import { toast } from 'react-toastify';

const OrderFinish = ({
  onCompleted,
}: {
  onCompleted: (_id: string) => void;
}) => {
  const data = useOrderCUData();
  const [finishOrder, { loading }] = useMutation(gql(mutations.ordersFinish), {
    onCompleted: (data) => onCompleted(data.ordersFinish._id),
    onError(error) {
      toast.error(error.message);
    },
  });
  return (
    <Button
      className="pay"
      loading={loading}
      onClick={() => finishOrder({ variables: data })}
    >
      Дуусгах
    </Button>
  );
};

export default OrderFinish;
