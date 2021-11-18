import React from 'react';

type Props = {
  print: () => void;
  ebarimt: any;
};

export default class Footer extends React.Component<Props> {
  renderField(text, data) {
    if (text && data) {
      return (
        <p>
          <label>{text}:</label> {data}
        </p>
      );
    }
    return null;
  }

  render() {
    const { ebarimt, print } = this.props;
    // const {
    //   phone,
    //   email,
    //   address,
    //   receiptText,
    // } = this.context.company.configGeneral;

    return (
      <div>
        {ebarimt.lottery ? (
          <div className="lottery">Сугалаа: {ebarimt.lottery}</div>
        ) : null}
        {ebarimt.qrData ? (
          <div>
            <div className="qrcode">
              <canvas id="qrcode" />
            </div>
            <div className="info">
              {/* {this.renderField('Утас', phone)} */}
              {/* {this.renderField('Имэйл', email)} */}
              {/* {this.renderField('Хаяг', address)} */}
              {/* {receiptText ? (
                <div className="text-center total">
                  <p>{receiptText}</p>
                </div>
              ) : null} */}
            </div>
          </div>
        ) : null}
        {ebarimt.billId ? (
          <div className="text-center">
            <img id="barcode" width="90%" alt="qr-code" />
          </div>
        ) : null}
        <p className="signature">
          <label>Гарын үсэг:</label>
          <span>_____________________</span>
        </p>
        <div className="text-center">
          <button className="btn btn-primary btn-print" onClick={print}>
            Хэвлэх
          </button>
        </div>
      </div>
    );
  }
}