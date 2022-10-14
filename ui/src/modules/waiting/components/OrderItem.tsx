import { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { mutations, queries } from 'modules/checkout/graphql';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import Timer from './Timer';
import { ORDER_STATUSES } from '../../constants';
import cn from 'classnames';
import dayjs from 'dayjs';

const OrderItem = ({ _id, number, modifiedAt, status }: any) => {
  const { currentConfig } = useConfigsContext();
  const { waitingScreen } = currentConfig || {};
  const waitingSec = parseInt((waitingScreen || {}).value || 3) * 60;
  const [expireDate, setExpireDate] = useState<any>();

  const [orderChangeStatus] = useMutation(gql(mutations.orderChangeStatus), {
    variables: {
      _id,
      status: ORDER_STATUSES.COMPLETE,
    },
    refetchQueries: [{ query: gql(queries.fullOrders) }, 'fullOrders'],
  });
  const isDone = status === ORDER_STATUSES.DONE;

  useEffect(() => {
    if (isDone) {
      let modified: any = dayjs(modifiedAt);
      let expDate: any = modified.add(waitingSec, 'second');
      setExpireDate(expDate);
    }
  }, []);

  return (
    <div className={cn('-item', { '-italic': !isDone })}>
      <h1>{(number || '_0').split('_')[1]}</h1>
      {isDone && expireDate && (
        <Timer
          modifiedAt={modifiedAt}
          editOrder={orderChangeStatus}
          status={status}
          expiryTimestamp={expireDate}
        />
      )}
    </div>
  );
};

export default OrderItem;
