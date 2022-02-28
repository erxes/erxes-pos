import React from 'react';
import { __ } from 'modules/common/utils';
import { Card, Cards, TypeWrapper } from './style';

type Props = {
  color: string;
  togglePaymentType: (type: string) => void;
  isPortrait?: boolean;
};

type State = {
  isActive: boolean;
};

export const PAYMENT_METHODS = {
  CARD: 'card',
  CASH: 'cash',
  QPAY: 'qpay'
};

class PaymentType extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isActive: false
    };
  }
  render() {
    const { color, togglePaymentType, isPortrait } = this.props;
    const mode = localStorage.getItem('erxesPosMode') || '';

    return (
      <TypeWrapper isPortrait={isPortrait}>
        <h2>{__('Choose the payment method')}</h2>

        <Cards color={color} isPortrait={isPortrait}>
          {!mode && (
            <Card
              isActive={this.state.isActive}
              isPortrait={isPortrait}
              onClick={() => togglePaymentType(PAYMENT_METHODS.CASH)}
            >
              <div>
                <img src="/images/payment2.png" alt="payment" />
              </div>
            </Card>
          )}
          <Card
            isPortrait={isPortrait}
            isActive={this.state.isActive}
            onClick={() => togglePaymentType(PAYMENT_METHODS.CARD)}
          >
            <div>
              <img src="/images/payment4.png" alt="payment" />
            </div>
          </Card>
          <Card
            isActive={this.state.isActive}
            isPortrait={isPortrait}
            onClick={() => togglePaymentType(PAYMENT_METHODS.QPAY)}
          >
            <div>
              <img src="/images/payment1.png" alt="payment" />
            </div>
          </Card>
        </Cards>
      </TypeWrapper>
    );
  }
}

export default PaymentType;
