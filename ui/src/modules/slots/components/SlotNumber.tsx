import React from 'react';
import { useRouter } from 'next/router';
import Button from 'ui/Button';
import cn from 'classnames';
import CheckCircle from 'icons/CheckCircle';
import { removeQuery } from 'modules/utils';

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

  const { orderId } = router.query;

  const colors = {
    new: 'rgba(0, 0, 0, 0.65)',
  };

  return (
    <Button
      className={cn('slot-number', status, {
        active: orderId === _id,
      })}
      onClick={() =>
        orderId === _id
          ? removeQuery(router, 'orderId')
          : router.push({
              pathname: router.pathname,
              query: { ...router.query, orderId: _id },
            })
      }
    >
      {number.split('_')[1]}
      <CheckCircle color={colors[status as keyof typeof colors]} />
    </Button>
  );
}

export default SlotNumber;
