import { gql, useMutation } from '@apollo/client';
import { mutations, queries } from 'modules/checkout/graphql';
import Timer from './Timer';
import { ORDER_STATUSES } from '../../constants';

const OrderItem = ({ _id, number, modifiedAt, status }: any) => {
  const [orderChangeStatus] = useMutation(gql(mutations.orderChangeStatus), {
    variables: {
      _id,
      status: ORDER_STATUSES.COMPLETE,
    },
    refetchQueries: [{ query: gql(queries.fullOrders) }, 'fullOrders'],
  });

  return (
    <div className="-item">
      <h1>{(number || '_0').split('_')[1]}</h1>
      {status === ORDER_STATUSES.DONE && (
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
