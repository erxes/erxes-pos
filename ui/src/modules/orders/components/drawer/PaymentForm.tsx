import React from "react";
import { __ } from "modules/common/utils";
import PaymentType from "./PaymentType";
import CalculationForm from "modules/orders/components/drawer/CalculationForm";

type Props = {
  options: any;
  totalAmount: number;
  closeDrawer: any;
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
    this.setState({ showPaymentType: !this.state.showPaymentType });
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
