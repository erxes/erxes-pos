import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import React from 'react';
import NumberFormat from "react-number-format";

import { FlexCenter } from "modules/common/styles/main";
import Icon from "modules/common/components/Icon";
import FormGroup from "modules/common/components/form/Group";
import ControlLabel from "modules/common/components/form/Label";
import { __ } from "modules/common/utils";
import { Input } from "modules/orders/styles";
import { IOrder } from 'modules/orders/types';
import KeyPads from '../drawer/KeyPads';

type Props = {
  color?: string;
  billType: string;
  order: IOrder;
  setAmount: (amount: number | string) => void;
  amount: number | string;
  inputLabel: string;
  usePrefix?: boolean;
  getStringValue?: boolean;
}

export default class CardInput extends React.Component<Props> {
  onChangeKeyPad = (num: string) => {
    const { setAmount, amount, getStringValue } = this.props;

    if (num === "CE") {
      return setAmount(0);
    }
    if (getStringValue) {
      return setAmount(amount + num);
    }

    return setAmount(Number(amount + num));
  };

  render() {
    const {
      color = '',
      billType,
      setAmount,
      inputLabel,
      amount,
      usePrefix,
      getStringValue
    } = this.props;

    const inputProps: any = {
      allowNegative: false,
      thousandSeparator: !getStringValue && true,
      prefix: !getStringValue && usePrefix && "₮",
      inputMode: "numeric",
    };

    const onValueChange = (values) => {
      let value = values.floatValue || 0;

      if (getStringValue) {
        value = values.value;
      }

      setAmount(value);
    }

    return (
      <React.Fragment>
        <FormGroup>
          <ControlLabel>{__(inputLabel)}</ControlLabel>
          <Input color={color}>
            <NumberFormat
              value={amount}
              onValueChange={onValueChange}
              {...inputProps}
            />
            <div onClick={() => setAmount(0)}>
              <Icon icon="cancel" size={13} />
            </div>
          </Input>
        </FormGroup>
        <FlexCenter>
          <KeyPads
            isPayment={false}
            isPortrait={true}
            onChangeKeyPad={this.onChangeKeyPad}
            billType={billType}
          />
        </FlexCenter>
      </React.Fragment>
    );
  } // end render()
}
