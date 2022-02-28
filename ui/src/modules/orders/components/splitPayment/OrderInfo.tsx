import React from 'react';

import { IOrder } from 'modules/orders/types';
import { __ } from 'modules/common/utils';

type Props = {
  order: IOrder;
  remainderAmount: number;
  companyName: string;
  registerNumber: string;
}

export default function OrderInfo({ order, remainderAmount, companyName, registerNumber }: Props) {
  return (
    <div>
      <div>{__('Number')}: <b>#{order.number}</b></div>
      <div>{__('Total amount')}: {order.totalAmount}</div>
      <div>{__('Paid card amount')}: {order.cardAmount || 0}</div>
      <div>{__('Paid cash amount')}: {order.cashAmount || 0}</div>
      <div>{__('Paid mobile amount')}: {order.mobileAmount || 0}</div>
      <div><b>{__('Remainder amount')}: {remainderAmount}</b></div>
      {registerNumber && <div>{__('Register number')}: {registerNumber}</div>}
      {companyName && <div>{__('Entity name')}: {companyName}</div>}
    </div>
  );
}
