import { gql, useMutation } from '@apollo/client';
import useOrderCUData from 'lib/useOrderCUData';
import { useApp } from 'modules/AppContext';
import { mutations } from 'modules/checkout/graphql';
import Button from 'modules/common/ui/Button';
import { goToReceipt, setLocal } from 'modules/utils';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const OrderFinish = () => {
  const router = useRouter();
  const { setInitialState } = useApp();
  const data = useOrderCUData();
  const [finishOrder, { loading }] = useMutation(gql(mutations.ordersFinish), {
    onCompleted: (data) => {
      setLocal('cart', []);
      setInitialState();
      goToReceipt(data.ordersFinish?._id)
      return router.push(`/`);
    },
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
