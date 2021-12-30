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
import { FlexCenter } from "modules/common/styles/main";

type Props = {
  currentUser: IUser;
  currentConfig: IConfig;
  orders: IOrder[];
};

export default class Screen extends React.Component<Props> {
  renderOrders(order: any, type: string) {
    const color = this.props.currentConfig.uiOptions.colors.primary;

    return <OrderCard color={color}>{order}</OrderCard>;
  }

  renderCol(type, icon) {
    // const { orders } = this.props;
    const orders = [100, 200, 30, 24, 1, 3, 7, 19, 3000];

    return (
      <>
        <Col md={6} className="fullHeight">
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
        <Col md={6} className="fullHeight">
          <FlexCenter className="fullHeight">
            <iframe
              width="100%"
              height="500"
              src="https://www.youtube.com/embed/ZQWCKGHYMy0?autoplay=1&controls=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </FlexCenter>
        </Col>
      </>
    );
  }

  render() {
    return (
      <ScreenContent hasBackground={true}>
        <Row className="fullHeight">{this.renderCol("Ready", "checked")}</Row>
      </ScreenContent>
    );
  } // end render()
}
