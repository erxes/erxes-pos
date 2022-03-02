import React from 'react';

import { IOrder } from 'modules/orders/types';
import { __ } from 'modules/common/utils';
import { Amount } from 'modules/orders/styles';

type Props = {
  order: IOrder;
  remainderAmount: number;
  companyName: string;
  registerNumber: string;
};

export default function OrderInfo({
  order,
  remainderAmount,
  companyName,
  registerNumber
}: Props) {
  return (
    <Amount>
      <div className="amount-wrapper">
        <b>
          {__('Paid card amount')}: {order ? order.cardAmount : 0}
        </b>
        <b>
          {__('Paid cash amount')}: {order ? order.cashAmount : 0}
        </b>
        <b>
          {__('Paid mobile amount')}: {order ? order.mobileAmount : 0}
        </b>
        <b>
          {__('Remainder amount')}: {remainderAmount}
        </b>
      </div>
      {registerNumber && (
        <div>
          {__('Register number')}: {registerNumber}
        </div>
      )}
      {companyName && (
        <div>
          {__('Entity name')}: {companyName}
        </div>
      )}
    </Amount>
  );
}
