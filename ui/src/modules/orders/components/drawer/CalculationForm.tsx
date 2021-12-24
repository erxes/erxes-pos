import React from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import gql from "graphql-tag";
import apolloClient from "apolloClient";

import { Alert } from "modules/common/utils";
import { FlexCenter } from "modules/common/styles/main";
import Button from "modules/common/components/Button";
import { __ } from "modules/common/utils";
import { FormHead } from "modules/orders/styles";
import { Amount } from "modules/orders/components/Calculation";
import { formatNumber } from "modules/utils";
import { queries } from "../../graphql/index";
import { IPaymentParams } from "modules/orders/containers/PosContainer";
import CardForm from './CardForm';
import Ebarimt from './Ebarimt';
import RegisterChecker from './RegisterChecker';
import CashForm from './CashForm';
import KeyPads from './KeyPads';
import { IOrder } from "modules/orders/types";
import { PAYMENT_METHODS } from "./PaymentType";

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
  title?: string;
  isPayment?: boolean;
  header?: React.ReactNode;
  extraButton?: React.ReactNode;
  handlePayment: (params: IPaymentParams) => void;
  paymentMethod: string;
  order: IOrder;
  setCardPaymentInfo: (params: any) => void;
};

type State = {
  showE: boolean;
  activeInput: string;
  paymentEnabled: boolean;
} & IPaymentParams;

// НӨАТ-н баримтын төрөл
export const BILL_TYPES = {
  CITIZEN: "1", // иргэнд өгөх баримт
  ENTITY: "3", // байгууллагад өгөх баримт
};

export const PAYMENT_TYPES = {
  CARD: "cardAmount",
  CASH: "cashAmount",
};

class CalculationForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const { paymentMethod, order } = props;

    this.state = {
      showE: true,
      activeInput: PAYMENT_TYPES.CASH,
      // payment doc
      registerNumber: "",
      billType: BILL_TYPES.CITIZEN,
      cashAmount: paymentMethod === PAYMENT_METHODS.CASH ? order.totalAmount : 0,
      cardAmount: paymentMethod === PAYMENT_METHODS.CARD ? order.totalAmount : 0,
      paymentEnabled: paymentMethod === PAYMENT_METHODS.CASH ? true : false
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
    const { order } = this.props;
    const { registerNumber, billType, cardAmount, cashAmount = 0 } = this.state;

    this.props.handlePayment({
      registerNumber,
      cardAmount,
      cashAmount: cashAmount > order.totalAmount ? order.totalAmount : cashAmount,
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

  renderFormHead() {
    const { showE, billType, cashAmount = 0, cardAmount = 0 } = this.state;
    const { options, isPortrait, paymentMethod, order, setCardPaymentInfo } = this.props;

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
          {formatNumber(order.totalAmount || 0)}₮
        </Amount>

        {paymentMethod === 'cash' && (
          <CashForm
            cashAmount={cashAmount}
            reset={this.reset}
            color={options.colors.primary}
            onStateChange={onStateChange}
            totalAmount={order.totalAmount}
          />
        )}

        {paymentMethod === 'card' && (
          <CardForm
            onStateChange={onStateChange}
            cardAmount={cardAmount}
            reset={this.reset}
            color={options.colors.primary}
            billType={billType}
            orderNumber={order.number}
            setCardPaymentInfo={setCardPaymentInfo}
            orderId={order._id}
          />)
        }

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
    const { showE, billType, registerNumber = '', paymentEnabled } = this.state;

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
          <KeyPads isPayment={isPayment} isPortrait={isPortrait} onChangeKeyPad={this.onChangeKeyPad} />
          <FlexCenter>
            <Button
              btnStyle="simple"
              icon="cancel-1"
              block
              onClick={() => this.props.closeDrawer("payment")}
            >
              {__("Cancel")}
            </Button>
            {paymentEnabled && (
              <Button
                style={{ backgroundColor: options.colors.primary }}
                icon="check-circle"
                block
                onClick={this.handleSubmit}
              >
                {__("Done")}
              </Button>
            )}
          </FlexCenter>
        </PaymentWrapper>
      </>
    );
  } // end render()
}

export default CalculationForm;
