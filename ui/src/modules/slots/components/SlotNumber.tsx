import React from 'react';
import { useRouter } from 'next/router';
import Button from 'ui/Button';
import cn from 'classnames';
import CheckCircle from 'icons/CheckCircle';
import { removeSelectedOrder } from 'modules/utils';

function SlotNumber({
  number,
  status,
  _id,
}: {
  _id?: string;
  number: string;
  status: string;
}) {
  const router = useRouter();

  const { selectedOrder } = router.query;

  const colors = {
    new: 'rgba(0, 0, 0, 0.65)',
  };

  return (
    <Button
      className={cn('slot-number', status, {
        active: selectedOrder === _id,
      })}
      onClick={() =>
        selectedOrder === _id
          ? removeSelectedOrder(router)
          : router.push({
              pathname: router.pathname,
              query: { ...router.query, selectedOrder: _id },
            })
      }
    >
      {number.split('_')[1]}
      <CheckCircle color={colors[status as keyof typeof colors]} />
    </Button>
  );
}

export default SlotNumber;
