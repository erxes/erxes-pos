import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import React from 'react';
import NumberFormat from "react-number-format";
import styled from "styled-components";

import Button from "modules/common/components/Button";
import Icon from "modules/common/components/Icon";
import FormGroup from "modules/common/components/form/Group";
import ControlLabel from "modules/common/components/form/Label";
import { __ } from "modules/common/utils";
import { Input } from "modules/orders/styles";

const ButtonWrapper = styled.div`
  margin-bottom: 20px;
`;

type Props = {
  cardAmount: number;
  reset: (paymentType: string) => void;
  color?: string;
  onStateChange: (key: string, value: any) => void;
}

type State = {
  checkedConnection: boolean;
  sentTransaction: boolean;
  checkedTransaction: boolean;
}

export default class CardForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      checkedConnection: false,
      sentTransaction: false,
      checkedTransaction: false
    };
  }

  render() {
    const { cardAmount, reset, color = '', onStateChange } = this.props;

    const inputProps: any = {
      allowNegative: false,
      thousandSeparator: true,
      prefix: "₮",
      inputMode: "numeric",
    };

    const CARD_AMOUNT = 'cardAmount';

    const handleInput = (name: string, value: number | undefined) => {
      onStateChange(name, value);
    };

    const handleClick = (activeInput: string) => {
      onStateChange('activeInput', activeInput);
    };

    // change databank urls below
    const onCheckConnection = () => {
      fetch('http://localhost:7300/health').then(res => {
        console.log(res, 'rerere');
      })
    };

    return (
      <React.Fragment>
        <FormGroup>
          <ControlLabel>{__("By Card")}</ControlLabel>
          <Input color={color}>
            <NumberFormat
              name="cardAmount"
              value={cardAmount}
              onValueChange={(values) =>
                handleInput(CARD_AMOUNT, values.floatValue)
              }
              onClick={() => handleClick(CARD_AMOUNT)}
              {...inputProps}
            />
            <div onClick={() => reset(CARD_AMOUNT)}>
              <Icon icon="cancel" size={13} />
            </div>
          </Input>
        </FormGroup>
        <ButtonWrapper>
          <Button btnStyle='simple' onClick={onCheckConnection}>{__("Send card amount")}</Button>
          <Button btnStyle='warning'>{__("Check transaction")}</Button>
        </ButtonWrapper>
      </React.Fragment>
    );
  } // end render()
}
