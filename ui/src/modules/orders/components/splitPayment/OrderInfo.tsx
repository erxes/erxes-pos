import React from 'react';

import { IOrder } from 'modules/orders/types';

type Props = {
  order: IOrder;
}

export default function OrderInfo({ order }: Props) {
  return (
    <React.Fragment>
      <div>#{order.number}</div>
      <div>Paid card amount: {order.cardAmount || 0}</div>
      <div>Paid cash amount: {order.cashAmount || 0}</div>
      <div>Paid mobile amount: {order.mobileAmount || 0}</div>
    </React.Fragment>
  );
}
