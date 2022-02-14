import React from 'react';

import { IOrder } from 'modules/orders/types';
import { __ } from 'modules/common/utils';

type Props = {
  order: IOrder;
}

export default function OrderInfo({ order }: Props) {
  return (
    <React.Fragment>
      <div>{__('Number')}: <b>#{order.number}</b></div>
      <div>{__('Total amount')}: {order.totalAmount}</div>
      <div>{__('Paid card amount')}: {order.cardAmount || 0}</div>
      <div>{__('Paid cash amount')}: {order.cashAmount || 0}</div>
      <div>{__('Paid mobile amount')}: {order.mobileAmount || 0}</div>
    </React.Fragment>
  );
}
