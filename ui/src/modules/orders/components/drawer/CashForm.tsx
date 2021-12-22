import React from 'react';
import NumberFormat from "react-number-format";

import Icon from "modules/common/components/Icon";
import FormGroup from "modules/common/components/form/Group";
import ControlLabel from "modules/common/components/form/Label";
import { __ } from "modules/common/utils";
import { Input } from "modules/orders/styles";
import { PAYMENT_TYPES } from './CalculationForm';

type Props = {
  cashAmount: number;
  color: string;
  reset: (key: string) => void;
  onStateChange: (key: string, value: any) => void;
}

export default class CashForm extends React.Component<Props> {
  render() {
    const { color, reset, cashAmount, onStateChange } = this.props;

    const inputProps: any = {
      allowNegative: false,
      thousandSeparator: true,
      prefix: "₮",
      inputMode: "numeric",
    };

    const handleInput = (value: number | undefined) => {
      onStateChange(PAYMENT_TYPES.CASH, value);
    };

    const handleClick = () => {
      onStateChange('activeInput', PAYMENT_TYPES.CASH);
    };

    return (
      <React.Fragment>
        <FormGroup>
          <ControlLabel>{__("In Cash")}</ControlLabel>
          <Input color={color}>
            <NumberFormat
              name="cashAmount"
              value={cashAmount}
              onValueChange={(values) => handleInput(values.floatValue)}
              onClick={() => handleClick()}
              {...inputProps}
            />
            <div onClick={() => reset(PAYMENT_TYPES.CASH)}>
              <Icon icon="cancel" size={13} />
            </div>
          </Input>
        </FormGroup>
      </React.Fragment>
    );
  } // end render()
}
