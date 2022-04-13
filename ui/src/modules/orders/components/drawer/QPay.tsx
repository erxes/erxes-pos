import React from 'react';
import QRCode from 'qrcode';
import gql from 'graphql-tag';
import styled from 'styled-components';

import client from 'apolloClient';
import Button from 'modules/common/components/Button';
import TextInfo from 'modules/common/components/TextInfo';
import Label from 'modules/common/components/Label';
import { Alert, __ } from 'modules/common/utils';
import { mutations } from '../../graphql/index';
import { BILL_TYPES } from '../../../../constants';
import { IOrder, IQPayInvoice } from 'modules/orders/types';

const QRCodeWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
  display: contents;
`;

const MainContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ErrorMessage = styled(QRCodeWrapper)`
  color: red;
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 50px;
`;

const LabelWrapper = styled.div`
  span {
    font-size: 14px;
    margin: 15px;
  }
`;

const processErrorMessage = (msg: string) => {
  let info = msg;

  if (msg.includes('senderInvoiceNo duplicated')) {
    info = __('QPay invoice has already been requested');
  }

  return info;
};

type Props = {
  handlePayment: any;
  order: IOrder;
};

type State = {
  errorMessage: string;
  invoice: IQPayInvoice;
};

export default class QPay extends React.Component<Props, State> {
  timeoutId;
  requestCount = 0;

  constructor(props) {
    super(props);

    const { qpayInvoice } = props.order;

    this.state = {
      invoice: qpayInvoice,
      errorMessage: ''
    };
  }

  mode = localStorage.getItem('erxesPosMode');

  renderQrCode() {
    const { invoice } = this.state;

    if (!(invoice && invoice.qrText)) {
      return null;
    }

    const labelStyle = invoice.status === 'PAID' ? 'success' : 'warning';
    const labelText = invoice.status === 'PAID' ? __('Payment made') : __('Payment is not made yet');

    return (
      <React.Fragment>
        <h2>{__('Scan the QR code below with payment app to continue')}</h2>
        <QRCodeWrapper>
          <canvas id="qrcode" />
          <LabelWrapper>
            <Label lblStyle={labelStyle}>{labelText}</Label>
          </LabelWrapper>
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

  checkPayment(isAuto = false) {
    const { order } = this.props;
    const { invoice, errorMessage } = this.state;

    this.requestCount++;

    if (isAuto && this.requestCount > 20) {
      clearTimeout(this.timeoutId);

      return;
    }

    const variables: any = { orderId: order._id };

    if (invoice && !errorMessage) {
      variables._id = invoice._id;
    }

    client
      .mutate({
        mutation: gql(mutations.qpayCheckPayment),
        variables
      })
      .then(({ data }) => {
        const invoice = data.qpayCheckPayment;

        this.setState({ invoice });

        const paid = invoice && invoice.qpayPaymentId && invoice.paymentDate;

        if (paid) {
          clearTimeout(this.timeoutId);
        }
      })
      .catch(e => {
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
      <Button
        btnStyle="warning"
        icon="uparrow-3"
        size="large"
        onClick={() => this.checkPayment()}
      >
        {__('Check payment')}
      </Button>
    );
  }

  setupTimer() {
    this.timeoutId = setTimeout(() => {
      this.checkPayment(true);
    }, 3000);
  }

  renderReceiptButton() {
    const { order } = this.props;
    const { invoice } = this.state;

    if (order.paidDate) {
      return <TextInfo>{__('Payment already made')}</TextInfo>;
    }

    const disabled = !(invoice && invoice.qpayPaymentId && invoice.paymentDate);

    return (
      <Button
        disabled={disabled}
        btnStyle="success"
        icon="check-circle"
        size="large"
        onClick={() => this.makePayment()}
      >
        {__('Print receipt')}
      </Button>
    );
  }

  render() {
    const { errorMessage } = this.state;
    const mode = localStorage.getItem('erxesPosMode');

    return (
      <div>
        {errorMessage ? (
          <ErrorMessage>{processErrorMessage(errorMessage)}</ErrorMessage>
        ) : (
          <MainContent>
            {this.renderQrCode()}
            <ButtonWrapper>
              {!mode && this.renderCheckPaymentButton()}
              {this.renderReceiptButton()}
            </ButtonWrapper>
          </MainContent>
        )}
      </div>
    );
  }

  componentDidMount() {
    const { invoice } = this.state;
    const { order } = this.props;

    if (!invoice && order) {
      client
        .mutate({
          mutation: gql(mutations.createQpaySimpleInvoice),
          variables: { orderId: order._id }
        })
        .then(({ data }) => {
          if (data && data.createQpaySimpleInvoice) {
            this.setState({ invoice: data.createQpaySimpleInvoice });
          }
        })
        .catch(e => {
          this.setState({ errorMessage: e.message });
        });
    } else {
      this.drawQR();

      this.setupTimer();
    }
  }

  componentDidUpdate() {
    this.drawQR();

    this.setupTimer();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }
}
