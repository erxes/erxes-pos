import React from 'react';
import NumberFormat from "react-number-format";

import colors from 'modules/common/styles/colors';
import Icon from "modules/common/components/Icon";
import FormGroup from "modules/common/components/form/Group";
import ControlLabel from "modules/common/components/form/Label";
import { __ } from "modules/common/utils";
import { Amount } from "modules/orders/components/Calculation";
import { Input } from "modules/orders/styles";
import { formatNumber } from "modules/utils";
import { PAYMENT_TYPES } from './CalculationForm';

type Props = {
  cashAmount: number;
  color: string;
  reset: (key: string) => void;
  onStateChange: (key: string, value: any) => void;
  totalAmount: number;
}

export default class CashForm extends React.Component<Props> {
  render() {
    const { color, reset, cashAmount, onStateChange, totalAmount } = this.props;

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

    const changeAmount = (cashAmount || 0) - (totalAmount || 0);
    const changeColor = changeAmount < 0 ? colors.colorCoreRed : colors.colorCoreTeal;

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
        {changeAmount !== 0 && (
          <Amount color={changeColor}>
            <span>{__("Change amount")}</span>
            {formatNumber(changeAmount)}₮
          </Amount>
        )}
      </React.Fragment>
    );
  } // end render()
}
