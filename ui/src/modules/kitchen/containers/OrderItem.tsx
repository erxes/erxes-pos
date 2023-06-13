import { gql, useMutation } from '@apollo/client';
import { mutations } from 'modules/checkout/graphql';
import Motocycle from 'icons/Motocycle';
import Radio from 'ui/Radio';
import Ink from 'react-ink';
import { ORDER_ITEM_STATUSES } from 'modules/constants';
import cn from 'classnames';
import { toast } from 'react-toastify';

const OrderItem = ({
  count,
  isTake,
  productName,
  _id,
  status,
  setDoneItems,
}: any) => {
  const { DONE, CONFIRM } = ORDER_ITEM_STATUSES;
  const [changeStatus, { loading }] = useMutation(
    gql(mutations.orderItemChangeStatus),
    {
      onError(error) {
        toast.error(error.message);
      },
    }
  );

  const isDone = status === DONE;

  const mode = loading ? 'loading' : isDone && 'checked';

  const handleClick = () => {
    return changeStatus({
      variables: { _id, status: status === DONE ? CONFIRM : DONE },
      onCompleted() {
        if (status !== DONE) return setDoneItems((prev: any) => [...prev, _id]);
        return setDoneItems((prev: any[]) => prev.slice(prev.indexOf(_id), 1));
      },
    });
  };

  return (
    <div
      className={cn('flex-h-between -item', { checked: isDone })}
      onClick={handleClick}
    >
      <b className="col flex-v-center -name">
        <Radio mode={mode} />
        {isTake && <Motocycle />}
        <span className="-name">{productName}</span>
      </b>
      <big className="col">x{count}</big>
      <Ink />
    </div>
  );
};

export default OrderItem;
