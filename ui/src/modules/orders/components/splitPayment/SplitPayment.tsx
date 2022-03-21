import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';

import apolloClient from 'apolloClient';
import { queries } from '../../graphql/index';
import { BILL_TYPES } from '../../../../constants';
import { FlexCenter } from 'modules/common/styles/main';
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
import Ebarimt from '../drawer/Ebarimt';
import { Card, Cards, TypeWrapper } from '../drawer/style';
import KeyPads from '../drawer/KeyPads';
import EntityChecker from './EntityChecker';
import OrderInfo from './OrderInfo';
import CashSection from './CashSection';

const DASHED_BORDER = '1px dashed #ddd';

const PaymentWrapper = styled.div`
  background-color: #fff;
  overflow: scroll;
`;

const TabContentWrapper = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-top: ${DASHED_BORDER};
`;

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
  mode: string;
  currentAmount: number;
  remainder: number;
};

export default class SplitPayment extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { order } = this.props;

    const sumCashAmount = order.cashAmount || 0;
    const sumCardAmount = (order.cardPayments || [])
      .reduce((am, c) => am + c.amount, 0);
    const sumMobileAmount = ((order.qpayInvoices || [])
      .filter(q => q.status === 'done') || [])
      .reduce((am, q) => am + Number(q.amount), 0);

    const remainder = order.totalAmount - sumCashAmount - sumCardAmount - sumMobileAmount;

    this.state = {
      billType: BILL_TYPES.CITIZEN,
      currentTab: 'empty',
      order: props.order,
      cashAmount: order.cashAmount || 0,
      registerNumber: '',
      showE: true,
      showRegModal: false,
      companyName: '',
      currentAmount: remainder > 0 ? remainder : 0,
      mode: localStorage.getItem('erxesPosMode') || '',
      remainder
    };

    this.checkOrganization = this.checkOrganization.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
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

  renderEbarimt() {
    const { order } = this.props;
    const { showE, billType, registerNumber } = this.state;

    const onBillTypeChange = (value: string) => {
      const billType = value;

      this.setState({ billType, showRegModal: billType === BILL_TYPES.ENTITY });
    };

    const onStateChange = (key: string, value: any) => {
      this.setState({ [key]: value } as Pick<State, keyof State>);
    };

    const ebarimtBillType = () => {
      if (billType === BILL_TYPES.ENTITY) {
        return (
          <EntityChecker
            onStateChange={onStateChange}
            order={order}
            registerNumber={registerNumber}
            onSubmit={this.checkOrganization}
            onBillTypeChange={onBillTypeChange}
          />
        );
      }

      return (
        <Ebarimt
          billType={billType}
          isPortrait={false}
          show={showE}
          onBillTypeChange={onBillTypeChange}
          onStateChange={onStateChange}
        />
      );
    };

    return <div>{ebarimtBillType()}</div>;
  }

  renderTabContent() {
    const {
      addCardPayment,
      createQPayInvoice,
      checkQPayInvoice,
      cancelQPayInvoice
    } = this.props;
    const { billType, currentTab, order, currentAmount, remainder, cashAmount } = this.state;

    if (currentTab === 'card') {
      return (
        <CardSection
          order={order}
          addCardPayment={addCardPayment}
          billType={billType}
          // amount={remainder - this.state.amount}
          amount={currentAmount || 0}
          remainder={remainder || 0}
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
          amount={currentAmount}
          maxAmount={remainder}
          remainder={remainder || 0}
        />
      );
    }

    if (currentTab === 'cash') {
      return (
        <CashSection
          order={order}
          cashAmount={cashAmount}
          remainder={remainder || 0}
          currentAmount={currentAmount}
          setState={(param) => this.setState({ ...param })}
        />
      )
    }

    return null;
  }

  onChangeKeyPad = num => {
    const { currentAmount } = this.state;

    if (num === 'CE') {
      return this.setState({ currentAmount: 0 });
    }

    if (num === 'C') {
      return this.setState({
        currentAmount: parseFloat(currentAmount.toString().slice(0, -1))
      });
    }

    return this.setState({ currentAmount: currentAmount + num });
  };

  renderPaymentType(type: string, img: string) {
    const { currentTab } = this.state;

    const onClick = value => {
      this.setState({ currentTab: value });
    };

    const currentTypeChange = () => {
      if (currentTab !== type) {
        return <img src={`/images/${img}`} alt={`payment-${type}`} />;
      }

      return this.renderTabContent();
    };

    return (
      <Card
        className={currentTab === type ? 'activeCard' : ''}
        onClick={() => onClick(type)}
        isPortrait={this.props.isPortrait}
      >
        <div>{currentTypeChange()}</div>
      </Card>
    );
  }

  render() {
    const { isPortrait, order } = this.props;
    const { billType, mode, remainder, cashAmount } = this.state;

    return (
      <PaymentWrapper>
        <TypeWrapper isPortrait={isPortrait}>
          <OrderInfo order={order} remainderAmount={remainder} cashAmount={cashAmount} />
          <h4>{__('Choose the payment method')}</h4>

          <Cards isPortrait={isPortrait}>
            {mode !== 'kiosk' && this.renderPaymentType('cash', 'payment2.png')}
            {this.renderPaymentType('card', 'payment4.png')}
            {this.renderPaymentType('qpay', 'payment1.png')}
          </Cards>
        </TypeWrapper>
        {remainder <= 0 && this.renderEbarimt()}
        <TabContentWrapper>
          <FlexCenter>
            <KeyPads
              isPayment={false}
              isPortrait={true}
              onChangeKeyPad={this.onChangeKeyPad}
              billType={billType}
            />
          </FlexCenter>
        </TabContentWrapper>
      </PaymentWrapper>
    );
  } // end render()
}
