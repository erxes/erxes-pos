import React from 'react';
import { IOrder, ICardPayment } from 'modules/orders/types';
// import SplitCardForm from './SplitCardForm';
import { FlexCenter } from 'modules/common/styles/main';
import CardInput from './CardInput';

type Props = {
  order: IOrder;
  addCardPayment: (params: ICardPayment) => void;
  billType: string;
  amount?: number;
};
export default class CardSection extends React.Component<Props> {
  render() {
    const { order, addCardPayment, billType, amount } = this.props;

    return (
      <FlexCenter>
        <CardInput
          billType={billType}
          addCardPayment={addCardPayment}
          order={order}
          maxAmount={amount}
        />
      </FlexCenter>
    );
  }
}
