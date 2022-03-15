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
import KeypadWithInput from './KeypadWithInput';
import Ebarimt from '../drawer/Ebarimt';
import { Card, Cards, TypeWrapper } from '../drawer/style';
import KeyPads from '../drawer/KeyPads';
import EntityChecker from './EntityChecker';
import { FooterContent } from 'modules/orders/styles';

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
  maxAmount?: number;
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
  amount: number;
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
      companyName: '',
      amount: props.maxAmount || 0
    };

    this.checkOrganization = this.checkOrganization.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
  }

  getRemainderAmount() {
    const { order } = this.props;

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
            billType={billType}
            onStateChange={onStateChange}
            order={order}
            registerNumber={registerNumber}
            onSubmit={this.checkOrganization}
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
    const { billType, currentTab, order, amount } = this.state;
    const remainder = this.getRemainderAmount();

    const setAmount = (am: number | string) => {
      let amount = am;

      if (amount > remainder) {
        amount = remainder;

        Alert.warning('Amount exceeds total amount');
      }

      this.setState({ amount: Number(amount) });
    };

    if (currentTab === 'card') {
      return (
        <CardSection
          order={order}
          addCardPayment={addCardPayment}
          billType={billType}
          // amount={remainder - this.state.amount}
          amount={amount || 0}
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
          amount={amount}
          maxAmount={remainder - this.state.amount}
          remainder={remainder || 0}
        />
      );
    }

    if (currentTab === 'cash') {
      return (
        <FlexCenter>
          <KeypadWithInput
            billType={billType}
            order={order}
            setAmount={setAmount}
            amount={amount}
            inputLabel={__('In Cash')}
          />
        </FlexCenter>
      );
    }

    return null;
  }

  onChangeKeyPad = num => {
    const { amount } = this.state;

    if (num === 'CE') {
      return this.setState({ amount: 0 });
    }

    if (num === 'C') {
      return this.setState({
        amount: parseFloat(amount.toString().slice(0, -1))
      });
    }

    return this.setState({ amount: amount + num });
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
    const { isPortrait } = this.props;
    const { billType } = this.state;

    return (
      <PaymentWrapper>
        <TypeWrapper isPortrait={isPortrait}>
          <h2>{__('Choose the payment method')}</h2>
          <h4>{__('Customers can pay your paymnet in share')}</h4>

          <Cards isPortrait={isPortrait}>
            {this.renderPaymentType('cash', 'payment2.png')}
            {this.renderPaymentType('card', 'payment4.png')}
            {this.renderPaymentType('qpay', 'payment1.png')}
          </Cards>
        </TypeWrapper>
        <FooterContent>{this.renderEbarimt()}</FooterContent>
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
