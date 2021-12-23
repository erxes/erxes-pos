import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { IUser } from "modules/auth/types";
import { PosWrapper, MainContent } from "../../orders/styles";
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
    if (type === "Doing" && order.status !== "done") {
      return <OrderCard>{order.number.split("_")[1]}</OrderCard>;
    }

    if (type === "Ready" && order.status === "done") {
      return <OrderCard>{order.number.split("_")[1]}</OrderCard>;
    }

    return null;
  }

  renderCol(type, icon) {
    const { orders } = this.props;

    return (
      <Col md={6}>
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
      <MainContent hasBackground={true}>
        <PosWrapper>
          <Row>
            {this.renderCol("Doing", "hourglass")}
            {this.renderCol("Ready", "checked")}
          </Row>
        </PosWrapper>
      </MainContent>
    );
  } // end render()
}
