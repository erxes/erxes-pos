import React from "react";

import PaymentType, { PAYMENT_METHODS } from "./PaymentType";
import CalculationForm from "modules/orders/components/drawer/CalculationForm";
import QPay from "./QPay";
import { IOrder, IPaymentParams } from "modules/orders/types";

type Props = {
  orderId: string;
  options: any;
  totalAmount: number;
  closeDrawer: (type: string) => void;
  makePayment: any;
  order: IOrder;
  orientation?: string;
  setCardPaymentInfo: (params: any) => void;
  isSplit?: boolean;
};

type State = {
  paymentType: string;
};

class PaymentForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = { paymentType: '' };
  }

  handlePayment = (params: IPaymentParams) => {
    const { orderId, makePayment } = this.props;

    makePayment(orderId, params);
  };

  render() {
    const { paymentType } = this.state;
    const { options, orderId, order, orientation, setCardPaymentInfo, isSplit } = this.props;
    const isPortrait = orientation === "portrait";

    if (!orderId) {
      return null;
    }

    const togglePaymentType = (paymentType: string) => {
      this.setState({ paymentType });
    };

    if (!paymentType && !isSplit) {
      return (
        <PaymentType
          color={options.colors.primary}
          togglePaymentType={togglePaymentType}
          isPortrait={isPortrait}
        />
      );
    }

    if (paymentType === PAYMENT_METHODS.QPAY && !isSplit) {
      return <QPay order={order} handlePayment={this.handlePayment} />;
    }

    return (
      <CalculationForm
        {...this.props}
        handlePayment={this.handlePayment}
        isPortrait={isPortrait}
        paymentMethod={paymentType}
        setCardPaymentInfo={setCardPaymentInfo}
      />
    );
  }
}

export default PaymentForm;
