import React from 'react';
import { IOrder } from '../types';

type Props = {
  orders: IOrder[];
}

export default class OrderList extends React.Component<Props> {
  render() {
    const { orders } = this.props;

    return (
      <table>
        <thead>
          <tr><th>number</th></tr>
        </thead>
        <tbody>
          {orders.map(order => <tr key={order._id}><td>{order.number}</td></tr>)}
        </tbody>
      </table>
    );
  }
};
