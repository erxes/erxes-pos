import React from 'react';
import styled from 'styled-components';

import { Tabs, TabTitle } from 'modules/common/components/tabs/index';
import { BILL_TYPES } from '../../../../constants';
import { IOrder, ICardPayment, IInvoiceParams, IInvoiceCheckParams } from 'modules/orders/types';
import CardSection from './cardPayment/CardSection';
import QPaySection from './qpayPayment/QPaySection';
import OrderInfo from './OrderInfo';

const OrderInfoWrapper = styled.div`
  margin: 20px;
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
}

export default class SplitPayment extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      billType: BILL_TYPES.CITIZEN,
      currentTab: 'card'
    };
  }

  renderTabContent() {
    const { order, addCardPayment, createQPayInvoice, checkQPayInvoice, cancelQPayInvoice } = this.props;
    const { billType, currentTab } = this.state;

    if (currentTab === 'card') {
      return (
        <CardSection
          order={order}
          addCardPayment={addCardPayment}
          billType={billType}
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
        />
      );
    }

    return null;
  }

  render() {
    const { currentTab } = this.state;

    const onClick = (currentTab: string) => {
      this.setState({ currentTab });
    };

    return (
      <div>
        <Tabs full={true}>
          <TabTitle className={currentTab === 'card' ? 'active' : ''} onClick={() => onClick('card')}>
            Card payment
          </TabTitle>
          <TabTitle className={currentTab === 'qpay' ? 'active' : ''} onClick={() => onClick('qpay')}>
            QPay invoices  
          </TabTitle>
        </Tabs>
        {this.renderTabContent()}
        <OrderInfoWrapper>
          <OrderInfo order={this.props.order} />
        </OrderInfoWrapper>
      </div>
    );
  }
}
