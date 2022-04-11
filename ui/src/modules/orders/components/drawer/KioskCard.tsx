import "abortcontroller-polyfill/dist/polyfill-patch-fetch";
import React from "react";

import { __, Alert } from "modules/common/utils";
import { IOrder } from "modules/orders/types";
import { Cards, TypeWrapper } from "./style";

type Props = {
  color?: string;
  onStateChange: (key: string, value: any) => void;
  billType: string;
  addOrderPayment: (params: any) => void;
  order: IOrder;
  orientation?: string;
};

type State = { sentTransaction: boolean };

export default class CardForm extends React.Component<Props, State> {
  timeoutId;
  requestCount = 0;

  constructor(props: Props) {
    super(props);

    this.state = {
      sentTransaction: false,
    };
  }

  setupTimer() {
    this.timeoutId = setTimeout(() => {
      this.sendTransaction(true);
    }, 3000);
  }

  sendTransaction(isAuto = false) {
    const { order, addOrderPayment, onStateChange } = this.props;
    // const PATH = "http://localhost:27028";
    // const PATH = "http://localhost:7000";
    const PATH = "https://test-pos.erxes.io";

    this.requestCount++;

    if ((isAuto && this.requestCount > 20) || (order.totalAmount === order.cardAmount)) {
      clearTimeout(this.timeoutId);

      return;
    }

    fetch(`${PATH}`)
      // .then(res => res.json())
      .then((res: any) => {
        // TODO remove code, fake data
        res = {
          status_code: "ok",
        };

        if (res && res.status_code === "ok") {
          // send transaction upon successful connection
          fetch(PATH, {
            method: "GET",
            // method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            // body: JSON.stringify({
            //   service_name: 'doSaleTransaction',
            //   service_params: {
            //     // special character _ is not accepted
            //     db_ref_no: order.number.replace('_', ''),
            //     amount: cardAmount.toString(),
            //     vatps_bill_type: billType
            //   }
            // })
          })
            // .then(res => res.json())
            // .then(r => {
            .then((res) => {
              // TODO remove code, fake data
              const r = {
                status: true,
                response: {
                  response_code: "000",
                  aid: "A0000000031010",
                  amount: order.totalAmount,
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
                },
              };

              if (r && r.status === true && r.response) {
                if (r.response.response_code === "000") {
                  Alert.success(
                    __(
                      r.response.response_msg || "Transaction was successful"
                    )
                  );

                  addOrderPayment({
                    _id: order._id,
                    cardInfo: r.response,
                    cardAmount: order.totalAmount,
                  });

                  onStateChange('isDone', true);
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
  }

  render() {
    const { orientation } = this.props;
    const isPortrait = orientation === 'portrait';

    return (
      <>
        <TypeWrapper isPortrait={isPortrait}>
          <h2>
            {__("Please follow the instructions on the card reader to make payment")}
          </h2>
          <Cards isPortrait={isPortrait}>
            <div>
              <img src="/images/payment-success.gif" alt="card-reader" />
            </div>
          </Cards>
        </TypeWrapper>
      </>
    );
  } // end render()

  componentDidMount() {
    this.setupTimer();
  }

  componentDidUpdate() {
    this.setupTimer();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }
}
