import React from 'react';
import PaymentType, { PAYMENT_METHODS } from './PaymentType';
import { IPaymentParams } from 'modules/orders/containers/PosContainer';
import QPay from './QPay';
import { IOrder } from 'modules/orders/types';
import apolloClient from 'apolloClient';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import { queries } from 'modules/orders/graphql/index';
import { Amount, FormHead } from 'modules/orders/styles';
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
import { Card, Cards, TypeWrapper } from './style';

const PaymentWrapper = styledTS<{ isPortrait?: boolean }>(styled.div)`
  margin:  ${props => (props.isPortrait ? '30px 20px 20px;' : '10px 0')};
  text-align: center;

  button {
    padding: ${props => (props.isPortrait ? '20px 30px' : '10px 20px')};
    border-radius: 8px;
    font-size: ${props => props.isPortrait && '32px'};
    width: 50%;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 40px;
`;

const Header = styledTS<{ isPortrait?: boolean }>(styled.div)`
  margin: ${props => (props.isPortrait ? '0px 20px 20px;' : '30px 80px 20px;')};
  @media (max-width: 1600px) and (orientation: landscape) {
    margin: 0px 20px 0px;
  }
`;

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
      <Ebarimt
        billType={billType}
        isPortrait={isPortrait}
        show={showE}
        onBillTypeChange={onBillTypeChange}
        onStateChange={onStateChange}
      />
    );
  }

  //render Amount
  renderAmount() {
    const { options, orientation, order } = this.props;
    const isPortrait = orientation === 'portrait';

    return (
      <FormHead isPortrait={isPortrait}>
        <Amount isPortrait={isPortrait} color={options.colors.primary}>
          <div className="total-wrapper">
            {__('Total')}
            <span>{formatNumber(order.items.length || 0)}ш</span>
          </div>
          <div className="amount-wrapper">
            {__('Amount to pay')}
            <span> {formatNumber(order.totalAmount || 0)}₮</span>
          </div>
        </Amount>
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
            'Та баруун гар талд байгаа карт уншигчид картаа зааврын  дагуу хийнэ төлбөрөө хийнэ үү. '
          )}
        </h2>

        <Cards isPortrait={isPortrait}>
          <Card isPortrait={isPortrait}>
            <div>
              <img src="/images/card-reader.png" alt="card-reader" />
            </div>
          </Card>
        </Cards>
      </TypeWrapper>
    );
  }

  renderPopUpType() {
    const { paymentEnabled } = this.state;

    if (paymentEnabled) {
      return this.renderPaymentPopUp();
    }

    return (
      <>
        {this.renderPayment()}
        {this.renderEbarimt()}
      </>
    );
  }

  render() {
    const {
      title,
      order,
      isPayment,
      options,
      setCardPaymentInfo,
      orderId,
      orientation
    } = this.props;

    const {
      showE,
      billType,
      registerNumber = '',
      paymentEnabled,
      cardAmount = 0,
      paymentType
    } = this.state;

    const onChangeReg = e => {
      const value = (e.target as HTMLInputElement).value;

      this.setState({ registerNumber: value });
    };

    const onStateChange = (key: string, value: any) => {
      this.setState({ [key]: value } as Pick<State, keyof State>);
    };

    const isPortrait = orientation === 'portrait';

    if (!orderId) {
      return null;
    }

    if (paymentType === PAYMENT_METHODS.QPAY) {
      return <QPay order={order} handlePayment={this.handlePayment} />;
    }

    return (
      <>
        {this.renderPopUpType()}
        {title && <Title>{__(title)}</Title>}
        <Header isPortrait={isPortrait}>
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
            <CardForm
              onStateChange={onStateChange}
              cardAmount={cardAmount}
              color={options.colors.primary}
              billType={billType}
              order={order}
              setCardPaymentInfo={setCardPaymentInfo}
            />
            {paymentEnabled && (
              <Button
                style={{ backgroundColor: options.colors.primary }}
                icon="check-circle"
                block
                onClick={this.handleSubmit}
              >
                {__('Done')}
              </Button>
            )}
          </FlexCenter>
        </PaymentWrapper>
      </>
    );
  }
}

export default PaymentForm;
