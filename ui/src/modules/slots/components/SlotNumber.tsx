import React from 'react';
import Button from 'ui/Button';
import cn from 'classnames';
import CheckCircle from 'icons/CheckCircle';
import { useRemoveQuery, useAddQuery } from 'lib/useQuery';

function SlotNumber({
  number,
  status,
  _id,
}: {
  _id?: string;
  number: string;
  status: string;
}) {
  const { removeQuery } = useRemoveQuery();
  const { query, addQuery } = useAddQuery();

  const colors = {
    new: 'rgba(0, 0, 0, 0.65)',
  };

  return (
    <Button
      className={cn('slot-number', status, {
        active: query.orderId === _id,
      })}
      onClick={() =>
        query.orderId === _id
          ? removeQuery('orderId')
          : addQuery({ orderId: _id })
      }
    >
      {number.split('_')[1]}
      <CheckCircle color={colors[status as keyof typeof colors]} />
    </Button>
  );
}

export default SlotNumber;
