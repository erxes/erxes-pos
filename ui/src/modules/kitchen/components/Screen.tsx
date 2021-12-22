import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { IUser } from "modules/auth/types";
import { PosWrapper, MainContent } from "../../orders/styles";
import { IConfig } from "types";
import { __ } from "modules/common/utils";
import { IOrder, FullOrderQueryResponse } from "../../orders/types";
import Table from "modules/common/components/table";
import { TableRow, Detail, Status, FlexEnd } from "../styles";
import { colors } from "modules/common/styles";
import Button from "modules/common/components/Button";
import OrderSearch from "../containers/OrderSearch";

type Props = {
  editOrder: (doc) => void;
  currentUser: IUser;
  currentConfig: IConfig;
  orders: IOrder[];
  orderQuery: FullOrderQueryResponse;
};

type State = {};

export default class Screen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  renderDetail(order) {
    const { items } = order;

    if (!items || !items.length) {
      return null;
    }

    return items.map((item) => (
      <Detail key={item._id}>
        <p>{item.productName}</p>
        <span>
          {__("Quantity")}: <b>{item.count}</b>
        </span>
      </Detail>
    ));
  }

  renderStatus(primaryColor, status) {
    let color = primaryColor;

    switch (status) {
      case "new":
        color = colors.colorCoreBlue;
        break;
      case "doing":
        color = colors.colorCoreOrange;
        break;
    }

    return (
      <Status color={color} odd={true}>
        {__(status)}
      </Status>
    );
  }

  renderActions = (status) => {
    if (status === "new") {
      return (
        <>
          <Button size="small" btnStyle="primary" icon="play-1">
            Start
          </Button>
          <Button size="small" btnStyle="danger" icon="cancel-1">
            Decline
          </Button>
        </>
      );
    }

    return (
      <Button size="small" btnStyle="success" icon="check-circle">
        Done
      </Button>
    );
  };

  renderOrder(order: IOrder) {
    const { uiOptions } = this.props.currentConfig || ({} as IConfig);
    const color = uiOptions.colors.primary;

    return (
      <TableRow key={order._id} id={order._id} color={color}>
        <td className="number">{order.number.split("_")[1]}</td>
        <td>{this.renderDetail(order)}</td>
        <td>
          <Status color={color}>{__(order.type)}</Status>
        </td>
        <td>{this.renderStatus(color, order.status)}</td>
        <td>{this.renderActions(order.status)}</td>
      </TableRow>
    );
  }

  render() {
    const { orders, orderQuery } = this.props;
    console.log(orders);
    return (
      <MainContent hasBackground={true}>
        <PosWrapper>
          <FlexEnd>
            <OrderSearch ordersQuery={orderQuery} />
          </FlexEnd>
          <Row>
            <Col>
              <Table>
                <thead>
                  <tr>
                    <th>{__("Number")}</th>
                    <th>{__("Order")}</th>
                    <th>{__("Type")}</th>
                    <th>{__("Status")}</th>
                    <th>{__("Actions")}</th>
                  </tr>
                </thead>
                <tbody id="products">
                  {orders.map((order) => this.renderOrder(order))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </PosWrapper>
      </MainContent>
    );
  } // end render()
}
