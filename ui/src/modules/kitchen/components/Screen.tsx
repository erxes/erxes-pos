import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { IUser } from "modules/auth/types";
import { PosWrapper, MainContent } from "../../orders/styles";
import { IConfig } from "types";
import { __ } from "modules/common/utils";
import { IOrder } from "../../orders/types";
import Table from 'modules/common/components/table';

type Props = {
  editOrder: (doc) => void;
  currentUser: IUser;
  currentConfig: IConfig;
  orders: IOrder[];
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
      return <></>;
    }

    return (
      <>
        {items.map(item => (
          <p key={item._id}>
            {item.productName} - ( {item.count} )
          </p>
        ))}
      </>
    )
  }

  renderOrder(order: IOrder) {
    const renderActions = () => {
      return ''
    }
    return (
      <tr
        key={order._id}
        id={order._id}
      >
        <td>
          {order.number}
        </td>
        <td>
          {this.renderDetail(order)}
        </td>
        <td>{order.type}</td>
        <td>{order.status}</td>
        <td>
          {renderActions()}
        </td>
      </tr>
    )
  }

  render() {
    const { orders } = this.props;

    return (
      <PosWrapper>
        <Row>
          <Col>
            <MainContent hasBackground={true}>
              <Table>
                <thead>
                  <tr>
                    <th>{__('Number')}</th>
                    <th>{__('Order')}</th>
                    <th>{__('Type')}</th>
                    <th>{__('Status')}</th>
                    <th >{__('Actions')}</th>
                  </tr>
                </thead>
                <tbody id="products">
                  {orders.map(order => (
                    this.renderOrder(order)
                  ))}
                </tbody>
              </Table>
            </MainContent>

          </Col>
        </Row>
      </PosWrapper>
    );
  } // end render()
}
