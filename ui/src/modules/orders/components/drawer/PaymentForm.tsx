import React from "react";
import PaymentType from "./PaymentType";
import CalculationForm from "modules/orders/components/drawer/CalculationForm";
import { IPaymentParams } from "modules/orders/containers/PosContainer";
import QPay from "./QPay";
import { IOrder } from "modules/orders/types";

type Props = {
  orderId: string;
  options: any;
  totalAmount: number;
  closeDrawer: (type: string) => void;
  makePayment: any;
  order: IOrder;
  orientation?: string;
};

type State = {
  showPaymentType: boolean;
  showQpay: boolean;
};

class PaymentForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      showPaymentType: true,
      showQpay: false,
    };
  }

  handlePayment = (params: IPaymentParams) => {
    const { orderId, makePayment } = this.props;

    makePayment(orderId, params);
  };

  render() {
    const { options, orderId, order, orientation } = this.props;
    const isPortrait = orientation === "portrait";

    if (!orderId) {
      return null;
    }

    const togglePaymentType = () => {
      this.setState({
        showPaymentType: !this.state.showPaymentType,
        showQpay: false,
      });
    };

    const toggleQpay = () => {
      this.setState({
        showQpay: !this.state.showQpay,
        showPaymentType: false,
      });
    };

    if (this.state.showPaymentType) {
      return (
        <PaymentType
          color={options.colors.primary}
          togglePaymentType={togglePaymentType}
          toggleQpay={toggleQpay}
          isPortrait={isPortrait}
        />
      );
    }

    if (this.state.showQpay) {
      return <QPay order={order} handlePayment={this.handlePayment} />;
    }

    return (
      <CalculationForm
        {...this.props}
        handlePayment={this.handlePayment}
        isPortrait={isPortrait}
      />
    );
  }
}

export default PaymentForm;
