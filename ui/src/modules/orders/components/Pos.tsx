import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NameCard from "modules/common/components/nameCard/NameCard";
import AsyncComponent from "modules/common/components/AsyncComponent";
import { IOrderItemInput } from "../types";
import { ORDER_TYPES } from "../../../constants";
import Stage from "./Stage";
import Calculation from "./Calculation";
import Search from "../containers/layout/Search";
import { IUser } from "modules/auth/types";
import { PosContainer, MainContent } from "../styles";
import { FlexBetween } from "modules/common/styles/main";

const ProductsContainer = AsyncComponent(
  () => import(/* webpackChunkName: "Pos" */ "../containers/ProductsContainer")
);

type Props = {
  makePayment: (params) => void;
  currentUser: IUser;
};

type State = {
  items: IOrderItemInput[];
  totalAmount: number;
  type: string;
};

const getTotalAmount = (items: IOrderItemInput[]) => {
  let total = 0;

  for (const i of items) {
    total += (i.unitPrice || 0) * i.count;
  }

  return total;
};

export default class Pos extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      items: [],
      totalAmount: 0,
      type: ORDER_TYPES.EAT,
    };
  }

  setItems = (items: IOrderItemInput[]) => {
    let total = getTotalAmount(items);

    this.setState({ items, totalAmount: total });
  };

  changeItemCount = (item: IOrderItemInput) => {
    const excludedList = this.state.items.filter(
      (i) => i.productId !== item.productId
    );
    const items = [...excludedList, item];
    const totalAmount = getTotalAmount(items);

    this.setState({ items, totalAmount });
  };

  // set state field that doesn't need amount calculation
  setOrderState = (name: string, value: any) => {
    this.setState({ [name]: value } as Pick<State, keyof State>);
  };

  makePayment = () => {
    const { makePayment } = this.props;
    const { totalAmount, type, items } = this.state;

    const currentItems = items.map((item) => ({
      productId: item.productId,
      count: item.count,
      unitPrice: item.unitPrice,
    }));

    makePayment({ items: currentItems, totalAmount, type });
  };

  render() {
    const { currentUser } = this.props;
    const { items, totalAmount } = this.state;

    return (
      <PosContainer>
        <Row>
          <Col md={6}>
            <MainContent hasBackground={true}>
              <FlexBetween>
                <NameCard user={currentUser} avatarSize={40} />
                <Search />
              </FlexBetween>
              <ProductsContainer setItems={this.setItems} items={items} />
            </MainContent>
          </Col>
          <Col sm={3}>
            <MainContent noPadding={true}>
              <Stage items={items} changeItemCount={this.changeItemCount} />
            </MainContent>
          </Col>
          <Col sm={3}>
            <MainContent hasBackground={true} hasShadow={true} noPadding={true}>
              <Calculation
                totalAmount={totalAmount}
                makePayment={this.makePayment}
                setOrderState={this.setOrderState}
              />
            </MainContent>
          </Col>
        </Row>
      </PosContainer>
    );
  }
}
