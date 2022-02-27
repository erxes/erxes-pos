import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import React from 'react';

import Button from "modules/common/components/Button";
import { __, Alert } from "modules/common/utils";
import { IOrder } from 'modules/orders/types';

type Props = {
  cardAmount: number;
  color?: string;
  onStateChange: (key: string, value: any) => void;
  billType: string;
  setCardPaymentInfo: (params: any) => void;
  order: IOrder;
  isSplit?: boolean;
  cashAmount?: number;
}

type State = {
  sentTransaction: boolean;
  checkedTransaction: boolean;
};

export default class CardForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sentTransaction: false,
      checkedTransaction: false
    };
  }

  render() {
    const {
      cardAmount,
      onStateChange,
      billType,
      setCardPaymentInfo,
      order,
    } = this.props;

    const PATH = 'http://localhost:27028';

    const sendTransaction = async () => {
      fetch(`${PATH}/ajax/get-status-info`)
        .then(res => res.json())
        .then((res: any) => {
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
                  db_ref_no: order.number.replace('_', ''),
                  amount: cardAmount.toString(),
                  vatps_bill_type: billType
                }
              })
            })
              .then(res => res.json())
              .then(r => {
                if (r && r.status === true && r.response) {
                  if (r.response.response_code === '000') {
                    Alert.success(
                      __(
                        r.response.response_msg || 'Transaction was successful'
                      )
                    );

                    // enable payment button
                    onStateChange('paymentEnabled', true);

                    setCardPaymentInfo({
                      _id: order._id,
                      info: JSON.stringify(r.response)
                    });
                  } else {
                    return Alert.warning(r.response.response_msg);
                  }
                }
              })
              .catch(e => {
                Alert.error(e.message);
              });
          }
        })
        .catch(e => {
          Alert.error(
            `${e.message}: Databank-н төлбөрийн програмтай холбогдсонгүй`
          );
        });
    };

    return (
      <React.Fragment>
        {cardAmount && (
          <Button btnStyle="success" onClick={sendTransaction} size="large">
            {__('Payment')}
          </Button>
        )}
      </React.Fragment>
    );
  } // end render()
}
