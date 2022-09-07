import React from 'react';
import { useRouter } from 'next/router';
import Button from 'ui/Button';
import cn from 'classnames';
import CheckCircle from 'icons/CheckCircle';

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

  const colors = {
    new: 'rgba(0, 0, 0, 0.65)',
  };

  return (
    <Button
      className={cn('slot-number', status, {
        active: router.query.selectedOrder === _id,
      })}
      onClick={() =>
        router.push({
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
