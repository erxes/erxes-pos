import React from 'react';
import { IOrder, IPaymentInput } from 'modules/orders/types';
import { FlexCenter } from 'modules/common/styles/main';
import CardInput from './CardInput';

type Props = {
  order: IOrder;
  addPayment: (params: IPaymentInput) => void;
  billType: string;
  cardAmount: number;
  maxAmount: number;
  setAmount: (amount) => void;
};

export default class CardSection extends React.Component<Props> {
  render() {
    const { order, addPayment, billType, cardAmount, maxAmount, setAmount } = this.props;

    return (
      <FlexCenter>
        <CardInput
          billType={billType}
          addPayment={addPayment}
          order={order}
          cardAmount={cardAmount}
          maxAmount={maxAmount}
          setAmount={setAmount}
        />
      </FlexCenter>
    );
  }
}
