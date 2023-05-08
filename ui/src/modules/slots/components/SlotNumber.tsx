import React from 'react';
import Button from 'ui/Button';
import cn from 'classnames';
import CheckCircle from 'icons/CheckCircle';
import { useRemoveQuery, useAddQuery } from 'lib/useQuery';
import { useApp } from 'modules/AppContext';
import { useRef } from 'react';
import { ORDER_STATUSES } from '../../constants';
import Hourglass from 'icons/Hourglass';

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
  const ref = useRef<HTMLButtonElement>({} as HTMLButtonElement);
  const { removeQuery } = useRemoveQuery();
  const { query, addQuery } = useAddQuery();
  const { setInitialState } = useApp();

  const colors = {
    new: 'rgba(0, 0, 0, 0.65)',
  };

  const handleClick = () => {
    ref.current.blur();
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
      ref={ref}
      onClick={handleClick}
    >
      {(number || '').split('_')[1]}
      {!!slotCode && `(${slotCode})`}
      {origin === 'kiosk' && '*'}
      {status === ORDER_STATUSES.PENDING && (
        <Hourglass className="-hourglass" />
      )}
      <CheckCircle
        color={colors[status as keyof typeof colors]}
        className="check-circle"
      />
    </Button>
  );
}

export default SlotNumber;
