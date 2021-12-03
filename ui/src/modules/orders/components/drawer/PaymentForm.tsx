import React from "react";
import PaymentType from "./PaymentType";
import CalculationForm from "modules/orders/components/drawer/CalculationForm";
import { IPaymentParams } from "modules/orders/containers/PosContainer";

type Props = {
  orderId: string;
  options: any;
  totalAmount: number;
  closeDrawer: any;
  makePayment: any;
};

type State = {
  showPaymentType: boolean;
};

class PaymentForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      showPaymentType: false,
    };
  }

  handlePayment = (params: IPaymentParams) => {
    const { orderId, makePayment } = this.props;

    makePayment(orderId, params);
  };

  render() {
    const { options, orderId } = this.props;

    if (!orderId) {
      return null;
    }

    if (this.state.showPaymentType) {
      return <PaymentType color={options.colors.primary} />;
    }

    return <CalculationForm {...this.props} handlePayment={this.handlePayment} />;
  }
}

export default PaymentForm;
