import React from "react";
import FormControl from "modules/common/components/form/Control";
import Button from "modules/common/components/Button";
import CalculationForm from "modules/common/components/CalculationForm";
import { __ } from "modules/common/utils";
import PaymentType from "./PaymentType";

type Props = {
  options: any;
  totalAmount: number;
  closeDrawer: any;
};

type State = {
  type: string;
  showPaymentType: boolean;
};

class PaymentForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      type: "person",
      showPaymentType: false,
    };
  }

  onChange = (e) => {
    const type = (e.target as HTMLInputElement).value;

    this.setState({ type });
  };

  onSuccess = () => {
    console.log("Do smth");
    this.setState({ showPaymentType: !this.state.showPaymentType });
  };

  render() {
    const { options } = this.props;
    const { showPaymentType, type } = this.state;

    const formHead = (
      <>
        <FormControl
          componentClass="radio"
          value="person"
          inline={true}
          name="type"
          checked={type === "person"}
          onChange={this.onChange}
        >
          {__("Person")}
        </FormControl>
        <FormControl
          componentClass="radio"
          value="organization"
          inline={true}
          name="type"
          checked={type === "organization"}
          onChange={this.onChange}
        >
          {__("Organization")}
        </FormControl>
      </>
    );

    if (showPaymentType) {
      return <PaymentType color={options.colors.primary} />;
    }

    return (
      <CalculationForm
        {...this.props}
        header={formHead}
        extraButton={
          <Button style={{ backgroundColor: options.colors.primary }}>
            Шалгах
          </Button>
        }
        onSuccess={this.onSuccess}
      />
    );
  }
}

export default PaymentForm;
