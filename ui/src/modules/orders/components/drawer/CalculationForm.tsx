import React from "react";
import styled from "styled-components";
import FormControl from "modules/common/components/form/Control";
import { FlexCenter } from "modules/common/styles/main";
import Button from "modules/common/components/Button";
import { __ } from "../../../common/utils";
import Icon from "erxes-ui/lib/components/Icon";
import { Input, FormHead } from "modules/orders/styles";
import { Amount } from "modules/orders/components/Calculation";
import { formatNumber } from "modules/utils";
import FormGroup from "../../../common/components/form/Group";
import ControlLabel from "../../../common/components/form/Label";
import Toggle from "../../../common/components/Toggle";

const PaymentWrapper = styled.div`
  margin: 20px 21%;

  button {
    padding: 10px 20px;
    border-radius: 8px;
  }

  @media (max-width: 1600px) {
    margin: 20px 10%;
  }
`;

const KeyBoard = styled.div`
  display: grid;
  justify-content: center;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  margin-bottom: 30px;
`;

const KeyPad = styled(FlexCenter)`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  line-height: 100px;
  background: #eee;
  margin: 8px;
  font-size: 32px;
  font-weight: 600;
  cursor: pointer;

  @media (max-width: 1600px) {
    width: 80px;
    height: 80px;
    border-radius: 80px;
    line-height: 80px;
    font-size: 28px;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 40px;
`;

const Header = styled.div`
  margin: 30px 80px 20px;

  @media (max-width: 1600px) {
    margin: 20px 20px 0px;
  }
`;

const HeaderRow = styled(FlexCenter)`
  justify-content: flex-start;
  margin-bottom: 20px;
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

type State = {
  inputValue: string;
  inCash: number | null;
  byCard: number | null;
  FType: string;
  showE: boolean;
  activeInput: string;
};

class CalculationForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.totalAmount || "",
      byCard: null,
      inCash: props.totalAmount || null,
      FType: "person",
      showE: true,
      activeInput: "inCash",
    };
  }

  onChange = (e) => {
    const FType = (e.target as HTMLInputElement).value;

    this.setState({ FType });
  };

  onSwitchHandler = (e) => {
    this.setState({ showE: e.target.checked });
  };

  onChangeKeyPad = (num) => {
    const { activeInput } = this.state;
    const val = this.state[activeInput];

    if (num === "CE") {
      return this.setState({
        [activeInput]: val.slice(0, -1),
      } as any);
    }

    return this.setState({
      [activeInput]: val + num,
    } as any);
  };

  handleClick = (activeInput: string) => {
    this.setState({ activeInput });
  };

  handleInput = (name: string, value: any) => {
    this.setState({ [name]: value } as any);
  };

  reset = (key: string) => {
    this.setState({ [key]: 0 } as any);
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

  renderFormHead() {
    const { FType, showE } = this.state;
    const { options, totalAmount } = this.props;

    const onChangeCard = (e) =>
      this.handleInput("byCard", (e.target as HTMLInputElement).value);

    const onChangeCash = (e) =>
      this.handleInput("inCash", (e.target as HTMLInputElement).value);

    return (
      <FormHead>
        <Amount color={options.colors.primary}>
          <span>{__("Amount to pay")}</span>
          {formatNumber(totalAmount || 0)}₮
        </Amount>
        <FormGroup>
          <ControlLabel>By Card</ControlLabel>
          <Input color={options.colors.primary}>
            <FormControl
              name="byCard"
              type="number"
              value={this.state.byCard}
              onChange={onChangeCard}
              onClick={() => this.handleClick("byCard")}
            />
            <div onClick={() => this.reset("byCard")}>
              <Icon icon="cancel" size={13} />
            </div>
          </Input>
        </FormGroup>
        <FormGroup>
          <ControlLabel>In Cash</ControlLabel>
          <Input color={options.colors.primary}>
            <FormControl
              name="inCash"
              type="number"
              value={this.state.inCash}
              onChange={onChangeCash}
              onClick={() => this.handleClick("inCash")}
            />
            <div onClick={() => this.reset("inCash")}>
              <Icon icon="cancel" size={13} />
            </div>
          </Input>
        </FormGroup>
        <HeaderRow>
          <ControlLabel>{__("Э-Баримт")}:</ControlLabel> &ensp;
          <Toggle
            checked={showE}
            icons={{
              checked: <span>Yes</span>,
              unchecked: <span>No</span>,
            }}
            onChange={this.onSwitchHandler}
          />
        </HeaderRow>
        {showE && (
          <>
            <FormControl
              componentClass="radio"
              value="person"
              inline={true}
              name="FType"
              checked={FType === "person"}
              onChange={this.onChange}
            >
              {__("Person")}
            </FormControl>
            &ensp;&ensp;
            <FormControl
              componentClass="radio"
              value="organization"
              inline={true}
              name="FType"
              checked={FType === "organization"}
              onChange={this.onChange}
            >
              {__("Organization")}
            </FormControl>
          </>
        )}
      </FormHead>
    );
  }

  render() {
    const { title, isPayment, options } = this.props;

    const onChangeInput = (e) =>
      this.handleInput(
        "inputValue",
        (e.currentTarget as HTMLInputElement).value
      );

    return (
      <>
        {title && <Title>{__(title)}</Title>}
        <Header>
          {this.renderFormHead()}
          {this.state.showE && this.state.FType === "organization" && (
            <FormHead>
              <FlexCenter>
                <Input color={options.colors.primary}>
                  <FormControl
                    type="text"
                    name="inputValue"
                    value={this.state.inputValue}
                    onChange={onChangeInput}
                    onClick={() => this.handleClick("inputValue")}
                  />
                  <div onClick={() => this.reset("inputValue")}>
                    <Icon icon="cancel" size={13} />
                  </div>
                </Input>
                {this.state.FType === "organization" && (
                  <Button style={{ backgroundColor: options.colors.primary }}>
                    Check
                  </Button>
                )}
              </FlexCenter>
            </FormHead>
          )}
        </Header>
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
