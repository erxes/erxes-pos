import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { IOrder } from 'modules/orders/types';
import { __ } from 'modules/common/utils';
import { ReceiptWrapper } from './styles';

const NumberWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

type Props = {
  order: IOrder;
}

export default class KitchenReceipt extends React.Component<Props> {
  render() {
    const { order } = this.props;

    if (!order) {
      return null;
    }

    const numberParts = order.number.split('_');

    return (
      <ReceiptWrapper>
        <NumberWrapper>
          <p>{numberParts[0]}</p>
          <h3>#{numberParts[1]}</h3>
        </NumberWrapper>
        <p>
          <b>{__("Date")}:</b>
          {order.paidDate ? (
            <span>{dayjs(order.paidDate).format("YYYY.MM.DD HH:mm")}</span>
          ) : null}
        </p>
        <table>
          <thead>
            <tr>
              <th>{__("Inventory")}</th>
              <th>{__("Count")}</th>
            </tr>
          </thead>
          <tbody>{order.items.map(item => (
            <tr key={item._id}>
              <td>{item.productName}</td>
              <td>{item.count}</td>
            </tr>
          ))}</tbody>
        </table>
      </ReceiptWrapper>
    );
  }

  componentDidMount() {
    window.addEventListener('afterprint', () => {
      window.close();
    });

    window.print();
  }

  componentWillUnmount() {
    window.removeEventListener('afterprint', () => {});
  }
}
