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
  setAmount: (amount: number) => void;
  amount: number;
  maxAmount?: number;
  inputLabel: string;
}

export default class CardInput extends React.Component<Props> {
  onChangeKeyPad = (num: string) => {
    const { setAmount, amount } = this.props;

    if (num === "CE") {
      return setAmount(0);
    }

    return setAmount(Number(amount + num));
  };

  render() {
    const {
      color = '',
      billType,
      setAmount,
      inputLabel,
      amount
    } = this.props;

    const inputProps: any = {
      allowNegative: false,
      thousandSeparator: true,
      prefix: "₮",
      inputMode: "numeric",
    };

    return (
      <React.Fragment>
        <FormGroup>
          <ControlLabel>{__(inputLabel)}</ControlLabel>
          <Input color={color}>
            <NumberFormat
              name="cashAmount"
              value={amount}
              onValueChange={(values) => setAmount(values.floatValue || 0)}
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
