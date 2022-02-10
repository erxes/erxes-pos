import React from 'react';
import QRCode from 'qrcode';

import { __ } from 'modules/common/utils';
import Label from 'modules/common/components/Label';
import { IQPayInvoice } from 'modules/qpay/types';

type Props = {
  item: IQPayInvoice
}

export default class CardRow extends React.Component<Props> {
  drawQR() {
    const { item } = this.props;
    const canvas = document.getElementById(item._id);

    console.log(canvas, item._id)

    if (canvas && item && item.qrText) {
      QRCode.toCanvas(canvas, item.qrText);
    }
  }

  renderQrCode() {
    const { item } = this.props;

    if (!(item && item.qrText)) {
      return null;
    }

    return (
      <React.Fragment>
        <h4>{__("Scan the QR code below with payment app to continue")}</h4>
        <div>
          <canvas id={item._id} />
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { item } = this.props;

    const labelStyle = item.status === 'PAID' ? 'success' : 'warning';

    return (
      <tr key={item._id}>
        <td>{item.amount}</td>
        <td><Label lblStyle={labelStyle}>{item.status}</Label></td>
        <td>
          <div>{item.status !== 'PAID' ? this.renderQrCode() : 'already paid'}</div>
        </td>
      </tr>
    );
  }

  componentDidMount() {
    this.drawQR();
  }
}
