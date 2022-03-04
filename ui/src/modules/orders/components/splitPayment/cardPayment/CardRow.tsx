import React from 'react';

import { ICardPayment } from 'modules/orders/types';

type Props = {
  item: ICardPayment;
};

export default function CardRow({ item }: Props) {
  return (
    <tr key={item._id}>
      <td>{item.amount}</td>
      <td>{item.cardInfo}</td>
    </tr>
  );
}
