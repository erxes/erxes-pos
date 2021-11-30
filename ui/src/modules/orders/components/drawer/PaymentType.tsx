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
};

class PaymentType extends React.Component<Props> {
  render() {
    return (
      <TypeWrapper>
        <h2>{__("Choose the payment method")}</h2>

        <Cards color={this.props.color}>
          <Card>
            <div>
              <img src="/images/payment2.png" alt="payment" />
            </div>
            <p>Бэлэн</p>
          </Card>
          <Card>
            <div>
              <img src="/images/payment4.png" alt="payment" />
            </div>
            <p>Картаар төлөх</p>
          </Card>
          <Card>
            <div>
              <img src="/images/payment3.png" alt="payment" />
            </div>
            <p>Social Pay</p>
          </Card>
          <Card>
            <div>
              <img src="/images/payment1.png" alt="payment" />
            </div>
            <p>QPay</p>
          </Card>
        </Cards>
      </TypeWrapper>
    );
  }
}

export default PaymentType;
