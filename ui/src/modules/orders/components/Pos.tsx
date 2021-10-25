import React from 'react';
import styled from 'styled-components';
import AsyncComponent from 'modules/common/components/AsyncComponent';
import { IOrderItemInput } from '../types';
import { ORDER_TYPES } from '../../../constants';
import Stage from './Stage';
import Calculation from './Calculation';

const PosContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: stretch;
  height: 100vh;
`;

const Column = styled.div`
  border: 1px solid #ddd;
`;

const ProductsContainer = AsyncComponent(() =>
  import(/* webpackChunkName: "Pos" */ '../containers/ProductsContainer')
);

type Props = {
  makePayment: (params) => void;
}

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
}

export default class Pos extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      items: [],
      totalAmount: 0,
      type: ORDER_TYPES.EAT
    };

    this.setItems = this.setItems.bind(this);
    this.makePayment = this.makePayment.bind(this);
    this.changeItemCount = this.changeItemCount.bind(this);
    this.setOrderState = this.setOrderState.bind(this);
  }

  setItems(items: IOrderItemInput[]) {
    let total = getTotalAmount(items);

    this.setState({ items, totalAmount: total });
  }

  changeItemCount(item: IOrderItemInput) {
    const excludedList = this.state.items.filter(i => i.productId !== item.productId);
    const items = [...excludedList, item];
    const totalAmount = getTotalAmount(items);

    this.setState({ items, totalAmount });
  }

  // set state field that doesn't need amount calculation
  setOrderState(name: string, value: any) {
    this.setState({ [name]: value } as Pick<State, keyof State>);
  }

  makePayment() {
    const { makePayment } = this.props;
    const { totalAmount, type, items } = this.state;

    const currentItems = items.map(item =>
      ({ productId: item.productId, count: item.count, unitPrice: item.unitPrice })
    );

    makePayment({ items: currentItems, totalAmount, type });
  }

  render() {
    const { items, totalAmount } = this.state;

    console.log(this.state.type, 'tatat')

    return (
      <PosContainer>
        <Column><ProductsContainer setItems={this.setItems} items={items} /></Column>
        <Column><Stage items={items} changeItemCount={this.changeItemCount} /></Column>
        <Column>
          <Calculation
            totalAmount={totalAmount}
            makePayment={this.makePayment}
            setOrderState={this.setOrderState}
          />
        </Column>
      </PosContainer>
    );
  }
};
