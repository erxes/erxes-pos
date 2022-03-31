import "abortcontroller-polyfill/dist/polyfill-patch-fetch";
import React from "react";
import NumberFormat from "react-number-format";

import Button from "modules/common/components/Button";
import Icon from "modules/common/components/Icon";
import FormGroup from "modules/common/components/form/Group";
import ControlLabel from "modules/common/components/form/Label";
import { __, Alert } from "modules/common/utils";
import { CardInputColumn, Input } from "modules/orders/styles";
import { IOrder, IPaymentInput } from "modules/orders/types";

type Props = {
  color?: string;
  billType: string;
  addPayment: (params: IPaymentInput, callback?: () => void) => void;
  order: IOrder;
  maxAmount: number | undefined;
  cardAmount: number;
  setAmount: (amount) => void;
};

type State = {
  sentTransaction: boolean;
  checkedTransaction: boolean;
};

export default class CardInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sentTransaction: false,
      checkedTransaction: false,
    };
  }

  render() {
    const {
      color = "",
      addPayment,
      order,
      maxAmount = 0,
      setAmount,
      cardAmount,
      // billType,
    } = this.props;

    const { _id } = order;

    if (!_id) {
      return null;
    }

    const inputProps: any = {
      allowNegative: false,
      thousandSeparator: true,
      prefix: "₮",
      inputMode: "numeric",
    };

    const handleInput = (value: number | undefined = 0) => {
      // do not accept amount greater than payable amount
      const val = Number((value > maxAmount ? maxAmount : value).toFixed(2));

      setAmount(val);
    };

    const resetInput = () => {
      setAmount(0);
    };

    // const PATH = "http://localhost:27028";
    const PATH = "https://test-pos.erxes.io/";

    const sendTransaction = async () => {
      // fetch(`${PATH}/ajax/get-status-info`)
      fetch(`${PATH}`)
        // .then((res) => res.json())
        .then((res: any) => {
          // TODO remove code, fake data
          res = {
            status_code: 'ok'
          };

          if (res && res.status_code === "ok") {
            // send transaction upon successful connection
            fetch(PATH, {
              // method: "POST",
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              // body: JSON.stringify({
              //   service_name: "doSaleTransaction",
              //   service_params: {
              //     // special character _ is not accepted
              //     db_ref_no: number.replace("_", ""),
              //     amount: cardAmount.toString(),
              //     vatps_bill_type: billType,
              //   },
              // }),
            })
              // .then((res) => res.json())
              // .then((r) => {
              .then(res => {
                // TODO remove code, fake data
                const r = {
                  status: true,
                  response: {
                    response_code: '000',
                    aid: 'A0000000031010',
                    amount: cardAmount,
                    app_name: 'VISA DEBIT',
                    auth_code: '1TS93C',
                    bank_mb_code: '05',
                    batch_no: '000000000231',
                    card_holder_name: '',
                    date: '02/27',
                    db_ref_no: '202202270001',
                    entry_mode: 'Contact Less TAP',
                    is_vatps: '0',
                    merchant_name: 'Yoshinoya',
                    model: 's300',
                    operation: 'SALE',
                    pan: '438054XXXXXX2643',
                    pos_firmware: '2.4.94',
                    reader_id: '53240799',
                    response_msg: 'Гүйлгээ зөвшөөрөгдсөн.',
                    rrn: '003841002333',
                    tc: '0000000000000000',
                    term_app_name: 'DtbProlin',
                    terminal_date: '20220227112935',
                    terminal_id: '70078754',
                    time: '11:29:32',
                    trace_no: '020735',
                    version: '334'
                  }
                };

                if (r && r.status === true && r.response) {
                  if (r.response.response_code === "000") {
                    Alert.success(
                      __(
                        r.response.response_msg || "Transaction was successful"
                      )
                    );

                    addPayment({ _id, cardInfo: r.response, cardAmount });
                  } else {
                    return Alert.warning(r.response.response_msg);
                  }
                }
              })
              .catch((e) => {
                Alert.error(e.message);
              });
          }
        })
        .catch((e) => {
          Alert.error(
            `${e.message}: Databank-н төлбөрийн програмтай холбогдсонгүй`
          );
        });
    };

    return (
      <>
        <CardInputColumn>
          <FormGroup>
            <ControlLabel>{__("By Card")}</ControlLabel>
            <Input color={color}>
              <NumberFormat
                name="cardAmount"
                value={cardAmount || 0}
                onValueChange={(values) => handleInput(values.floatValue)}
                {...inputProps}
              />
              <div onClick={resetInput}>
                <Icon icon="cancel" size={13} />
              </div>
            </Input>
          </FormGroup>
          {cardAmount ? (
            <Button
              size="small"
              btnStyle="warning"
              onClick={sendTransaction}
              block={true}
            >
              {__("Send transaction")}
            </Button>
          ) : null}
        </CardInputColumn>
      </>
    );
  } // end render()
}
