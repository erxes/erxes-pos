import React from 'react';
import { __ } from 'modules/common/utils';
import CardInput from './CardInput';
import { IOrder, ICardPayment } from 'modules/orders/types';

type Props = {
  closeModal?: () => void;
  afterSave?: () => void;
  order: IOrder;
  addCardPayment: (params: ICardPayment) => void;
  billType: string;
  maxAmount?: number;
};

type State = {
  paymentEnabled: boolean;
};

export default class SplitForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { paymentEnabled: false };
  }

  render() {
    const { order, addCardPayment, billType, maxAmount } = this.props;

    return (
      <>
        <CardInput
          billType={billType}
          addCardPayment={addCardPayment}
          order={order}
          maxAmount={maxAmount}
        />
      </>
    );
  } // end render()
}
