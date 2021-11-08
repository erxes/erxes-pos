import React from "react";
import styled from "styled-components";
import FormControl from "modules/common/components/form/Control";
import { FlexCenter } from "modules/common/styles/main";
import Button from "modules/common/components/Button";
// import styledTS from "styled-components-ts";

const PaymentWrapper = styled.div`
  margin: 50px 21%;
`;

const KeyBoard = styled.div`
  display: grid;
  justify-content: center;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  margin-bottom: 50px;
`;

const KeyPad = styled(FlexCenter)`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  line-height: 100px;
  background: #eee;
  font-size: 16px;
  margin: 8px;
  font-size: 32px;
  font-weight: 600;
  cursor: pointer;
`;

type Props = {
  options: any;
  totalAmount: number;
  closeDrawer: any;
};

class PaymentForm extends React.Component<Props, { inputValue: string }> {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.totalAmount || "",
    };
  }

  onChangeKeyPad = (num) => {
    if (num === "CE") {
      return this.setState({
        inputValue: this.state.inputValue.slice(0, -1),
      });
    }

    return this.setState({
      inputValue: this.state.inputValue + num,
    });
  };

  handleInput = (e) => {
    e.preventDefault();

    this.setState({ inputValue: e.target.value });
  };

  reset = () => {
    this.setState({
      inputValue: "",
    });
  };

  renderKeyPad(key, num) {
    return (
      <KeyPad key={key} onClick={() => this.onChangeKeyPad(num.toString())}>
        {num}
      </KeyPad>
    );
  }

  render() {
    return (
      <div>
        <FlexCenter>
          <FormControl
            type="text"
            name="inputValue"
            value={this.state.inputValue}
            onChange={this.handleInput}
          />
          <Button
            btnStyle="simple"
            icon="cancel-1"
            onClick={() => this.reset()}
          />
        </FlexCenter>
        <PaymentWrapper>
          <KeyBoard>
            {Array.from({ length: 9 }, (_, i) => i + 1).map((num, index) =>
              this.renderKeyPad(index, num)
            )}
            {this.renderKeyPad(15, ".")}
            {this.renderKeyPad(0, 0)}
            {this.renderKeyPad(16, "CE")}
          </KeyBoard>
          <FlexCenter>
            <Button
              btnStyle="warning"
              icon="cancel-1"
              block
              onClick={() => this.props.closeDrawer("payment")}
            >
              Cancel
            </Button>
            <Button btnStyle="success" icon="check-circle" block>
              Done
            </Button>
          </FlexCenter>
        </PaymentWrapper>
      </div>
    );
  }
}

export default PaymentForm;
