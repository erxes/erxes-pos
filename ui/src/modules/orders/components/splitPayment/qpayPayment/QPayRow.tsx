import React from 'react';
import QRCode from 'qrcode';
import gql from 'graphql-tag';

import apolloClient from 'apolloClient';
import { __, confirm, Alert } from 'modules/common/utils';
import Button from 'modules/common/components/Button';
import Label from 'modules/common/components/Label';
import { IQPayInvoice } from 'modules/qpay/types';
import { IInvoiceCheckParams } from 'modules/orders/types';
import { mutations } from 'modules/orders/graphql/index';

type Props = {
  item: IQPayInvoice;
  orderId: string;
  checkQPayInvoice: (params: IInvoiceCheckParams) => void;
  cancelQPayInvoice: (id: string) => void;
  toggleModal: () => void;
  setInvoice: (invoice: IQPayInvoice) => void;
  refetchOrder: () => void;
}

export default class QPayRow extends React.Component<Props> {
  timeoutId;
  requestCount = 0;

  drawQR() {
    const { item } = this.props;
    const canvas = document.getElementById(item._id);

    if (canvas && item && item.qrText) {
      // create less than normal size code, default: 4
      QRCode.toCanvas(canvas, item.qrText, { scale: 3 });
    }
  }

  renderQrCode() {
    const { item } = this.props;

    if (!(item && item.qrText)) {
      return null;
    }

    return (<canvas id={item._id} />);
  }

  checkPayment(isAuto = false) {
    const { orderId, setInvoice, item, refetchOrder } = this.props;

    if (item && item.status === 'PAID' && item.qpayPaymentId) {
      return;
    }

    this.requestCount++;

    if (isAuto && this.requestCount > 20) {
      clearTimeout(this.timeoutId);

      return;
    }

    apolloClient
      .mutate({
        mutation: gql(mutations.qpayCheckPayment),
        variables: { orderId, _id: item._id }
      })
      .then(({ data }) => {
        const invoice = data.qpayCheckPayment;

        setInvoice(invoice);

        const paid = invoice && invoice.qpayPaymentId && invoice.paymentDate && invoice.status === 'PAID';

        if (paid) {
          clearTimeout(this.timeoutId);
        }

        refetchOrder();
      })
      .catch(e => {
        Alert.error(e.message);
      });
  }

  setupTimer() {
    this.timeoutId = setTimeout(() => {
      this.checkPayment(true);
    }, 3000);
  }

  render() {
    const { item, checkQPayInvoice, orderId, cancelQPayInvoice, toggleModal } = this.props;

    const labelStyle = item.status === 'PAID' ? 'success' : 'warning';

    const onCheck = () => {
      checkQPayInvoice({ orderId, _id: item._id });
    };

    const onCancel = () => {
      confirm().then(() => {
        cancelQPayInvoice(item._id);
        toggleModal();
      }).catch(e => {
        Alert.error(e.message);
      })
    };

    return (
      <tr key={item._id}>
        <td>{item.amount}</td>
        <td><Label lblStyle={labelStyle}>{item.status}</Label></td>
        <td>
          <div>{item.status !== 'PAID' ? this.renderQrCode() : __('Already paid')}</div>
        </td>
        <td>
          <div>
            {item.status !== 'PAID' && <Button size="small" btnStyle="warning" icon="check-1" onClick={onCheck}>{__('Check')}</Button>}
            <Button size="small" btnStyle="danger" icon="trash-alt" onClick={onCancel}>{__('Cancel1')}</Button>
          </div>
        </td>
      </tr>
    );
  }

  componentDidMount() {
    this.drawQR();

    this.setupTimer();
  }

  componentDidUpdate() {
    this.drawQR();

    this.setupTimer();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }
}
