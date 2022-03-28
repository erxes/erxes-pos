import React from 'react';

import FormControl from "modules/common/components/form/Control";
import Icon from "modules/common/components/Icon";
import { BILL_TYPES } from '../../../../constants';
import Button from 'modules/common/components/Button';
import { __ } from 'modules/common/utils';
import { IOrder } from 'modules/orders/types';
import { ButtonGroup, EntityChecker, Input } from 'modules/orders/styles';

type Props = {
  onStateChange: (key: string, value: any) => void;
  order: IOrder;
  registerNumber: string;
  onSubmit: () => void;
  onBillTypeChange: (value: string) => void;
};

export default class EbarimtModal extends React.Component<Props> {
  render() {
    const { onStateChange, registerNumber, onSubmit, onBillTypeChange } = this.props;

    const onClose = () => {
      onBillTypeChange(BILL_TYPES.CITIZEN);
      onStateChange('showEntity', false);
    };

    const onChange = e => {
      const value = (e.target as HTMLInputElement).value;

      onStateChange('registerNumber', value);
    }

    return (
      <EntityChecker>
        <Input>
          <FormControl
            type="text"
            name="registerNumber"
            onChange={onChange}
            value={registerNumber}
            onFocus={() => onStateChange('activeInput', 'registerNumber')}
          />
          <div onClick={() => onStateChange('registerNumber', '')}>
            <Icon icon="cancel" size={13} />
          </div>
        </Input>
        <ButtonGroup>
          <Button
            btnStyle="warning"
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
            onClick={() => onClose()}
          >
            {__('Back')}
          </Button>
        </ButtonGroup>
      </EntityChecker>
    );
  }
}
