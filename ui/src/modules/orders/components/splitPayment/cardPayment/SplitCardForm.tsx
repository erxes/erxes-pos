import React from 'react';

import { FlexCenter } from "modules/common/styles/main";
import Button from "modules/common/components/Button";
import { __ } from "modules/common/utils";
import CardInput from './CardInput';
import { IOrder, ICardPayment } from 'modules/orders/types';

type Props = {
  closeModal?: () => void;
  afterSave?: () => void;
  order: IOrder;
  addCardPayment: (params: ICardPayment) => void;
  billType: string;
  maxAmount?: number;
}

type State = {
  paymentEnabled: boolean;
}

export default class SplitForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { paymentEnabled: false };
  }

  render() {
    const { order, addCardPayment, closeModal, billType, maxAmount } = this.props;

    const onCancel = () => {
      closeModal && closeModal();
    };

    return (
      <>
        <CardInput
          billType={billType}
          addCardPayment={addCardPayment}
          order={order}
          maxAmount={maxAmount}
        />
        <div>
          <FlexCenter>
            <Button
              btnStyle="simple"
              icon="cancel-1"
              block
              onClick={onCancel}
            >
              {__("Cancel")}
            </Button>
          </FlexCenter>
        </div>
      </>
    );
  } // end render()
}
