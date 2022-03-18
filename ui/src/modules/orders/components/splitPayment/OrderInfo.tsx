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
  registerNumber
}: Props) {
  return (
    <Amount>
      <div className="amount-wrapper">
        <ul className="a">
          <li>
            {__('Payment info')}: №:{' '}
            {order && order.number ? order.number.split('_')[1] : ''}
          </li>
          {order.cardAmount && (
            <li>
              {__('Paid card amount')}:{' '}
              <b>12000$ {order ? order.cardAmount : 0}₮</b>
            </li>
          )}
          {order.cashAmount && (
            <li>
              {__('Paid cash amount')}: 14000₮ {order ? order.cashAmount : 0}₮
            </li>
          )}
          {order.mobileAmount && (
            <li>
              {__('Paid mobile amount')}: 23332$
              {order ? order.mobileAmount : 0}₮
            </li>
          )}

          {registerNumber && (
            <li>
              {__('Register number')}: 34245656{registerNumber}
            </li>
          )}
          <li>
            {__('Remainder amount')}: {remainderAmount}₮
          </li>
          {/* <li>
            {__('Total amount')}: 34245656{' '}
            {formatNumber(order.totalAmount || 0)}₮
          </li> */}
        </ul>
      </div>
    </Amount>
  );
}
