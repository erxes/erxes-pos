import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import gql from 'graphql-tag';

import apolloClient from 'apolloClient';
import { queries } from '../../graphql/index';
import { BILL_TYPES, POS_MODES } from '../../../../constants';
import { FlexBetween } from 'modules/common/styles/main';
import Button from 'modules/common/components/Button';
import { __, Alert } from 'modules/common/utils';
import {
  IOrder,
  ICardPayment,
  IInvoiceParams,
  IInvoiceCheckParams,
  IPaymentParams
} from 'modules/orders/types';
import CardSection from './cardPayment/CardSection';
import QPaySection from './qpayPayment/QPaySection';
import KeypadWithInput from './KeypadWithInput';
import Ebarimt from '../drawer/Ebarimt';
import EntityChecker from './EntityChecker';
import { Card, Cards, TypeWrapper } from '../drawer/style';
// import PaymentTypeChooser from './PaymentTypeChooser';

const DASHED_BORDER = '1px dashed #ddd';

const PaymentWrapper = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  overflow: scroll;
`;

const TabContentWrapper = styled.div`
  padding: 20px;
  border-top: ${DASHED_BORDER};
  border-bottom: ${DASHED_BORDER};
`;

const FooterButtons = styled.div`
  padding-top: 20px;
  border-top: ${DASHED_BORDER};
`;

const POS_MODE = localStorage.getItem('erxesPosMode') || '';

type Props = {
  order: IOrder;
  addCardPayment: (params: ICardPayment) => void;
  createQPayInvoice: (params: IInvoiceParams) => void;
  checkQPayInvoice: (params: IInvoiceCheckParams) => void;
  cancelQPayInvoice: (id: string) => void;
  makePayment: (_id: string, params: IPaymentParams) => void;
  isPortrait?: boolean;
};

type State = {
  billType: string;
  currentTab: string;
  order: IOrder;
  cashAmount: number;
  registerNumber: string;
  showE: boolean;
  showRegModal: boolean;
  companyName: string;
};

export default class SplitPayment extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      billType: BILL_TYPES.CITIZEN,
      currentTab: 'empty',
      order: props.order,
      cashAmount: 0,
      registerNumber: '',
      showE: true,
      showRegModal: false,
      companyName: ''
    };

    this.checkOrganization = this.checkOrganization.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
  }

  getRemainderAmount() {
    const { order } = this.props;
    console.log('props order', order);

    return order
      ? order.totalAmount -
          ((order.cardAmount || 0) +
            (order.cashAmount || 0) +
            (order.mobileAmount || 0))
      : 0;
  }

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

          this.setState({ companyName: data.ordersCheckCompany.name });
        }
      });
  }

  handlePayment() {
    const { makePayment, order } = this.props;
    const { registerNumber, billType, cashAmount } = this.state;

    makePayment(order._id, { registerNumber, billType, cashAmount });
  }

  renderTabContent() {
    const {
      addCardPayment,
      createQPayInvoice,
      checkQPayInvoice,
      cancelQPayInvoice
    } = this.props;
    const { billType, currentTab, order, cashAmount } = this.state;
    console.log('split order', order);
    console.log('billtyle', billType);
    const remainder = this.getRemainderAmount();

    const setAmount = (am: number | string) => {
      let amount = am;

      if (amount > remainder) {
        amount = remainder;

        Alert.warning('Amount exceeds total amount');
      }

      this.setState({ cashAmount: Number(amount) });
    };

    if (currentTab === 'card') {
      return (
        <CardSection
          order={order}
          addCardPayment={addCardPayment}
          billType={billType}
          maxAmount={remainder - this.state.cashAmount}
        />
      );
    }

    if (currentTab === 'qpay') {
      return (
        <QPaySection
          order={order}
          billType={billType}
          createQPayInvoice={createQPayInvoice}
          checkQPayInvoice={checkQPayInvoice}
          cancelQPayInvoice={cancelQPayInvoice}
          maxAmount={remainder - this.state.cashAmount}
        />
      );
    }

    if (currentTab === 'cash' && POS_MODE !== POS_MODES.KIOSK) {
      return (
        <Row>
          <Col md={4} />
          <Col md={4}>
            <KeypadWithInput
              billType={billType}
              order={order}
              setAmount={setAmount}
              amount={cashAmount}
              inputLabel={__('Amount')}
            />
          </Col>
        </Row>
      );
    }

    return null;
  }

  render() {
    const { isPortrait } = this.props;
    const { currentTab, order, billType, showE, showRegModal, registerNumber } =
      this.state;

    const onClick = (currentTab: string) => {
      this.setState({ currentTab });
    };

    const onStateChange = (key: string, value: any) => {
      this.setState({ [key]: value } as Pick<State, keyof State>);
    };

    const onBillTypeChange = (value: string) => {
      const billType = value;

      this.setState({ billType, showRegModal: billType === BILL_TYPES.ENTITY });
    };

    return (
      <PaymentWrapper>
        <TypeWrapper isPortrait={isPortrait}>
          <h2>{__('Choose the payment method')}</h2>

          <Cards isPortrait={isPortrait}>
            {POS_MODE !== POS_MODES.KIOSK && (
              <Card
                className={currentTab === 'cash' ? 'active' : ''}
                onClick={() => onClick('cash')}
                isPortrait={isPortrait}
              >
                <div>
                  <img src="/images/payment2.png" alt="payment" />
                </div>
              </Card>
            )}
            <Card
              isPortrait={isPortrait}
              className={currentTab === 'card' ? 'active' : ''}
              onClick={() => onClick('card')}
            >
              <div>
                <img src="/images/payment4.png" alt="payment" />
              </div>
            </Card>
            <Card
              isPortrait={isPortrait}
              className={currentTab === 'qpay' ? 'active' : ''}
              onClick={() => onClick('qpay')}
            >
              <div>
                <img src="/images/payment1.png" alt="payment" />
              </div>
            </Card>
          </Cards>
        </TypeWrapper>
        <TabContentWrapper>{this.renderTabContent()}</TabContentWrapper>
        <FlexBetween>
          <div>
            <Ebarimt
              billType={billType}
              isPortrait={false}
              show={showE}
              onBillTypeChange={onBillTypeChange}
              onStateChange={onStateChange}
            />
          </div>
          {/* <OrderInfo
            order={order}
            remainderAmount={this.getRemainderAmount() - cashAmount}
            companyName={companyName}
            registerNumber={registerNumber}
          /> */}
          <EntityChecker
            billType={billType}
            onStateChange={onStateChange}
            order={order}
            showModal={showRegModal}
            registerNumber={registerNumber}
            onSubmit={this.checkOrganization}
          />
          {/* <PaymentTypeChooser
            currentTab={currentTab}
            onStateChange={onStateChange}
          /> */}
        </FlexBetween>
        <FooterButtons>
          <Button
            btnStyle="success"
            onClick={this.handlePayment}
            icon="dollar-alt"
          >
            {__('Pay the bill')}
          </Button>
        </FooterButtons>
      </PaymentWrapper>
    );
  } // end render()
}
