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
        <p>Төлбөрийн мэдээлэл</p>
        <ul className="a">
          <li>
            {__('Paid card amount')}: 12000$ {order ? order.cardAmount : 0}
          </li>
          <li>
            {__('Paid cash amount')}: 14000$ {order ? order.cashAmount : 0}
          </li>
          <li>
            {__('Paid mobile amount')}: 23332$ {order ? order.mobileAmount : 0}
          </li>
          <li>
            {__('Remainder amount')}: {remainderAmount}
          </li>
          {/* {registerNumber && ( */}
          <li>
            {__('Register number')}: 34245656{registerNumber}
          </li>
          {/* )}
          {companyName && ( */}
          <li>
            {__('Entity name')}: Erxes Mongolia{companyName}
          </li>
          {/* )} */}
        </ul>
      </div>
    </Amount>
  );
}
