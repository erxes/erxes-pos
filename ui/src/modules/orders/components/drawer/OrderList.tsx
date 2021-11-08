import React from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import Search from "../../containers/layout/Search";
import { IOrder } from "../../types";
import { FlexCenter } from "modules/common/styles/main";
import Icon from "modules/common/components/Icon";
import { formatNumber } from "modules/utils";

const Orders = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const OrderBox = styledTS<{ color?: string }>(styled.div)`
  background: #fff;
  padding: 20px;
  text-align: center;
  margin: 0 20px 20px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 31.333%;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;

  > div {
    margin-bottom: 10px;
    font-weight: 500;
    font-size: 15px;

    b {
      margin-left: 5px;
      color: ${(props) => (props.color ? props.color : "#6569df")};
      word-break: break-word;
      line-height: 15px;
    }
  }

  label {
    background:${(props) => (props.color ? props.color : "#6569df")};
    color: #fff;
    padding: 5px;
    border-radius: 8px;
  }

  &:nth-child(3n) {
    margin-right: 0;
  }
`;

type Props = {
  orders: IOrder[];
  options: any;
};

export default class OrderList extends React.Component<Props> {
  renderItem(order, key) {
    const { number } = order;

    return (
      <OrderBox color={this.props.options.colors.primary} key={key}>
        <FlexCenter>
          Number: <b>{number}</b>
        </FlexCenter>
        <FlexCenter>
          <Icon icon="wallet" size={20} /> <b>{formatNumber(200000)}₮</b>
        </FlexCenter>
        <label>{order.status || "Take"}</label>
      </OrderBox>
    );
  }

  render() {
    const { orders = [] } = this.props;

    return (
      <>
        <Search full={true} />
        <Orders>
          {orders.map((order, index) => this.renderItem(order, index))}
        </Orders>
      </>
    );
  }
}
