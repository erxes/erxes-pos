import React from "react";
import styledTS from "styled-components-ts";
import styled from "styled-components";
import { __ } from "modules/common/utils";

const TypeWrapper = styledTS<{ isPortrait?: boolean }>(styled.div)`
  margin-top: 50px;
  h2 {
    text-align: center;
    margin-bottom: 40px;
    font-size: ${(props) => props.isPortrait && "50px"};
    @media (max-width: 1250px) and (orientation:landscape) {
      font-size: 25px;
    }
  }
`;

const Cards = styledTS<{ color?: string; isPortrait?: boolean }>(styled.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  p {
    color: ${(props) => props.color && props.color};
    font-size: ${(props) => (props.isPortrait ? "35px" : "18px")};
    font-weight: 500;
    @media (max-width: 1250px) and (orientation:landscape) {
      line-height: 22px;
      font-size: 16px;
    }
  }
`;

const Card = styledTS<{ isPortrait?: boolean }>(styled.div)`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 40px 40px 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.isPortrait ? "90%" : "45%")};
  margin: 0 20px 20px 0;
  flex-shrink: 0;
  cursor: pointer;
  transition: all ease 0.3s;
  > div {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    > img {
      max-height: ${(props) => (props.isPortrait ? "250px" : "150px")};
      max-width: ${(props) => (props.isPortrait ? "250px" : "150px")};
      margin-bottom: 30px;
      @media (max-width: 1250px) and (orientation:landscape) {
        max-height: 80px;
        max-width: 80px;
        margin-bottom: 20px;
      }
    }
    @media (max-width: 1250px) and (orientation:landscape) {
      height: 80px;
    }
  }
  &:nth-child(even) {
    margin-right: 0;
  }
  &:hover {
    box-shadow: 0 6px 10px 1px rgba(136, 136, 136, 0.08);
  }
  @media (max-width: 1250px) and (orientation:landscape) {
    padding: 20px;
  }
`;

type Props = {
  color: string;
  togglePaymentType: (type: string) => void;
  isPortrait?: boolean;
};

export const PAYMENT_METHODS = {
  CARD: 'card',
  CASH: 'cash',
  QPAY: 'qpay'
};

class PaymentType extends React.Component<Props> {
  render() {
    const { color, togglePaymentType, isPortrait } = this.props;
    const mode = localStorage.getItem('erxesPosMode') || '';

    return (
      <TypeWrapper isPortrait={isPortrait}>
        <h2>{__("Choose the payment method")}</h2>

        <Cards color={color} isPortrait={isPortrait}>
          {!mode && <Card isPortrait={isPortrait} onClick={() => togglePaymentType(PAYMENT_METHODS.CASH)}>
            <div>
              <img src="/images/payment2.png" alt="payment" />
            </div>
            <p>{__("In Cash")}</p>
          </Card>}
          <Card isPortrait={isPortrait} onClick={() => togglePaymentType(PAYMENT_METHODS.CARD)}>
            <div>
              <img src="/images/payment4.png" alt="payment" />
            </div>
            <p>{__("By Card")}</p>
          </Card>
          <Card isPortrait={isPortrait} onClick={() => togglePaymentType(PAYMENT_METHODS.QPAY)}>
            <div>
              <img src="/images/payment1.png" alt="payment" />
            </div>
            <p>{__("Pay with QPay")}</p>
          </Card>
        </Cards>
      </TypeWrapper>
    );
  }
}

export default PaymentType;
