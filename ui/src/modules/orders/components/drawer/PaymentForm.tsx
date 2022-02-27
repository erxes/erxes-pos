import React from 'react';
import PaymentType, { PAYMENT_METHODS } from './PaymentType';
import CalculationForm from 'modules/orders/components/drawer/CalculationForm';
import { IPaymentParams } from 'modules/orders/containers/PosContainer';
import QPay from './QPay';
import { IOrder } from 'modules/orders/types';

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

    this.state = { paymentType: 'card' };
  }

  handlePayment = (params: IPaymentParams) => {
    const { orderId, makePayment } = this.props;

    makePayment(orderId, params);
  };

  renderPayment() {
    const { options, orientation } = this.props;
    const isPortrait = orientation === 'portrait';

    const togglePaymentType = (paymentType: string) => {
      this.setState({ paymentType });
    };

    return (
      <PaymentType
        color={options.colors.primary}
        togglePaymentType={togglePaymentType}
        isPortrait={isPortrait}
      />
    );
  }

  render() {
    const { paymentType } = this.state;
    const { orderId, order, orientation, setCardPaymentInfo } = this.props;
    const isPortrait = orientation === 'portrait';

    if (!orderId) {
      return null;
    }

    if (paymentType === PAYMENT_METHODS.QPAY) {
      return <QPay order={order} handlePayment={this.handlePayment} />;
    }

    return (
      <>
        {this.renderPayment()}
        <CalculationForm
          {...this.props}
          handlePayment={this.handlePayment}
          isPortrait={isPortrait}
          paymentMethod={paymentType}
          setCardPaymentInfo={setCardPaymentInfo}
        />
      </>
    );
  }
}

export default PaymentForm;
