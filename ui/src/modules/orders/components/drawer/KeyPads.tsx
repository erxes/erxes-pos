import React from 'react';
import styled from "styled-components";

import KeyPad from './KeyPad';

const KeyBoard = styled.div`
  display: inline-grid;
  justify-content: center;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  margin-bottom: 30px;
`;

type Props = {
  isPortrait: boolean | undefined;
  isPayment: boolean | undefined;
  onChangeKeyPad: (val: string) => void;
}

export default class KeyPads extends React.Component<Props> {
  renderKeyPad(key, num) {
    return (
      <KeyPad
        key={key}
        onClick={() => this.props.onChangeKeyPad(num.toString())}
        isPortrait={this.props.isPortrait}
        num={num}
      />
    );
  }

  render() {
    const { isPayment } = this.props;

    return (
      <KeyBoard>
        {Array.from({ length: 9 }, (_, i) => i + 1).map((num, index) =>
          this.renderKeyPad(index, num)
        )}
        {this.renderKeyPad(15, isPayment ? "+" : ".")}
        {this.renderKeyPad(0, 0)}
        {this.renderKeyPad(16, "CE")}
      </KeyBoard>
    );
  }
}
