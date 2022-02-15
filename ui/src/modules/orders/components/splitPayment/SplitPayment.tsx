import React from 'react';
import styled from 'styled-components';

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
      showE: true
    };
  }

  getRemainderAmount() {
    const { order } = this.props;

    return order.totalAmount - ((order.cardAmount || 0) + (order.cashAmount || 0) + (order.mobileAmount || 0));
  }

  renderTabContent() {
    const { addCardPayment, createQPayInvoice, checkQPayInvoice, cancelQPayInvoice } = this.props;
    const { billType, currentTab, order, cashAmount } = this.state;

    const remainder = this.getRemainderAmount();

    const setAmount = (am: number) => {
      let amount = am;

      if (amount > remainder) {
        amount = remainder;

        Alert.warning('Amount exceeds total amount');
      }

      this.setState({ cashAmount: amount });
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
          maxAmount={remainder - this.state.cashAmount}
        />
      );
    }

    return null;
  }

  render() {
    const { currentTab, order, cashAmount, billType, showE } = this.state;

    const onClick = (currentTab: string) => {
      this.setState({ currentTab });
    };

    const onStateChange = (key: string, value: any) => {
      this.setState({ [key]: value } as Pick<State, keyof State>);
    };

    const onBillTypeChange = (e) => {
      const billType = (e.target as HTMLInputElement).value;

      onStateChange('billType', billType);
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
            <OrderInfo order={order} remainderAmount={this.getRemainderAmount() - cashAmount} />
            <ContentWrapper>
            </ContentWrapper>
          </div>
        </FlexBetween>
      </OrderInfoWrapper>
    );
  } // end render()
}
