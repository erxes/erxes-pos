import { IOrderItem } from 'modules/orders/types';
import React from 'react';

type Props = {
  items: IOrderItem[];
}

export default class ReceiptBody extends React.Component<Props> {
  renderItem(item: IOrderItem) {
    const total = item.unitPrice * (item.count || 0);

    return (
      <li key={Math.random()} className="detail-row">
        <span>{item.productName}</span>
        <span>
          {item.unitPrice.toLocaleString()} x{item.count}
        </span>
        <span className="totalCount">
          {' '}
          = <b>{total.toLocaleString()}</b>
        </span>
      </li>
    );
  }

  render() {
    return (
      <div>
        <ol className="order-detail-list">
          <li className="detail-row">
            <span>Бараа</span>
            <span>Үнэ/Тоо</span>
            <span className="sumPrice">Нийт Үнэ</span>
          </li>
          {this.props.items.map(item => this.renderItem(item))}
        </ol>
      </div>
    );
  }
}
