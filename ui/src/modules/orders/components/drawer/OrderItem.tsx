import React from 'react';
import { Link } from "react-router-dom";

import { FlexCenter } from "modules/common/styles/main";
import { OrderBox } from 'modules/orders/styles';
import Icon from "modules/common/components/Icon";
import { formatNumber } from "modules/utils";
import { IOrder } from "../../types";

type Props = {
  order: IOrder;
  options: any;
};

export default function OrderItem({ options, order }: Props) {
  return (
    <OrderBox color={options.colors.primary} key={order._id}>
      <Link to={`/orders/${order._id}`} target='_blank'>
        <FlexCenter><b>#{order.number}</b></FlexCenter>
      </Link>
      <FlexCenter>
        <Icon icon="wallet" size={20} /> <b>{formatNumber(order.totalAmount)}₮</b>
      </FlexCenter>
      <label>{order.status || "Take"}</label>
    </OrderBox>
  );
};
