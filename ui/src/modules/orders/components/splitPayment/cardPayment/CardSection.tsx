import React from 'react';
import { IOrder, ICardPayment } from 'modules/orders/types';
import { FlexCenter } from 'modules/common/styles/main';
import CardInput from './CardInput';

type Props = {
  order: IOrder;
  addCardPayment: (params: ICardPayment) => void;
  billType: string;
  cardAmount: number;
  maxAmount: number;
  setAmount: (amount) => void;
};

export default class CardSection extends React.Component<Props> {
  render() {
    const { order, addCardPayment, billType, cardAmount, maxAmount, setAmount } = this.props;

    return (
      <FlexCenter>
        <CardInput
          billType={billType}
          addCardPayment={addCardPayment}
          order={order}
          cardAmount={cardAmount}
          maxAmount={maxAmount}
          setAmount={setAmount}
        />
      </FlexCenter>
    );
  }
}
