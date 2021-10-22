import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type Props = {
  totalAmount: number;
  makePayment: (params: any) => void;
}

export default class Calculation extends React.Component<Props> {
  render() {
    const { totalAmount, makePayment } = this.props;

    return (
      <Wrapper>
        <span>Calculation</span>
        <div>{totalAmount}</div>
        <button onClick={makePayment}>Make order</button>
      </Wrapper>
    );
  }
};
