import { useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { mutations, queries } from 'modules/checkout/graphql';
import ForkKnife from 'icons/ForkKnife';
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
  doneItems,
  setDoneItems,
}: any) => {
  const { DONE, CONFIRM, NEW } = ORDER_ITEM_STATUSES;
  const [changeStatus, { loading }] = useMutation(
    gql(mutations.orderItemChangeStatus),
    {
      onError(error) {
        toast.error(error.message);
      },
    }
  );

  useEffect(() => {
    if (
      doneItems.length &&
      (doneItems || []).indexOf(_id) > -1 &&
      status !== DONE
    ) {
      changeStatus({
        variables: {
          _id,
          status: DONE,
        },
      });
    }
  }, [doneItems]);

  const isDone = status === DONE;

  const mode = loading ? 'loading' : isDone && 'checked';

  const handleClick = () => {
    return changeStatus({
      variables: { _id, status: status === DONE ? CONFIRM : DONE },
      refetchQueries: [
        {
          query: gql(queries.fullOrders),
        },
        'fullOrders',
      ],
      onCompleted() {
        setDoneItems((prev: any) => [...prev, _id]);
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
        {isTake ? <Motocycle /> : <ForkKnife />}
        <span className="-name">{productName}</span>
      </b>
      <big className="col">x{count}</big>
      <Ink />
    </div>
  );
};

export default OrderItem;
