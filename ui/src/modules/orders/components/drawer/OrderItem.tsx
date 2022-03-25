import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { AppContext } from "appContext";
import { FlexCenter, FlexBetween } from "modules/common/styles/main";
import colors from "modules/common/styles/colors";
import Tip from "modules/common/components/Tip";
import { OrderBox, OrderBoxItem } from "modules/orders/styles";
import Icon from "modules/common/components/Icon";
import { formatNumber } from "modules/utils";
import { IOrder } from "../../types";
import { __ } from "modules/common/utils";

type Props = {
  order: IOrder;
  orientation: string;
};

export default function OrderItem({ order, orientation }: Props) {
  const { currentConfig } = React.useContext(AppContext);
  const options = currentConfig && currentConfig.uiOptions;

  if (!order) {
    return null;
  }

  const number = order.number.split("_");
  const firstLetter = order.type.charAt(0).toUpperCase();
  const type = `${firstLetter}${order.type.substring(1, order.type.length)}`;

  const onClick = () => (window.location.href = `/pos?id=${order._id}`);

  const color = order.paidDate ? colors.colorCoreGreen : options.colors.primary;

  return (
    <OrderBoxItem>
      <OrderBox
        isPortrait={orientation === "portrait"}
        color={color}
        key={order._id}
        onClick={onClick}
      >
        <Link to={`/pos?id=${order._id}`}>
          <FlexBetween>
            <span>{dayjs(order.createdAt).format("YY/MM/DD")}</span>
            <Tip text={`${__("Number")}: ${number[1]}`}>
              <span>
                <b>#{number[1]}</b>
              </span>
            </Tip>
          </FlexBetween>
        </Link>
        <FlexCenter>
          <span>
            <Icon icon="wallet" size={12} />
            <b>{formatNumber(order.totalAmount)}₮</b>
          </span>
          <label>{__(type) || "Take"}</label>
        </FlexCenter>
      </OrderBox>
    </OrderBoxItem>
  );
}
