import React from 'react';

import { Tabs, TabTitle } from 'modules/common/components/tabs/index';
import { BILL_TYPES } from '../../../../constants';
import { IOrder, ICardPayment } from 'modules/orders/types';
import CardSection from './CardSection';

type Props = {
  order: IOrder;
  addCardPayment: (params: ICardPayment) => void;
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

  renderContent() {
    const { order, addCardPayment } = this.props;
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

    return 'qpay'
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
          <TabTitle className={currentTab === 'qpay' ? 'active' : ''} onClick={() => onClick('qpay')}>QPay</TabTitle>
        </Tabs>
        {this.renderContent()}
      </div>
    );
  }
}
