import React from 'react';
import QRCode from 'qrcode';

import Label from 'modules/common/components/Label';
import { IQPayInvoice } from 'modules/qpay/types';

type Props = {
  item: IQPayInvoice
}

export default class CardRow extends React.Component<Props> {
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
