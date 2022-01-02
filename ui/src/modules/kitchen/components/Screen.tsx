import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { IUser } from "modules/auth/types";
import { PosWrapper, MainContent, Orders } from "../../orders/styles";
import { IConfig } from "types";
import { __ } from "modules/common/utils";
import { IOrder, FullOrderQueryResponse } from "../../orders/types";
import Table from "modules/common/components/table";
import { TableRow, Detail, Status, FlexEnd, ScreenWrapper } from "../styles";
import Button from "modules/common/components/Button";
import OrderSearch from "../containers/OrderSearch";

type Props = {
  editOrder: (doc) => void;
  posCurrentUser: IUser;
  currentConfig: IConfig;
  orders: IOrder[];
  doneOrders: IOrder[];
  orderQuery: FullOrderQueryResponse;
};

export default class Screen extends React.Component<Props> {
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

  renderActions = (order) => {
    if (order.status === "new") {
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

    const toDone = (e) => {
      this.props.editOrder({ _id: order._id, status: 'done' })
    }

    return (
      <Button size="small" btnStyle="success" icon="check-circle" onClick={toDone}>
        Ready
      </Button>
    );
  };

  renderOrder(order: IOrder) {
    const { uiOptions } = this.props.currentConfig || ({} as IConfig);
    const color = uiOptions.colors.primary;

    return (
      <TableRow key={order._id} id={order._id} color={color}>
        <td className="number center">{order.number.split("_")[1]}</td>
        <td>{this.renderDetail(order)}</td>
        <td className="center">
          <Status color={color}>{__(order.type)}</Status>
        </td>
        <td>{this.renderActions(order)}</td>
      </TableRow>
    );
  }

  renderDoneOrders(order: IOrder) {
    const onClickUndo = e => {
      this.props.editOrder({ _id: order._id, status: 'doing' })
    }

    return <Button
      btnStyle='warning'
      onClick={onClickUndo}
      size='large'
      icon="arrow-from-top"
    >
      {order.number.split("_")[1]}
    </Button>;
  }

  render() {
    const { orders, doneOrders, orderQuery } = this.props;

    return (
      <MainContent hasBackground={true}>
        <PosWrapper>
          <FlexEnd>
            <OrderSearch ordersQuery={orderQuery} />
          </FlexEnd>
          <Orders>
            {doneOrders.map((order, index) => (
              <React.Fragment key={index}>
                {this.renderDoneOrders(order)}
              </React.Fragment>
            ))}
          </Orders>
          <Row>
            <Col>
              <ScreenWrapper>
                <Table>
                  <thead>
                    <tr>
                      <th>{__("Number")}</th>
                      <th>{__("Order")}</th>
                      <th>{__("Type")}</th>
                      <th>{__("Actions")}</th>
                    </tr>
                  </thead>
                  <tbody id="products">
                    {orders.map((order) => this.renderOrder(order))}
                  </tbody>
                </Table>
              </ScreenWrapper>
            </Col>
          </Row>
        </PosWrapper>
      </MainContent>
    );
  } // end render()
}
