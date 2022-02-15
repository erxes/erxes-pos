import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import React from 'react';
import NumberFormat from "react-number-format";
import styled from "styled-components";

import { FlexCenter } from "modules/common/styles/main";
import Button from "modules/common/components/Button";
import Icon from "modules/common/components/Icon";
import FormGroup from "modules/common/components/form/Group";
import ControlLabel from "modules/common/components/form/Label";
import { __, Alert } from "modules/common/utils";
import { Input } from "modules/orders/styles";
import { IOrder, ICardPayment } from 'modules/orders/types';
import KeyPads from '../../drawer/KeyPads';

const ButtonWrapper = styled.div`
  margin-bottom: 20px;
`;

type Props = {
  color?: string;
  billType: string;
  addCardPayment: (params: ICardPayment) => void;
  order: IOrder;
  maxAmount?: number;
}

type State = {
  sentTransaction: boolean;
  checkedTransaction: boolean;
  amount: number;
}

export default class CardInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sentTransaction: false,
      checkedTransaction: false,
      amount: 0
    };
  }

  onChangeKeyPad = (num) => {
    const { amount } = this.state;

    if (num === "CE") {
      return this.setState({ amount: 0 });
    }

    return this.setState({ amount: amount + num });
  };

  render() {
    const {
      color = '',
      billType,
      addCardPayment,
      order,
      maxAmount = 0
    } = this.props;

    const { amount } = this.state;

    const { number, _id } = order;

    const inputProps: any = {
      allowNegative: false,
      thousandSeparator: true,
      prefix: "₮",
      inputMode: "numeric",
    };

    const handleInput = (value: number | undefined = 0) => {
      // do not accept amount greater than payable amount
      const val = Number((value > maxAmount ? maxAmount : value).toFixed(2));

      this.setState({ amount: val });
    };

    const resetInput = () => {
      this.setState({ amount: 0 });
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
                db_ref_no: number.replace('_', ''),
                amount: amount.toString(),
                vatps_bill_type: billType
              }
            })
          }).then(res => res.json()).then(r => {
            if (r && r.status === true && r.response) {
              if (r.response.response_code === '000') {
                Alert.success(__(r.response.response_msg || 'Transaction was successful'));

                addCardPayment({ _id, cardInfo: JSON.stringify(r.response), amount });
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
              value={amount}
              onValueChange={(values) => handleInput(values.floatValue)}
              {...inputProps}
            />
            <div onClick={resetInput}>
              <Icon icon="cancel" size={13} />
            </div>
          </Input>
        </FormGroup>
        <ButtonWrapper>
          {amount ?
            <Button btnStyle='warning' onClick={sendTransaction} size='large'>{__("Send transaction")}</Button> : null
          }
        </ButtonWrapper>
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
