import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "appContext";
import { FlexCenter } from "modules/common/styles/main";
import { OrderBox } from "modules/orders/styles";
import Icon from "modules/common/components/Icon";
import { formatNumber } from "modules/utils";
import { IOrder } from "../../types";
import { __ } from 'modules/common/utils';

type Props = {
  order: IOrder;
};

export default function OrderItem({ order }: Props) {
  const { currentConfig } = React.useContext(AppContext);
  const options = currentConfig && currentConfig.uiOptions;

  if (!order) {
    return null;
  }

  const number = order.number.split("_");
  const firstLetter = order.type.charAt(0).toUpperCase();
  const type = `${firstLetter}${order.type.substr(1, order.type.length)}`

  return (
    <OrderBox color={options.colors.primary} key={order._id}>
      <Link to={`/order-receipt/${order._id}`} target="_blank">
        <FlexCenter>
          <span>{__("Number")}:</span> <b>{number[1]}</b>
        </FlexCenter>
      </Link>
      <FlexCenter>
        <Icon icon="wallet" size={22} />
        <b>{formatNumber(order.totalAmount)}₮</b>
      </FlexCenter>
      <label>{__(type) || "Take"}</label>
    </OrderBox>
  );
}
