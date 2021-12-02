import React from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import gql from 'graphql-tag';
import apolloClient from 'apolloClient';

import { Alert } from "modules/common/utils";
import FormControl from "modules/common/components/form/Control";
import { FlexCenter } from "modules/common/styles/main";
import Button from "modules/common/components/Button";
import { __ } from "modules/common/utils";
import Icon from "erxes-ui/lib/components/Icon";
import { Input, FormHead } from "modules/orders/styles";
import { Amount } from "modules/orders/components/Calculation";
import { formatNumber } from "modules/utils";
import FormGroup from "modules/common/components/form/Group";
import ControlLabel from "modules/common/components/form/Label";
import Toggle from "modules/common/components/Toggle";
import { queries } from '../../graphql/index';

const PaymentWrapper = styled.div`
  margin: 20px 21%;
  text-align: center;

  button {
    padding: 10px 20px;
    border-radius: 8px;
  }

  @media (max-width: 1600px) {
    margin: 20px 10%;
  }
`;

const KeyBoard = styled.div`
  display: inline-grid;
  justify-content: center;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  margin-bottom: 30px;
`;

const KeyPad = styled(FlexCenter)`
  width: 95px;
  height: 95px;
  border-radius: 95px;
  line-height: 95px;
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
  setOrderState: (name: string, value: any) => void;
};

type State = {
  registerNumber: string;
  inCash: string;
  byCard: string;
  FType: string;
  showE: boolean;
  activeInput: string;
};

const PAYMENT_INPUT = {
  IN_CASH: 'inCash',
  BY_CARD: 'byCard'
};

class CalculationForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      registerNumber: "",
      byCard: "",
      inCash: props.totalAmount || "",
      FType: "person",
      showE: true,
      activeInput: PAYMENT_INPUT.IN_CASH,
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
    this.setState({ [key]: "" } as any);
  };

  onSuccess = () => {
    this.props.onSuccess();
  };

  checkOrganization() {
    apolloClient.query({
      query: gql(queries.ordersCheckCompany),
      variables: { registerNumber: this.state.registerNumber }
    }).then(({ data, errors }) => {
      if (errors) {
        Alert.error(errors.toString())
      }

      if (data && data.ordersCheckCompany) {
        Alert.success(data.ordersCheckCompany.name);
        this.props.setOrderState('registerNumber', this.state.registerNumber);
      }
    });
  }

  renderKeyPad(key, num) {
    return (
      <KeyPad key={key} onClick={() => this.onChangeKeyPad(num.toString())}>
        {num}
      </KeyPad>
    );
  }

  renderFormHead() {
    const { FType, showE, inCash, byCard } = this.state;
    const { options, totalAmount } = this.props;

    const onChangeCard = (e) =>
      this.handleInput(PAYMENT_INPUT.BY_CARD, (e.target as HTMLInputElement).value);

    const onChangeCash = (e) =>
      this.handleInput(PAYMENT_INPUT.IN_CASH, (e.target as HTMLInputElement).value);

    const hasChange = Number(inCash) > Number(totalAmount) ? true : false;

    const inputProps: any = {
      allowNegative: false,
      thousandSeparator: true,
      prefix: "₮",
      inputMode: "numeric",
    };

    if (totalAmount) {
      // limit input by total amount
      inputProps.isAllowed = ({ floatValue }) => floatValue <= totalAmount;
    }

    return (
      <FormHead>
        <Amount color={options.colors.primary}>
          <span>{__("Amount to pay")}</span>
          {formatNumber(totalAmount || 0)}₮
        </Amount>
        <FormGroup>
          <ControlLabel>{__("By Card")}</ControlLabel>
          <Input color={options.colors.primary}>
            <NumberFormat
              name="byCard"
              value={byCard}
              onChange={onChangeCard}
              onClick={() => this.handleClick(PAYMENT_INPUT.BY_CARD)}
              {...inputProps}
            />
            <div onClick={() => this.reset(PAYMENT_INPUT.BY_CARD)}>
              <Icon icon="cancel" size={13} />
            </div>
          </Input>
        </FormGroup>
        <FormGroup>
          <ControlLabel>{__("In Cash")}</ControlLabel>
          <Input color={options.colors.primary}>
            <NumberFormat
              name="inCash"
              value={inCash}
              onChange={onChangeCash}
              onClick={() => this.handleClick(PAYMENT_INPUT.IN_CASH)}
              {...inputProps}
            />
            <div onClick={() => this.reset(PAYMENT_INPUT.IN_CASH)}>
              <Icon icon="cancel" size={13} />
            </div>
          </Input>
        </FormGroup>
        {hasChange && (
          <Amount>
            <span>{__("Change amount")}</span>
            {formatNumber(Number(inCash) - Number(totalAmount))}₮
          </Amount>
        )}
        <HeaderRow>
          <ControlLabel>{__("E-barimt")}:</ControlLabel> &ensp;
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

    const onBlur = (e) => {
      const value = (e.target as HTMLInputElement).value;

      this.setState({ registerNumber: value });
    }

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
                    name="registerNumber"
                    onBlur={onBlur}
                    defaultValue={this.state.registerNumber}
                  />
                  <div onClick={() => this.reset("registerNumber")}>
                    <Icon icon="cancel" size={13} />
                  </div>
                </Input>
                {this.state.FType === "organization" && (
                  <Button style={{ backgroundColor: options.colors.primary }} onClick={() => this.checkOrganization()}>
                    {__("Check")}
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
