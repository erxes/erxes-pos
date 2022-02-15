import React from 'react';
import Modal from 'react-bootstrap/Modal'

import Button from 'modules/common/components/Button';
import { __ } from 'modules/common/utils';
import { IOrder } from 'modules/orders/types';
import KeypadWithInput from './KeypadWithInput';

type Props = {
  billType: string;
  onStateChange: (key: string, value: any) => void;
  order: IOrder;
  showModal: boolean;
  registerNumber: string;
  onSubmit: () => void;
}

export default class EbarimtModal extends React.Component<Props> {
  render() {
    const { billType, order, showModal, onStateChange, registerNumber, onSubmit } = this.props;

    const onClose = () => {
      onStateChange('showRegModal', false);
    }

    const setAmount = (val) => {
      onStateChange('registerNumber', val.toString());
    };

    return (
      <Modal show={showModal}>
        <Modal.Body>
          <KeypadWithInput
            billType={billType}
            order={order}
            setAmount={setAmount}
            amount={registerNumber}
            inputLabel={__('Register number')}
            usePrefix={false}
            getStringValue={true}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button btnStyle="success" icon="check" onClick={() => onSubmit()}>{__('Check')}</Button>
          <Button btnStyle="simple" icon="cancel-1" onClick={onClose}>{__('Close')}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
