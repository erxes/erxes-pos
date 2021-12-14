import React from 'react';
import QRCode from 'qrcode';
import gql from 'graphql-tag';
import styled from "styled-components";

import client from 'apolloClient';
import Button from "modules/common/components/Button";
import { Alert, __ } from 'modules/common/utils';
import { mutations, queries } from '../../graphql/index';
import { BILL_TYPES } from './CalculationForm';
import { IOrder } from 'modules/orders/types';

const QRCodeWrapper = styled.div`
  text-align: center;
`;

const ErrorMessage = styled(QRCodeWrapper)`
  color: red;
  font-weight: bold;
`;

const processErrorMessage = (msg: string) => {
  let info = msg;

  if (msg.includes('senderInvoiceNo duplicated')) {
    info = __('QPay invoice has already been requested');
  }

  return info;
}

type Props = {
  handlePayment: any;
  order: IOrder
}

type State = {
  qrText: string,
  errorMessage: string;
}

export default class QPay extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const { qpayInvoice } = props.order;

    this.state = { qrText: qpayInvoice && qpayInvoice.qrText ? qpayInvoice.qrText : '', errorMessage: '' };
  }

  renderQrCode() {
    if (!this.state.qrText) {
      return null;
    }

    return (
      <QRCodeWrapper>
        <canvas id="qrcode" />
      </QRCodeWrapper>
    );
  }

  checkInvoice() {
    const { handlePayment, order } = this.props;

    client.query({ query: gql(queries.fetchRemoteInvoice), variables: { orderId: order._id } }).then(({ data }) => {
      if (data && data.fetchRemoteInvoice) {
        const { status = '', qpayPaymentId = '', paymentDate } = data.fetchRemoteInvoice;
        console.log(data.fetchRemoteInvoice, 'vivivivi');

        if (status === 'PAID' && qpayPaymentId && paymentDate) {
          handlePayment({
            mobileAmount: order.totalAmount,
            billType: BILL_TYPES.CITIZEN
          });
        }
      }
    }).catch(e => {
      Alert.error(e);
    });
  }

  drawQR() {
    const canvas = document.getElementById('qrcode');

    if (canvas && this.state.qrText) {
      QRCode.toCanvas(canvas, this.state.qrText);
    }
  }

  render() {
    const { order } = this.props;
    const { errorMessage, qrText } = this.state;

    return (
      <div>
        {
          errorMessage ? (<ErrorMessage>{processErrorMessage(errorMessage)}</ErrorMessage>) : (
            <React.Fragment>
              <h4>{__("Scan the QR code below with payment app to continue")}</h4>
              {this.renderQrCode()}
              {!order.paidDate && qrText && <Button
                btnStyle="success"
                icon="check-circle"
                block
                onClick={() => this.checkInvoice()}
              >
                {__("Print receipt")}
              </Button>}
            </React.Fragment>
          )}
      </div>
    );
  }

  componentDidMount() {
    const { order } = this.props;

    if (!this.state.qrText && order && !order.qpayInvoice) {
      client.mutate({ mutation: gql(mutations.createQpaySimpleInvoice), variables: { orderId: order._id } }).then(({ data }) => {
        if (data && data.createQpaySimpleInvoice) {
          this.setState({
            qrText: data.createQpaySimpleInvoice.qr_text || ''
          });
        }
      }).catch(e => {
        this.setState({ errorMessage: e.message });
      });
    } else {
      this.drawQR();
    }
  } // end componentDidMount()

  componentDidUpdate() {
    this.drawQR();
  }
}
