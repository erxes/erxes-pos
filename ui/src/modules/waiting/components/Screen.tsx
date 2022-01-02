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
  posCurrentUser: IUser;
  currentConfig: IConfig;
  orders: IOrder[];
};

export default class Screen extends React.Component<Props> {
  renderOrders(order: any) {
    const color = this.props.currentConfig.uiOptions.colors.primary;

    return <OrderCard color={color}>{order.number.split("_")[1]}</OrderCard>;
  }

  renderCol(type, icon) {
    const { orders } = this.props;

    return (
      <>
        <Col md={12} className="fullHeight">
          <Label isReady={type === "Ready"}>
            <Icon icon={icon} size={28} />
            <span>{__(type)}</span>
          </Label>
          <Orders>
            {orders.map((order, index) => (
              <React.Fragment key={index}>
                {this.renderOrders(order)}
              </React.Fragment>
            ))}
          </Orders>
        </Col>
      </>
    );
  }

  renderContent() {
    const contentUrl = this.props.currentConfig.waitingScreen.contentUrl || '';

    if (!contentUrl) {
      return ''
    }

    return (
      <div className="fullHeight">
        <iframe
          width="100%"
          height="80%"
          src={`${contentUrl}?autoplay=1&controls=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        ></iframe>
      </div>
    )
  }
  render() {
    return (
      <ScreenContent hasBackground={true} className="fullHeight">
        <Row>{this.renderCol("Ready", "checked")}</Row>
        <Row className="fullHeight">{this.renderContent()}</Row>
      </ScreenContent>
    );
  } // end render()
}
