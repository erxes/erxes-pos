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
  billType: string;
  orderNumber: string;
  setCardPaymentInfo: (params: any) => void;
  orderId: string;
}

type State = {
  sentTransaction: boolean;
  checkedTransaction: boolean;
}

export default class CardForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sentTransaction: false,
      checkedTransaction: false
    };
  }

  render() {
    const { cardAmount, reset, color = '', onStateChange, billType, orderNumber, setCardPaymentInfo, orderId } = this.props;

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

    const PATH = 'http://localhost:27028';

    const sendTransaction = async () => {
      fetch(`${PATH}/ajax/get-status-info`).then(res => res.json()).then((res: any) => {
        if (res && res.status_code === 'ok') {
          // send transaction upon successful connection
          fetch(PATH, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              service_name: 'doSaleTransaction',
              service_params: {
                // special character _ is not accepted
                db_ref_no: orderNumber.replace('_', ''),
                amount: cardAmount.toString(),
                vatps_bill_type: billType
              }
            })
          }).then(res => res.json()).then(r => {
            if (r && r.status === true && r.response) {
              if (r.response.response_code === '000') {
                Alert.success(__(r.response.response_msg || 'Transaction was successful'));

                // enable payment button
                onStateChange('paymentEnabled', true);

                setCardPaymentInfo({ _id: orderId, info: JSON.stringify(r.response) });
              } else {
                return Alert.warning(r.response.response_msg);
              }
            }
          }).catch(e => {
            Alert.error(e.message);
          })
        }
      }).catch(e => {
        Alert.error(`${e.message}: Databank-н төлбөрийн програмтай холбогдсонгүй`);
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
          {cardAmount &&
            <Button btnStyle='warning' onClick={sendTransaction} size='large'>{__("Send transaction")}</Button>
          }
        </ButtonWrapper>
      </React.Fragment>
    );
  } // end render()
}
