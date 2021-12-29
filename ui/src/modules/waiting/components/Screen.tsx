import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { IUser } from "modules/auth/types";
import { ScreenContent } from "../../orders/styles";
import { IConfig } from "types";
import { __ } from "modules/common/utils";
import { IOrder } from "../../orders/types";
import Icon from "modules/common/components/Icon";
import { Label, OrderCard, Orders } from "../styles";

type Props = {
  currentUser: IUser;
  currentConfig: IConfig;
  orders: IOrder[];
};

export default class Screen extends React.Component<Props> {
  renderOrders(order: IOrder, type: string) {
    return <OrderCard>{order.number.split("_")[1]}</OrderCard>;
  }

  renderCol(type, icon) {
    const { orders } = this.props;

    return (
      <Col sm={10}>
        <Label isReady={type === "Ready"}>
          <Icon icon={icon} size={28} />
          <span>{__(type)}</span>
        </Label>
        <Orders>
          {orders.map((order, index) => (
            <React.Fragment key={index}>
              {this.renderOrders(order, type)}
            </React.Fragment>
          ))}
        </Orders>
      </Col>
    );
  }

  render() {
    return (
      <ScreenContent hasBackground={true}>
          < Row >
            {this.renderCol("Ready", "checked")}
          </Row >
      </ScreenContent>
    );
  } // end render()
}
