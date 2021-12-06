import React from "react";
import styledTS from "styled-components-ts";
import styled from "styled-components";
import { __ } from "modules/common/utils";

const TypeWrapper = styled.div`
  margin-top: 50px;

  h2 {
    text-align: center;
    margin-bottom: 40px;
  }
`;

const Cards = styledTS<{ color?: string }>(styled.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  p {
    color: ${(props) => props.color && props.color};
    font-size: 18px;
    font-weight: 500;
  }
`;

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 40px 40px 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;
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
      max-height: 150px;
      max-width: 150px;
      margin-bottom: 30px;
    }
  }

  &:nth-child(even) {
    margin-right: 0;
  }

  &:hover {
    box-shadow: 0 6px 10px 1px rgba(136, 136, 136, 0.08);
  }
`;

type Props = {
  color: string;
  togglePaymentType: () => void;
  toggleQpay: () => void;
};

class PaymentType extends React.Component<Props> {
  render() {
    const { color, togglePaymentType, toggleQpay } = this.props;

    return (
      <TypeWrapper>
        <h2>{__("Choose the payment method")}</h2>

        <Cards color={color}>
          <Card>
            <div onClick={() => togglePaymentType()}>
              <img src="/images/payment2.png" alt="payment" />
            </div>
            <p>{__("In cash or by card")}</p>
          </Card>
          <Card>
            <div onClick={() => toggleQpay()}>
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
