import React from "react";
import Button from "modules/common/components/Button";
import CalculationForm from "modules/orders/components/drawer/CalculationForm";

type Props = {
  options: any;
  closeDrawer: any;
};

class FindCustomer extends React.Component<Props> {
  onSuccess = () => {
    console.log("Do smth");
  };

  render() {
    const { options, closeDrawer } = this.props;

    return (
      <CalculationForm
        options={options}
        closeDrawer={closeDrawer}
        title="Phone number"
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

export default FindCustomer;
