import React from "react";
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import { FooterWrapper } from "./styles";
import Button from "modules/common/components/Button";
import { IOrder } from "modules/orders/types";

type Props = {
  print: () => void;
  ebarimt: any;
  color: string;
  order: IOrder;
};

export default class Footer extends React.Component<Props> {
  private putResponse;

  constructor(props: Props) {
    super(props);

    const { putResponses = [] } = props.order;

    // comes in descending order by createdAt
    this.putResponse = putResponses[0];
  }

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

  renderQrAndBarCode() {
    if (!this.putResponse) {
      return null;
    }

    return (
      <React.Fragment>
        {this.putResponse.qrData ? (
          <div className="qrcode-wrapper">
            <canvas id="qrcode" />
          </div>
        ) : null}
        {this.putResponse.billId ? (<canvas id="bar-code" />) : null}
      </React.Fragment>
    );
  }

  renderLotteryCode() {
    if (!this.putResponse) {
      return null;
    }

    return (
      this.putResponse.lottery ? (
        <div className="lottery">Сугалаа: {this.putResponse.lottery}</div>
      ) : null
    )
  }

  render() {
    const { ebarimt, print, color } = this.props;
    // const {
    //   phone,
    //   email,
    //   address,
    //   receiptText,
    // } = this.context.company.configGeneral;

    return (
      <FooterWrapper>
        <p id="error-message" className='error-message'></p>
        {this.renderLotteryCode()}
        {ebarimt.qrData ? (
          <div>
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
        {this.renderQrAndBarCode()}
        <p className="signature">
          <label>Гарын үсэг:</label>
          <span>_____________________</span>
        </p>
        <div className="text-center">
          <Button onClick={print} style={{ backgroundColor: color }}>
            Хэвлэх
          </Button>
        </div>
      </FooterWrapper>
    );
  }

  componentDidMount() {
    if (this.putResponse) {
      const { errorCode, lotteryWarningMsg, qrData, success, message, billId } = this.putResponse;
      const errorMessage = document.getElementById('error-message');
      const barCode = document.getElementById('bar-code');

      if (errorMessage) {
        if (errorCode && message) {
          errorMessage.innerHTML = `${errorCode}: ${message}`;
        }
        if (lotteryWarningMsg) {
          errorMessage.innerHTML = lotteryWarningMsg;
        }
      }

      if (success === 'true') {
        // draw qr code
        if (qrData) {
          const canvas = document.getElementById('qrcode');

          QRCode.toCanvas(canvas, qrData);
        }

        // draw bar code
        if (barCode && billId) {
          JsBarcode('#bar-code', billId, {
            width: 2,
            height: 30,
            fontSize: 24,
            displayValue: true,
            marginBottom: 30
          });
        }
      } // end qrcode
    }
  } // end componentDidMount
}
