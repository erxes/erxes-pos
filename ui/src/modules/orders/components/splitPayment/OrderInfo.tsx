import React from 'react';

import { IOrder } from 'modules/orders/types';
import { __ } from 'modules/common/utils';
import { Amount } from 'modules/orders/styles';

type Props = {
  order: IOrder;
  remainderAmount: number;
  cashAmount: number;
};

export default function OrderInfo({
  order,
  remainderAmount,
  cashAmount
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
            <>
              {
                (order.cardPayments || []).map(c => {
                  return (<li>
                    {__('Paid card amount')}:{' '}
                    <b>{c.amount || 0}₮</b> ({c.cardInfo.pan})
                  </li>)
                })
              }
            </>

          )}
          {order.mobileAmount && (
            <>
              {
                ((order.qpayInvoices || []).filter(q => q.status === 'done') || []).map(q => {
                  return (
                    <li>
                      {__('Paid mobile amount')}:
                      {q.amount}₮
                    </li>
                  )
                })
              }
              {
                ((order.qpayInvoices || []).filter(q => q.status !== 'done') || []).map(q => {
                  return (
                    <li>
                      {__('Paid mobile amount')}:
                      {q.amount}₮
                    </li>
                  )
                })
              }
            </>

          )}

          {cashAmount ? (
            <li>
              {__('Paid cash amount')}: {cashAmount}₮
            </li>
          ) : ''}

          {remainderAmount > 0 && (
            <li>
              {__('Remainder amount')}: {remainderAmount}₮
            </li>
          )}

          <li>
            {__('Total amount')}:
            {order.totalAmount || 0}₮
          </li>
        </ul>
      </div>
    </Amount>
  );
}
