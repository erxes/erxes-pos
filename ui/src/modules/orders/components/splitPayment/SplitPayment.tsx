import React from 'react';
import styled from 'styled-components';
import gql from "graphql-tag";

import apolloClient from "apolloClient";
import { queries } from "../../graphql/index";
import { BILL_TYPES } from '../../../../constants';
import { FlexBetween } from 'modules/common/styles/main';
import { Tabs, TabTitle } from 'modules/common/components/tabs/index';
import { __, Alert } from 'modules/common/utils';
import { IOrder, ICardPayment, IInvoiceParams, IInvoiceCheckParams } from 'modules/orders/types';
import CardSection from './cardPayment/CardSection';
import QPaySection from './qpayPayment/QPaySection';
import OrderInfo from './OrderInfo';
import KeypadWithInput from './KeypadWithInput';
import Ebarimt from '../drawer/Ebarimt';
import EntityChecker from './EntityChecker';

const OrderInfoWrapper = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  overflow: scroll;
`;

const ContentWrapper = styled.div`
  padding: 20px;
  border-top: 1px dashed #ddd;
`;

type Props = {
  order: IOrder;
  addCardPayment: (params: ICardPayment) => void;
  createQPayInvoice: (params: IInvoiceParams) => void;
  checkQPayInvoice: (params: IInvoiceCheckParams) => void;
  cancelQPayInvoice: (id: string) => void;
}

type State = {
  billType: string;
  currentTab: string;
  order: IOrder;
  cashAmount: number;
  registerNumber: string;
  showE: boolean;
  showRegModal: boolean;
  companyName: string;
}

export default class SplitPayment extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      billType: BILL_TYPES.CITIZEN,
      currentTab: 'cash',
      order: props.order,
      cashAmount: 0,
      registerNumber: '',
      showE: true,
      showRegModal: false,
      companyName: ''
    };

    this.checkOrganization = this.checkOrganization.bind(this);
  }

  getRemainderAmount() {
    const { order } = this.props;

    return order.totalAmount - ((order.cardAmount || 0) + (order.cashAmount || 0) + (order.mobileAmount || 0));
  }

  checkOrganization() {
    apolloClient
      .query({
        query: gql(queries.ordersCheckCompany),
        variables: { registerNumber: this.state.registerNumber },
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

  renderTabContent() {
    const { addCardPayment, createQPayInvoice, checkQPayInvoice, cancelQPayInvoice } = this.props;
    const { billType, currentTab, order, cashAmount } = this.state;

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

    if (currentTab === 'cash') {
      return (
        <KeypadWithInput
          billType={billType}
          order={order}
          setAmount={setAmount}
          amount={cashAmount}
          inputLabel={__('Cash amount')}
        />
      );
    }

    return null;
  }

  render() {
    const { currentTab, order, cashAmount, billType, showE, showRegModal, companyName, registerNumber } = this.state;

    const onClick = (currentTab: string) => {
      this.setState({ currentTab });
    };

    const onStateChange = (key: string, value: any) => {
      this.setState({ [key]: value } as Pick<State, keyof State>);
    };

    const onBillTypeChange = (e) => {
      const billType = (e.target as HTMLInputElement).value;

      this.setState({ billType, showRegModal: billType === BILL_TYPES.ENTITY });
    };

    return (
      <OrderInfoWrapper>
        <Tabs full={true}>
          <TabTitle className={currentTab === 'cash' ? 'active' : ''} onClick={() => onClick('cash')}>
            {__('In Cash')}
          </TabTitle>
          <TabTitle className={currentTab === 'card' ? 'active' : ''} onClick={() => onClick('card')}>
            {__('By Card')}
          </TabTitle>
          <TabTitle className={currentTab === 'qpay' ? 'active' : ''} onClick={() => onClick('qpay')}>
            {__('Pay with QPay')}
          </TabTitle>
        </Tabs>
        <ContentWrapper>{this.renderTabContent()}</ContentWrapper>
        <FlexBetween>
          <div>
            <Ebarimt
              billType={billType}
              isPortrait={false}
              show={showE}
              onBillTypeChange={onBillTypeChange}
              onStateChange={onStateChange}
            />
            <OrderInfo
              order={order}
              remainderAmount={this.getRemainderAmount() - cashAmount}
              companyName={companyName}
            />
            <EntityChecker
              billType={billType}
              onStateChange={onStateChange}
              order={order}
              showModal={showRegModal}
              registerNumber={registerNumber}
              onSubmit={this.checkOrganization}
            />
          </div>
        </FlexBetween>
      </OrderInfoWrapper>
    );
  } // end render()
}
