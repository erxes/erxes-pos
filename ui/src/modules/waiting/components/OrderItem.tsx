import { gql, useMutation } from '@apollo/client';
import { mutations, queries } from 'modules/checkout/graphql';
import Timer from './Timer';
import { ORDER_STATUSES } from '../../constants';
import cn from 'classnames';

const OrderItem = ({ _id, number, modifiedAt, status }: any) => {
  const [orderChangeStatus] = useMutation(gql(mutations.orderChangeStatus), {
    variables: {
      _id,
      status: ORDER_STATUSES.COMPLETE,
    },
    refetchQueries: [{ query: gql(queries.fullOrders) }, 'fullOrders'],
  });
  const isDone = status === ORDER_STATUSES.DONE;

  return (
    <div className={cn('-item', { '-italic': !isDone })}>
      <h1>{(number || '_0').split('_')[1]}</h1>
      {isDone && (
        <Timer
          modifiedAt={modifiedAt}
          editOrder={orderChangeStatus}
          status={status}
        />
      )}
    </div>
  );
};

export default OrderItem;
