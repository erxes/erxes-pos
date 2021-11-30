import { IOrderItem } from "modules/orders/types";
import React from "react";

type Props = {
  items: IOrderItem[];
};

export default class ReceiptBody extends React.Component<Props> {
  renderItem(item: IOrderItem) {
    const total = item.unitPrice * (item.count || 0);

    return (
      <tr key={Math.random()} className="detail-row">
        <td>{item.productName}</td>
        <td>
          {item.unitPrice.toLocaleString()} x{item.count}
        </td>
        <td className="totalCount">
          {" "}
          = <b>{total.toLocaleString()}</b>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <table className="block">
        <tr className="detail-row">
          <th>Бараа</th>
          <th>Үнэ/Тоо</th>
          <th className="totalCount">Нийт Үнэ</th>
        </tr>
        {this.props.items.map((item) => this.renderItem(item))}
      </table>
    );
  }
}
