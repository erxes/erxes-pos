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
        <ul className="a">
          <li>
            {__('Payment info')}: №:{' '}
            {order && order.number ? order.number.split('_')[1] : ''}
          </li>
          {companyName && <li>{__('Entity name')}: <b>{companyName}</b></li>}
          {registerNumber && <li>{__('Register number')}: <b>{registerNumber}</b></li>}
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
                      <b>{q.amount}₮</b>
                    </li>
                  )
                })
              }
              {
                ((order.qpayInvoices || []).filter(q => q.status !== 'done') || []).map(q => {
                  return (
                    <li>
                      {__('Unpaid mobile amount')}:
                      <b>{q.amount}₮</b>
                    </li>
                  )
                })
              }
            </>

          )}

          {order.cashAmount ? (
            <li>
              {__('Paid cash amount')}: <b>{order.cashAmount}₮</b>
            </li>
          ) : ''}

          {remainderAmount > 0 && (
            <li>
              {__('Remainder amount')}: <b>{remainderAmount}₮</b>
            </li>
          )}

          <li>
            {__('Total amount')}:
            <b>{order.totalAmount || 0}₮</b>
          </li>
        </ul>
      </div>
    </Amount>
  );
}
