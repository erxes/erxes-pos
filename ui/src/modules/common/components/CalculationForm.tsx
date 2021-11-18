import React from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import FormControl from "modules/common/components/form/Control";
import { FlexCenter } from "modules/common/styles/main";
import Button from "modules/common/components/Button";
import { __ } from "../utils";
import Icon from "erxes-ui/lib/components/Icon";

const PaymentWrapper = styled.div`
  margin: 50px 21%;

  button {
    padding: 10px 20px;
    border-radius: 8px;
  }
`;

const KeyBoard = styled.div`
  display: grid;
  justify-content: center;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  margin-bottom: 100px;
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

const Title = styled.h2`
  text-align: center;
  margin-bottom: 40px;
`;

const Input = styledTS<{ color?: string }>(styled.div)`
  display: flex;
  align-items: center;
  width: 70%;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 6px 10px;

  input {
    border: 0;
    font-size: 15px;
  }

  > div {
    cursor: pointer;
    margin-left: 10px;

    &:hover {
      i {
        color: ${(props) => props.color && props.color}
      }
    }
  }
`;

const Header = styled(FlexCenter)`
  margin: 50px 0 40px 0;

  > label {
    margin-right: 20px;
    font-size: 16px;
  }
`;

type Props = {
  options: any;
  closeDrawer: any;
  totalAmount?: number;
  title?: string;
  isPayment?: boolean;
  header?: React.ReactNode;
  extraButton?: React.ReactNode;
  onSuccess: () => void;
};

class CalculationForm extends React.Component<Props, { inputValue: string }> {
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

  onSuccess = () => {
    this.props.onSuccess();
  };

  renderKeyPad(key, num) {
    return (
      <KeyPad key={key} onClick={() => this.onChangeKeyPad(num.toString())}>
        {num}
      </KeyPad>
    );
  }

  render() {
    const { title, extraButton, isPayment, options, header } = this.props;

    return (
      <>
        {title && <Title>{__(title)}</Title>}
        {header && <Header>{header}</Header>}
        <FlexCenter>
          <Input color={options.colors.primary}>
            <FormControl
              type="text"
              name="inputValue"
              value={this.state.inputValue}
              onChange={this.handleInput}
            />
            <div onClick={() => this.reset()}>
              <Icon icon="cancel" size={13} />
            </div>
          </Input>
          {extraButton && extraButton}
        </FlexCenter>
        <PaymentWrapper>
          <KeyBoard>
            {Array.from({ length: 9 }, (_, i) => i + 1).map((num, index) =>
              this.renderKeyPad(index, num)
            )}
            {this.renderKeyPad(15, isPayment ? "+" : ".")}
            {this.renderKeyPad(0, 0)}
            {this.renderKeyPad(16, "CE")}
          </KeyBoard>
          <FlexCenter>
            <Button
              btnStyle="simple"
              icon="cancel-1"
              block
              onClick={() => this.props.closeDrawer("payment")}
            >
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: options.colors.primary }}
              icon="check-circle"
              block
              onClick={this.onSuccess}
            >
              Done
            </Button>
          </FlexCenter>
        </PaymentWrapper>
      </>
    );
  }
}

export default CalculationForm;
