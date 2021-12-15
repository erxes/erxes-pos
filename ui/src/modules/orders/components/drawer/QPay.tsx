import React from 'react';
import QRCode from 'qrcode';
import gql from 'graphql-tag';
import styled from "styled-components";

import client from 'apolloClient';
import Button from "modules/common/components/Button";
import TextInfo from 'modules/common/components/TextInfo';
import Label from 'modules/common/components/Label';
import { Alert, __ } from 'modules/common/utils';
import { mutations } from '../../graphql/index';
import { BILL_TYPES } from './CalculationForm';
import { IOrder, IQPayInvoice } from 'modules/orders/types';

const QRCodeWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ErrorMessage = styled(QRCodeWrapper)`
  color: red;
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
  errorMessage: string;
  invoice: IQPayInvoice;
}

export default class QPay extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const { qpayInvoice } = props.order;

    this.state = {
      invoice: qpayInvoice,
      errorMessage: ''
    };
  }

  renderQrCode() {
    const { invoice } = this.state;

    if (!(invoice && invoice.qrText)) {
      return null;
    }

    const labelStyle = invoice.status === 'PAID' ? 'success' : 'warning';

    return (
      <React.Fragment>
        <h4>{__("Scan the QR code below with payment app to continue")}</h4>
        <QRCodeWrapper>
          <canvas id="qrcode" />
          <Label lblStyle={labelStyle}>{invoice.status}</Label>
        </QRCodeWrapper>
      </React.Fragment>
    );
  }

  makePayment() {
    const { handlePayment, order } = this.props;
    const { invoice } = this.state;

    const { status = '', qpayPaymentId = '', paymentDate } = invoice;

    if (status === 'PAID' && qpayPaymentId && paymentDate) {
      handlePayment({
        mobileAmount: order.totalAmount,
        billType: BILL_TYPES.CITIZEN
      });
    }
  }

  checkPayment() {
    const { order } = this.props;

    client.mutate({
      mutation: gql(mutations.qpayCheckPayment), variables: { orderId: order._id }
    }).then(({ data }) => {
      this.setState({ invoice: data.qpayCheckPayment });
    }).catch(e => {
      Alert.error(e.message);
    });
  }

  drawQR() {
    const { invoice } = this.state;
    const canvas = document.getElementById('qrcode');

    if (canvas && invoice && invoice.qrText) {
      QRCode.toCanvas(canvas, invoice.qrText);
    }
  }

  renderCheckPaymentButton() {
    return (
      <Button btnStyle="warning" icon="uparrow-3" onClick={() => this.checkPayment()}>
        {__("Check payment")}
      </Button>
    );
  }

  renderReceiptButton() {
    const { order } = this.props;
    const { invoice } = this.state;

    if (order.paidDate) {
      return <TextInfo>{__("Payment already made")}</TextInfo>;
    }

    const disabled = !(invoice && invoice.qpayPaymentId && invoice.paymentDate);

    return (
      <Button
        disabled={disabled}
        btnStyle="success"
        icon="check-circle"
        onClick={() => this.makePayment()}
      >
        {__("Print receipt")}
      </Button>
    )
  }

  render() {
    const { errorMessage } = this.state;

    return (
      <div>
        {
          errorMessage ? (<ErrorMessage>{processErrorMessage(errorMessage)}</ErrorMessage>) : (
            <React.Fragment>
              {this.renderQrCode()}
              <ButtonWrapper>
                {this.renderCheckPaymentButton()}
                {this.renderReceiptButton()}
              </ButtonWrapper>
            </React.Fragment>
          )}
      </div>
    );
  }

  componentDidMount() {
    const { invoice } = this.state;
    const { order } = this.props;

    if (!invoice.qrText && order && !order.qpayInvoice) {
      client.mutate({ mutation: gql(mutations.createQpaySimpleInvoice), variables: { orderId: order._id } }).then(({ data }) => {
        if (data && data.createQpaySimpleInvoice) {
          this.setState({ invoice: data.createQpaySimpleInvoice });
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
