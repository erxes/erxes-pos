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
import KeyPads from '../../drawer/KeyPads';

type Props = {
  color?: string;
  billType: string;
  order: IOrder;
  setAmount: (amount: number) => void;
  amount: number;
}

type State = {
  amount: number;
}

export default class CardInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      amount: props.amount || 0
    };
  }

  onChangeKeyPad = (num) => {
    const { setAmount } = this.props;
    const { amount } = this.state;

    if (num === "CE") {
      this.setState({ amount: 0 });

      return setAmount(0);
    }

    this.setState({ amount: amount + num });

    return setAmount(amount + num);
  };

  render() {
    const {
      color = '',
      billType,
      setAmount
    } = this.props;

    const { amount } = this.state;

    const inputProps: any = {
      allowNegative: false,
      thousandSeparator: true,
      prefix: "₮",
      inputMode: "numeric",
    };

    const handleInput = (value: number | undefined) => {
      this.setState({ amount: value || 0 });

      setAmount(value || 0);
    };

    const resetInput = () => {
      this.setState({ amount: 0 });

      setAmount(0);
    };

    return (
      <React.Fragment>
        <FormGroup>
          <ControlLabel>{__("Amount")}</ControlLabel>
          <Input color={color}>
            <NumberFormat
              name="mobileAmount"
              value={amount}
              onValueChange={(values) => handleInput(values.floatValue)}
              {...inputProps}
            />
            <div onClick={resetInput}>
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
