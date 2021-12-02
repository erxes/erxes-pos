import React from "react";
import PaymentType from "./PaymentType";
import CalculationForm from "modules/orders/components/drawer/CalculationForm";

type Props = {
  options: any;
  totalAmount: number;
  closeDrawer: any;
  makePayment: any;
  setOrderState: (name: string, value: any) => void;
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

  onSuccess = () => {
    console.log("Do smth");
    this.props.makePayment();
  };

  render() {
    const { options } = this.props;

    if (this.state.showPaymentType) {
      return <PaymentType color={options.colors.primary} />;
    }

    return <CalculationForm {...this.props} onSuccess={this.onSuccess} />;
  }
}

export default PaymentForm;
