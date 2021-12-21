import React from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import gql from "graphql-tag";
import apolloClient from "apolloClient";

import { Alert } from "modules/common/utils";
import { FlexCenter } from "modules/common/styles/main";
import Button from "modules/common/components/Button";
import { __ } from "modules/common/utils";
import Icon from "erxes-ui/lib/components/Icon";
import { Input, FormHead } from "modules/orders/styles";
import { Amount } from "modules/orders/components/Calculation";
import { formatNumber } from "modules/utils";
import FormGroup from "modules/common/components/form/Group";
import ControlLabel from "modules/common/components/form/Label";
import { queries } from "../../graphql/index";
import { IPaymentParams } from "modules/orders/containers/PosContainer";
import CardForm from './CardForm';
import Ebarimt from './Ebarimt';
import RegisterChecker from './RegisterChecker';

const PaymentWrapper = styledTS<{ isPortrait?: boolean }>(styled.div)`
  margin: ${(props) => (props.isPortrait ? "20px 10%" : "20px 21%")};
  text-align: center;
  button {
    padding: ${(props) => (props.isPortrait ? "20px 30px" : "10px 20px")};
    border-radius: 8px;
    font-size: ${(props) => props.isPortrait && "32px"};
  }
  @media (max-width: 1600px) and (orientation:landscape) {
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
  @media (max-width: 1600px) and (orientation:landscape) {
    width: 70px;
    height: 70px;
    border-radius: 70px;
    line-height: 70px;
    font-size: 28px;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 40px;
`;

const Header = styled.div`
  margin: 30px 80px 20px;
  @media (max-width: 1600px) and (orientation: landscape) {
    margin: 20px 20px 0px;
  }
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
  paymentMethod: string;
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
    const { showE, billType, cashAmount, cardAmount = 0 } = this.state;
    const { options, totalAmount, isPortrait, paymentMethod } = this.props;

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

    const onStateChange = (key: string, value: any) => {
      this.setState({ [key]: value } as Pick<State, keyof State>);
    };

    return (
      <FormHead isPortrait={isPortrait}>
        <Amount color={options.colors.primary}>
          <span>{__("Amount to pay")}</span>
          {formatNumber(totalAmount || 0)}₮
        </Amount>

        {paymentMethod === 'cash' && (
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
        )}

        {paymentMethod === 'card' && <CardForm onStateChange={onStateChange} cardAmount={cardAmount} reset={this.reset} color={options.colors.primary} />}

        <Ebarimt
          billType={billType}
          isPortrait={isPortrait}
          show={showE}
          onBillTypeChange={onBillTypeChange}
          onStateChange={onStateChange}
        />
      </FormHead>
    );
  }

  render() {
    const { title, isPayment, options, isPortrait } = this.props;
    const { showE, billType, registerNumber = '' } = this.state;

    const onChangeReg = (e) => {
      const value = (e.target as HTMLInputElement).value;

      this.setState({ registerNumber: value });
    };

    return (
      <>
        {title && <Title>{__(title)}</Title>}
        <Header>
          {this.renderFormHead()}
          <RegisterChecker
            billType={billType}
            show={showE}
            registerNumber={registerNumber}
            checkOrganization={this.checkOrganization.bind(this)}
            reset={this.reset}
            color={options.colors.primary}
            isPortrait={isPortrait}
            onChange={onChangeReg}
          />
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
