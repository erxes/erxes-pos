import React from 'react';
import Button from 'ui/Button';
import cn from 'classnames';
import CheckCircle from 'icons/CheckCircle';
import { useRemoveQuery, useAddQuery } from 'lib/useQuery';
import { useApp } from 'modules/AppContext';

function SlotNumber({
  number,
  status,
  _id,
  origin,
  paidDate,
  slotCode,
}: {
  _id?: string;
  number: string;
  status: string;
  origin: string;
  paidDate: string | null;
  slotCode?: string;
}) {
  const { removeQuery } = useRemoveQuery();
  const { query, addQuery } = useAddQuery();
  const { setInitialState } = useApp();

  const colors = {
    new: 'rgba(0, 0, 0, 0.65)',
  };

  const handleClick = () => {
    if (query.orderId !== _id) return addQuery({ orderId: _id });
    setInitialState();
    removeQuery('orderId');
  };

  return (
    <Button
      className={cn('slot-number', status, {
        active: query.orderId === _id,
        '-paid': !!paidDate,
      })}
      onClick={handleClick}
    >
      {number.split('_')[1]}
      {!!slotCode && `(${slotCode})`}
      {origin === 'kiosk' && '*'}
      <CheckCircle color={colors[status as keyof typeof colors]} />
    </Button>
  );
}

export default SlotNumber;
