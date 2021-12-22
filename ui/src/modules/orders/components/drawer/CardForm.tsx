import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import React from 'react';
import NumberFormat from "react-number-format";
import styled from "styled-components";

import Button from "modules/common/components/Button";
import Icon from "modules/common/components/Icon";
import FormGroup from "modules/common/components/form/Group";
import ControlLabel from "modules/common/components/form/Label";
import { __, Alert } from "modules/common/utils";
import { Input } from "modules/orders/styles";
import { PAYMENT_TYPES } from './CalculationForm';

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
    const { checkedConnection } = this.state;

    const inputProps: any = {
      allowNegative: false,
      thousandSeparator: true,
      prefix: "₮",
      inputMode: "numeric",
    };

    const handleInput = (value: number | undefined) => {
      onStateChange(PAYMENT_TYPES.CARD, value);
    };

    const handleClick = () => {
      onStateChange('activeInput', PAYMENT_TYPES.CARD);
    };

    // change databank urls below
    const onCheckConnection = () => {
      const path = 'http://localhost:27028/ajax/get-status-info';

      fetch(path).then((res: any) => {
        if (res && res.status_code === 'ok') {
          this.setState({ checkedConnection: true });
        }
      }).catch(e => {
        Alert.error(`${e.message}: Databank-н төлбөрийн програмтай холбогдсонгүй: ${path}`);
      });
    };

    return (
      <React.Fragment>
        <FormGroup>
          <ControlLabel>{__("By Card")}</ControlLabel>
          <Input color={color}>
            <NumberFormat
              name="cardAmount"
              value={cardAmount}
              onValueChange={(values) => handleInput(values.floatValue)}
              onClick={() => handleClick()}
              {...inputProps}
            />
            <div onClick={() => reset(PAYMENT_TYPES.CARD)}>
              <Icon icon="cancel" size={13} />
            </div>
          </Input>
        </FormGroup>
        <ButtonWrapper>
          <Button btnStyle='simple' onClick={onCheckConnection}>{__("Check connection")}</Button>
          {checkedConnection && <Button btnStyle='warning'>{__("Check transaction")}</Button>}
        </ButtonWrapper>
      </React.Fragment>
    );
  } // end render()
}
