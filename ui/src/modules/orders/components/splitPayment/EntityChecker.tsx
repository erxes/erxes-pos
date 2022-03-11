import React from 'react';
import Button from 'modules/common/components/Button';
import { __ } from 'modules/common/utils';
import { IOrder } from 'modules/orders/types';
import KeypadWithInput from './KeypadWithInput';
import { BILL_TYPES } from '../drawer/PaymentForm';
import { ButtonGroup, EntityChecker } from 'modules/orders/styles';

type Props = {
  billType: string;
  onStateChange: (key: string, value: any) => void;
  order: IOrder;
  registerNumber: string;
  onSubmit: () => void;
};

export default class EbarimtModal extends React.Component<Props> {
  render() {
    const { billType, order, onStateChange, registerNumber, onSubmit } =
      this.props;

    const onClose = (value: string) => {
      const billType = value;

      this.setState({
        billType,
        showRegModal: billType === BILL_TYPES.CITIZEN
      });
    };
    // console.log('close');
    // onStateChange('showRegModal', false);

    const setAmount = val => {
      onStateChange('registerNumber', val.toString());
    };

    return (
      <EntityChecker>
        <KeypadWithInput
          billType={billType}
          order={order}
          setAmount={setAmount}
          amount={registerNumber}
          inputLabel={__('Register number')}
          usePrefix={false}
          getStringValue={true}
        />
        <ButtonGroup>
          <Button
            btnStyle="success"
            size="small"
            icon="check"
            onClick={() => onSubmit()}
          >
            {__('Check')}
          </Button>
          <Button
            btnStyle="simple"
            icon="cancel-1"
            size="small"
            onClick={() => onClose(billType)}
          >
            {__('Close')}
          </Button>
        </ButtonGroup>
      </EntityChecker>
    );
  }
}
