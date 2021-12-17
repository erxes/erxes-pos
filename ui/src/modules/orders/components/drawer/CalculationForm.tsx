import React from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import gql from "graphql-tag";
import apolloClient from "apolloClient";

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
import { queries } from "../../graphql/index";
import { IPaymentParams } from "modules/orders/containers/PosContainer";

const PaymentWrapper = styledTS<{ isPortrait?: boolean }>(styled.div)`
  margin: ${(props) => (props.isPortrait ? "20px 10%" : "20px 21%")};
  text-align: center;

  button {
    padding: ${(props) => (props.isPortrait ? "20px 30px" : "10px 20px")};
    border-radius: 8px;
    font-size: ${(props) => props.isPortrait && "32px"};
  }

  @media (max-width: 1600px and max-height: 1600px) {
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

const KeyPad = styledTS<{ isPortrait?: boolean }>(styled(FlexCenter))`
  width: ${(props) => (props.isPortrait ? "140px" : "95px")}
  height: ${(props) => (props.isPortrait ? "140px" : "95px")}
  border-radius: ${(props) => (props.isPortrait ? "140px" : "95px")}
  line-height: ${(props) => (props.isPortrait ? "140px" : "95px")}
  background: #eee;
  margin: 8px;
  font-size: ${(props) => (props.isPortrait ? "42px" : "32px")};
  font-weight: 600;
  cursor: pointer;

  @media (max-width: 1600px and max-height: 1600px) {
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

  @media (max-width: 1600px and max-height: 1600px) {
    margin: 20px 20px 0px;
  }
`;

const HeaderRow = styledTS<{ isPortrait?: boolean }>(styled(FlexCenter))`
  justify-content: flex-start;
  margin-bottom: 20px;
  margin: ${(props) => props.isPortrait && "30px 0 30px 0"};
`;

type Props = {
  orderId: string;
  options: any;
  closeDrawer: any;
  isPortrait?: boolean;
  totalAmount?: number;
  title?: string;
  isPayment?: boolean;
  header?: React.ReactNode;
  extraButton?: React.ReactNode;
  handlePayment: (params: IPaymentParams) => void;
};

type State = {
  showE: boolean;
  activeInput: string;
} & IPaymentParams;

// НӨАТ-н баримтын төрөл
export const BILL_TYPES = {
  CITIZEN: "1", // иргэнд өгөх баримт
  ENTITY: "3", // байгууллагад өгөх баримт
};

const PAYMENT_TYPES = {
  CARD: "cardAmount",
  CASH: "cashAmount",
};

class CalculationForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      showE: true,
      activeInput: PAYMENT_TYPES.CASH,
      // payment doc
      registerNumber: "",
      billType: BILL_TYPES.CITIZEN,
      cashAmount: props.totalAmount,
    };
  }

  onSwitchHandler = (e) => {
    this.setState({ showE: e.target.checked });
  };

  onChangeKeyPad = (num) => {
    const { activeInput } = this.state;
    const val = this.state[activeInput];

    if (num === "CE") {
      return this.setState({ [activeInput]: 0 } as any);
    }

    return this.setState({
      [activeInput]: val + num,
    } as any);
  };

  reset = (key: string) => {
    this.setState({ [key]: key === "registerNumber" ? "" : 0 } as any);
  };

  handleSubmit = () => {
    const { registerNumber, billType, cardAmount, cashAmount } = this.state;

    this.props.handlePayment({
      registerNumber,
      cardAmount,
      cashAmount,
      billType,
    });
  };

  checkOrganization() {
    apolloClient
      .query({
        query: gql(queries.ordersCheckCompany),
        variables: { registerNumber: this.state.registerNumber },
      })
      .then(({ data, errors }) => {
        if (errors) {
          Alert.error(errors.toString());
        }

        if (data && data.ordersCheckCompany) {
          Alert.success(data.ordersCheckCompany.name);
        }
      });
  }

  renderKeyPad(key, num) {
    return (
      <KeyPad
        key={key}
        onClick={() => this.onChangeKeyPad(num.toString())}
        isPortrait={this.props.isPortrait}
      >
        {num}
      </KeyPad>
    );
  }

  renderFormHead() {
    const { showE, billType, cashAmount, cardAmount } = this.state;
    const { options, totalAmount, isPortrait } = this.props;

    const inputProps: any = {
      allowNegative: false,
      thousandSeparator: true,
      prefix: "₮",
      inputMode: "numeric",
    };

    const handleInput = (name: string, value: number | undefined) => {
      this.setState({ [name]: value } as any);
    };

    // for updating card & cash amount from either input or numpad
    const handleClick = (activeInput: string) => {
      this.setState({ activeInput });
    };

    const onBillTypeChange = (e) => {
      const billType = (e.target as HTMLInputElement).value;

      this.setState({ billType });
    };

    return (
      <FormHead isPortrait={isPortrait}>
        <Amount color={options.colors.primary}>
          <span>{__("Amount to pay")}</span>
          {formatNumber(totalAmount || 0)}₮
        </Amount>
        <FormGroup>
          <ControlLabel>{__("By Card")}</ControlLabel>
          <Input color={options.colors.primary}>
            <NumberFormat
              name="cardAmount"
              value={cardAmount}
              onValueChange={(values) =>
                handleInput(PAYMENT_TYPES.CARD, values.floatValue)
              }
              onClick={() => handleClick(PAYMENT_TYPES.CARD)}
              {...inputProps}
            />
            <div onClick={() => this.reset(PAYMENT_TYPES.CARD)}>
              <Icon icon="cancel" size={13} />
            </div>
          </Input>
        </FormGroup>
        <FormGroup>
          <ControlLabel>{__("In Cash")}</ControlLabel>
          <Input color={options.colors.primary}>
            <NumberFormat
              name="cashAmount"
              value={cashAmount}
              onValueChange={(values) =>
                handleInput(PAYMENT_TYPES.CASH, values.floatValue)
              }
              onClick={() => handleClick(PAYMENT_TYPES.CASH)}
              {...inputProps}
            />
            <div onClick={() => this.reset(PAYMENT_TYPES.CASH)}>
              <Icon icon="cancel" size={13} />
            </div>
          </Input>
        </FormGroup>
        <HeaderRow isPortrait={isPortrait}>
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
              value={BILL_TYPES.CITIZEN}
              inline={true}
              name="billType"
              checked={billType === BILL_TYPES.CITIZEN}
              onChange={onBillTypeChange}
            >
              {__("Person")}
            </FormControl>
            &ensp;&ensp;
            <FormControl
              componentClass="radio"
              value={BILL_TYPES.ENTITY}
              inline={true}
              name="billType"
              checked={billType === BILL_TYPES.ENTITY}
              onChange={onBillTypeChange}
            >
              {__("Organization")}
            </FormControl>
          </>
        )}
      </FormHead>
    );
  }

  render() {
    const { title, isPayment, options, isPortrait } = this.props;

    const onChangeReg = (e) => {
      const value = (e.target as HTMLInputElement).value;

      this.setState({ registerNumber: value });
    };

    return (
      <>
        {title && <Title>{__(title)}</Title>}
        <Header>
          {this.renderFormHead()}
          {this.state.showE && this.state.billType === BILL_TYPES.ENTITY && (
            <FormHead isPortrait={isPortrait}>
              <FlexCenter>
                <Input color={options.colors.primary}>
                  <FormControl
                    type="text"
                    name="registerNumber"
                    onChange={onChangeReg}
                    value={this.state.registerNumber}
                  />
                  <div onClick={() => this.reset("registerNumber")}>
                    <Icon icon="cancel" size={13} />
                  </div>
                </Input>
                {this.state.billType === BILL_TYPES.ENTITY && (
                  <Button
                    style={{ backgroundColor: options.colors.primary }}
                    onClick={() => this.checkOrganization()}
                  >
                    {__("Check")}
                  </Button>
                )}
              </FlexCenter>
            </FormHead>
          )}
        </Header>
        <PaymentWrapper isPortrait={isPortrait}>
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
              {__("Cancel")}
            </Button>
            <Button
              style={{ backgroundColor: options.colors.primary }}
              icon="check-circle"
              block
              onClick={this.handleSubmit}
            >
              {__("Done")}
            </Button>
          </FlexCenter>
        </PaymentWrapper>
      </>
    );
  } // end render()
}

export default CalculationForm;
