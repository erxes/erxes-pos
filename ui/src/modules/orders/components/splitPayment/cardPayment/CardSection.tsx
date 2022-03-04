import React from 'react';
import { IOrder, ICardPayment } from 'modules/orders/types';
import { MarginTop } from 'modules/orders/styles';
// import SplitCardForm from './SplitCardForm';
import { FlexCenter } from 'modules/common/styles/main';
import CardInput from './CardInput';

type Props = {
  order: IOrder;
  addCardPayment: (params: ICardPayment) => void;
  billType: string;
  maxAmount?: number;
};
export default class CardSection extends React.Component<Props> {
  render() {
    const { order, addCardPayment, billType, maxAmount } = this.props;

    return (
      <MarginTop margin={20}>
        <FlexCenter>
          <CardInput
            billType={billType}
            addCardPayment={addCardPayment}
            order={order}
            maxAmount={maxAmount}
          />
        </FlexCenter>
      </MarginTop>
    );
  }
}
