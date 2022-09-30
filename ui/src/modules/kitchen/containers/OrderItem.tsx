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
  allDone,
}: any) => {
  const { DONE, CONFIRM, PAID, DOING } = ORDER_ITEM_STATUSES;
  const [changeStatus, { loading }] = useMutation(
    gql(mutations.orderItemChangeStatus),
    {
      onError(error) {
        toast.error(error.message);
      },
    }
  );

  useEffect(() => {
    if (allDone) {
      changeStatus({
        variables: {
          _id,
          status: DONE,
        },
      });
    }
  }, [allDone]);

  const isDone = status === DONE;

  const mode = loading ? 'loading' : isDone && 'checked';

  const handleClick = () => {
    return changeStatus({
      variables: { _id, status: status === CONFIRM ? DONE : CONFIRM },
      refetchQueries: [
        {
          query: gql(queries.fullOrders),
          fetchPolicy: 'network-only',
          variables: { CONFIRM, PAID, DOING },
        },
        'fullOrders',
      ],
    });
  };

  return (
    <div
      className={cn('flex-h-between -item', { checked: isDone })}
      onClick={handleClick}
    >
      <b className="col flex-v-center -name">
        <Radio mode={loading ? 'loading' : mode} />
        {isTake ? <Motocycle /> : <ForkKnife />}
        <span className="-name">{productName}</span>
      </b>
      <big className="col">x{count}</big>
      <Ink />
    </div>
  );
};

export default OrderItem;
