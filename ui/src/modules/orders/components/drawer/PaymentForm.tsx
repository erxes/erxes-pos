import React from 'react';
import PaymentType, { PAYMENT_METHODS } from './PaymentType';
import { IPaymentParams } from 'modules/orders/containers/PosContainer';
import QPay from './QPay';
import { IOrder } from 'modules/orders/types';
import apolloClient from 'apolloClient';
import { queries } from 'modules/orders/graphql/index';
import { FormHead } from 'modules/orders/styles';
import Ebarimt from './Ebarimt';
import { formatNumber } from 'modules/utils';
import RegisterChecker from './RegisterChecker';
import KeyPads from './KeyPads';
import { FlexCenter } from 'modules/common/styles/main';
import Button from 'modules/common/components/Button';
import CardForm from './CardForm';
import { __ } from 'modules/common/utils';
import { Alert } from 'modules/common/utils';
import gql from 'graphql-tag';
import { Cards, TypeWrapper } from './style';
import { Header, KioskAmount, PaymentWrapper, Title } from '../kiosk/style';

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
  isPortrait?: boolean;
  title?: string;
  isPayment?: boolean;
  header?: React.ReactNode;
  extraButton?: React.ReactNode;
  handlePayment: (params: IPaymentParams) => void;
  paymentMethod: string;
};

// НӨАТ-н баримтын төрөл
export const BILL_TYPES = {
  CITIZEN: '1', // иргэнд өгөх баримт
  ENTITY: '3' // байгууллагад өгөх баримт
};

export const PAYMENT_TYPES = {
  CARD: 'cardAmount',
  CASH: 'cashAmount',
  REGISTER: 'registerNumber'
};

type State = {
  showE: boolean;
  activeInput: string;
  paymentEnabled: boolean;
  paymentType: string;
} & IPaymentParams;

class PaymentForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const { paymentMethod, order } = props;

    this.state = {
      paymentType: 'card',
      showE: true,
      activeInput:
        paymentMethod === PAYMENT_METHODS.CARD
          ? PAYMENT_TYPES.CARD
          : PAYMENT_TYPES.CASH,
      // payment doc
      registerNumber: '',
      billType: BILL_TYPES.CITIZEN,
      cashAmount:
        paymentMethod === PAYMENT_METHODS.CASH ? order.totalAmount : 0,
      cardAmount:
        paymentMethod === PAYMENT_METHODS.CARD ? order.totalAmount : 0,
      paymentEnabled: paymentMethod === PAYMENT_METHODS.CASH ? true : false
    };
  }

  handlePayment = (params: IPaymentParams) => {
    const { orderId, makePayment } = this.props;

    makePayment(orderId, params);
  };

  onChangeKeyPad = num => {
    const { activeInput } = this.state;
    const val = this.state[activeInput];

    if (num === 'CE') {
      return this.setState({ [activeInput]: 0 } as any);
    }

    return this.setState({
      [activeInput]: val + num
    } as any);
  };

  reset = (key: string) => {
    this.setState({ [key]: key === 'registerNumber' ? '' : 0 } as any);
  };

  handleSubmit = () => {
    const { order } = this.props;
    const { registerNumber, billType, cardAmount, cashAmount = 0 } = this.state;

    this.props.handlePayment({
      registerNumber,
      cardAmount,
      cashAmount:
        cashAmount > order.totalAmount ? order.totalAmount : cashAmount,
      billType
    });
  };

  checkOrganization() {
    apolloClient
      .query({
        query: gql(queries.ordersCheckCompany),
        variables: { registerNumber: this.state.registerNumber }
      })
      .then(({ data, errors }) => {
        if (errors) {
          Alert.error(errors.toString());
        }

        if (data && data.ordersCheckCompany) {
          Alert.success(data.ordersCheckCompany.name);
        }
      });
  }

  focusOnRegisterInput = () => {
    this.setState({ activeInput: PAYMENT_TYPES.REGISTER });
  };

  //render PaymentType
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

  //render Ebarimt
  renderEbarimt() {
    const { showE, billType } = this.state;
    const { isPortrait, paymentMethod } = this.props;

    const onBillTypeChange = value => {
      const billType = value;

      this.setState({ billType });

      if (billType === BILL_TYPES.ENTITY) {
        this.focusOnRegisterInput();
      } else {
        this.setState({
          activeInput:
            paymentMethod === PAYMENT_METHODS.CARD
              ? PAYMENT_TYPES.CARD
              : PAYMENT_TYPES.CASH
        });
      }
    };

    const onStateChange = (key: string, value: any) => {
      this.setState({ [key]: value } as Pick<State, keyof State>);
    };

    return (
      <Header>
        <FlexCenter>
          <h2>{__('Obtain a VAT receipt')}</h2>
        </FlexCenter>
        <Ebarimt
          billType={billType}
          isPortrait={isPortrait}
          show={showE}
          onBillTypeChange={onBillTypeChange}
          onStateChange={onStateChange}
        />
      </Header>
    );
  }

  //render Amount
  renderAmount() {
    const { options, orientation, order } = this.props;
    const isPortrait = orientation === 'portrait';

    return (
      <FormHead isPortrait={isPortrait}>
        <h4>{__('Payment info')}</h4>
        <KioskAmount color={options.colors.primary}>
          <div className="total-wrapper">
            {__('Amount to pay')}:
            <span> {formatNumber(order.totalAmount || 0)}₮</span>
          </div>
        </KioskAmount>
      </FormHead>
    );
  }

  //render Kiosk PaymentPopUp2
  renderPaymentPopUp() {
    const { orientation } = this.props;
    const isPortrait = orientation === 'portrait';

    return (
      <TypeWrapper isPortrait={isPortrait}>
        <h2>
          {__(
            'Make the payment you will make according to the card instructions to the card reader on the right hand side'
          )}
        </h2>

        <Cards isPortrait={isPortrait}>
          <div>
            <img src="/images/card-reader.png" alt="card-reader" />
          </div>
        </Cards>
      </TypeWrapper>
    );
  }

  //Final tulbur tulugdsunii daraa
  renderDone() {
    const { orientation, order } = this.props;
    const isPortrait = orientation === 'portrait';

    return (
      <TypeWrapper isPortrait={isPortrait}>
        <h2>{__('Thank you for choosing us')}</h2>

        <Cards isPortrait={isPortrait}>
          <div>
            <img src="/images/thank-you.png" alt="card-reader" />
          </div>
        </Cards>

        <h2>
          {__('Your number')}:
          <b>{order && order.number ? order.number.split('_')[1] : ''}</b>
        </h2>
      </TypeWrapper>
    );
  }

  renderPopUpType() {
    const { paymentEnabled } = this.state;

    if (paymentEnabled) {
      return this.renderPaymentPopUp();
      // return this.renderDone();
    }

    return (
      <>
        {this.renderEbarimt()}
        {this.renderPayment()}
      </>
    );
  }

  renderCardButtons() {
    const { setCardPaymentInfo, options, order } = this.props;
    const { paymentEnabled, cardAmount = 0, billType } = this.state;

    const onStateChange = (key: string, value: any) => {
      this.setState({ [key]: value } as Pick<State, keyof State>);
    };

    if (paymentEnabled) {
      return (
        <Button
          style={{ backgroundColor: options.colors.primary }}
          size="medium"
          icon="check-circle"
          onClick={() => this.handleSubmit}
        >
          {__('Waiting for payment')}
        </Button>
      );
    }

    return (
      <CardForm
        onStateChange={onStateChange}
        cardAmount={cardAmount}
        color={options.colors.primary}
        billType={billType}
        order={order}
        setCardPaymentInfo={setCardPaymentInfo}
      />
    );
  }

  render() {
    const {
      title,
      order,
      isPayment,
      options,
      orderId,
      orientation,
      totalAmount
    } = this.props;

    const { showE, billType, registerNumber = '', paymentType } = this.state;

    const onChangeReg = e => {
      const value = (e.target as HTMLInputElement).value;

      this.setState({ registerNumber: value });
    };

    const isPortrait = orientation === 'portrait';

    if (!orderId) {
      return null;
    }

    if (paymentType === PAYMENT_METHODS.QPAY) {
      return <QPay order={order} handlePayment={this.handlePayment} />;
    }

    if (totalAmount === 0) {
      return <>{this.renderDone()}</>;
    }

    return (
      <>
        {this.renderPopUpType()}
        {title && <Title>{__(title)}</Title>}
        <Header>
          {this.renderAmount()}
          <RegisterChecker
            billType={billType}
            show={showE}
            registerNumber={registerNumber}
            checkOrganization={this.checkOrganization.bind(this)}
            reset={this.reset}
            color={options.colors.primary}
            isPortrait={isPortrait}
            onChange={onChangeReg}
            focusOnKeypads={this.focusOnRegisterInput}
          />
        </Header>
        <PaymentWrapper isPortrait={isPortrait}>
          <KeyPads
            isPayment={isPayment}
            isPortrait={isPortrait}
            onChangeKeyPad={this.onChangeKeyPad}
            billType={billType}
          />
          <FlexCenter>
            <Button
              btnStyle="simple"
              icon="arrow-left"
              onClick={() => this.props.closeDrawer('payment')}
            >
              {__('Cancel')}
            </Button>
            {this.renderCardButtons()}
          </FlexCenter>
        </PaymentWrapper>
      </>
    );
  }
}

export default PaymentForm;
