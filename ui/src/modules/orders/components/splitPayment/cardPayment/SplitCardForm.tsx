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
}

export default class SplitForm extends React.Component<Props> {
  render() {
    const { order, addCardPayment, closeModal, billType } = this.props;

    const handleSubmit = () => {
      console.log('ok');
    };

    const paymentEnabled = false;

    const onCancel = () => {
      closeModal && closeModal();
    };

    return (
      <>
        <CardInput
          billType={billType}
          addCardPayment={addCardPayment}
          order={order}
          onStateChange={() => {}}
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
            {paymentEnabled && (
              <Button
                icon="check-circle"
                block
                onClick={handleSubmit}
              >
                {__("Done")}
              </Button>
            )}
          </FlexCenter>
        </div>
      </>
    );
  } // end render()
}
