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
      amount: props.maxAmount || 0
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

    // const PATH = 'http://localhost:27028';
    const PATH = 'http://localhost:7000';

    const sendTransaction = async () => {
      fetch(`${PATH}/ajax/get-status-info`)
        // .then(res => res.json())
        .then((res: any) => {
          // TODO remove code, fake data
          res = {
            status_code: 'ok',
          }
          if (res && res.status_code === 'ok') {
            // send transaction upon successful connection
            fetch(PATH, {
              method: 'GET',
              // method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              // body: JSON.stringify({
              //   service_name: 'doSaleTransaction',
              //   service_params: {
              //     // special character _ is not accepted
              //     db_ref_no: number.replace('_', ''),
              //     amount: amount.toString(),
              //     vatps_bill_type: billType
              //   }
              // })
            })
              // .then(res => res.json())
              // .then(r => {
              .then(res => {
                // TODO remove code, fake data
                const r = {
                  status: true,
                  response: {
                    response_code: '000',
                    aid: "A0000000031010",
                    amount: amount,
                    app_name: "VISA DEBIT",
                    auth_code: "1TS93C",
                    bank_mb_code: "05",
                    batch_no: "000000000231",
                    card_holder_name: "",
                    date: "02/27",
                    db_ref_no: "202202270001",
                    entry_mode: "Contact Less TAP",
                    is_vatps: "0",
                    merchant_name: "Yoshinoya",
                    model: "s300",
                    operation: "SALE",
                    pan: "438054XXXXXX2643",
                    pos_firmware: "2.4.94",
                    reader_id: "53240799",
                    response_msg: "Гүйлгээ зөвшөөрөгдсөн.",
                    rrn: "003841002333",
                    tc: "0000000000000000",
                    term_app_name: "DtbProlin",
                    terminal_date: "20220227112935",
                    terminal_id: "70078754",
                    time: "11:29:32",
                    trace_no: "020735",
                    version: "334",
                  }
                }
                console.log(number)
                if (r && r.status === true && r.response) {
                  if (r.response.response_code === '000') {

                    Alert.success(
                      __(
                        r.response.response_msg || 'Transaction was successful'
                      )
                    );

                    addCardPayment({
                      _id,
                      cardInfo: JSON.stringify(r.response),
                      amount
                    });
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
