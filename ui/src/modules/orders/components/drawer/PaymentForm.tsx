import React from "react";
import PaymentType, { PAYMENT_METHODS } from "./PaymentType";
import { IPaymentParams } from "modules/orders/containers/PosContainer";
import QPay from "./QPay";
import { IOrder } from "modules/orders/types";
import apolloClient from "apolloClient";
import { queries } from "modules/orders/graphql/index";
import { FormHead } from "modules/orders/styles";
import { formatNumber } from "modules/utils";
import RegisterChecker from "./RegisterChecker";
import KeyPads from "./KeyPads";
import { FlexCenter } from "modules/common/styles/main";
import Button from "modules/common/components/Button";
import { __ } from "modules/common/utils";
import { Alert } from "modules/common/utils";
import gql from "graphql-tag";
import { Cards, TypeWrapper, VatWrapper } from "./style";
import {
  Header,
  KioskAmount,
  PaymentWrapper,
  Title,
} from "../kiosk/style";
import CardForm from "./CardForm";
import Ebarimt from "./Ebarimt";

type Props = {
  orderId: string;
  options: any;
  totalAmount: number;
  closeDrawer: (type: string) => void;
  makePayment: any;
  order: IOrder;
  orientation?: string;
  addOrder: () => void;
  isSplit?: boolean;
  isPortrait?: boolean;
  title?: string;
  isPayment?: boolean;
  header?: React.ReactNode;
  extraButton?: React.ReactNode;
  handlePayment: (params: IPaymentParams) => void;
  addOrderPayment: (params: any) => void;
  paymentMethod: string;
};

// НӨАТ-н баримтын төрөл
export const BILL_TYPES = {
  CITIZEN: "1", // иргэнд өгөх баримт
  ENTITY: "3", // байгууллагад өгөх баримт
};

export const PAYMENT_TYPES = {
  CARD: "cardAmount",
  CASH: "cashAmount",
  REGISTER: "registerNumber",
};

type State = {
  showE: boolean;
  activeInput: string;
  paymentEnabled: boolean;
  paymentType: string;
  companyName: string;
  isDone: boolean;
} & IPaymentParams;

class PaymentForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const { paymentMethod, order } = props;

    this.state = {
      paymentType: "card",
      showE: true,
      isDone: false,
      activeInput:
        paymentMethod === PAYMENT_METHODS.CARD
          ? PAYMENT_TYPES.CARD
          : PAYMENT_TYPES.REGISTER,
      // payment doc
      registerNumber: "",
      companyName: "",
      billType: BILL_TYPES.CITIZEN,
      cardAmount:
        paymentMethod === PAYMENT_METHODS.CARD ? order.totalAmount : 0,
      paymentEnabled: paymentMethod === PAYMENT_METHODS.CASH ? true : false,
    };
  }

  handlePayment = (params: IPaymentParams) => {
    const { orderId, makePayment } = this.props;

    makePayment(orderId, params);
  };

  onStateChange = (key: string, value: any) => {
    this.setState({ [key]: value } as Pick<State, keyof State>);
  };

  onChangeKeyPad = (num) => {
    const { activeInput } = this.state;
    const val = this.state[activeInput];

    if (num === "CE") {
      return this.setState({ [activeInput]: 0 } as any);
    }

    if (num === "C") {
      return this.setState({
        [activeInput]: parseFloat(val.toString().slice(0, -1)),
      } as any);
    }

    return this.setState({
      [activeInput]: val + num,
    } as any);
  };

  reset = (key: string) => {
    this.setState({ [key]: key === "registerNumber" ? "" : 0 } as any);
  };

  handleSubmit = () => {
    this.onStateChange("isDone", true);
  };

  handlePaymentBefore = () => {
    const { billType, registerNumber, cashAmount = 0 } = this.state;

    this.props.handlePayment({
      registerNumber,
      cashAmount,
      billType,
    });
  };

  checkOrganization = () => {
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

          this.setState({ companyName: data.ordersCheckCompany.name });
        }
      })
      .then(() => {
        this.handlePaymentBefore();
      });
  };

  focusOnRegisterInput = () => {
    this.setState({ activeInput: PAYMENT_TYPES.REGISTER });
  };

  //render PaymentType
  renderPayment() {
    const { options, orientation } = this.props;
    const isPortrait = orientation === "portrait";

    const togglePaymentType = (paymentType: string) => {
      this.setState({ paymentType });
    };

    return (
      <PaymentType
        color={options.colors.primary}
        togglePaymentType={togglePaymentType}
        isPortrait={isPortrait}
      />
    );
  }

  // render VatReceipt
  renderVatReceipt() {
    const { showE, billType } = this.state;
    const { isPortrait, paymentMethod } = this.props;

    const onBillTypeChange = (billType) => {
      this.setState({ billType });

      if (billType === BILL_TYPES.ENTITY) {
        this.focusOnRegisterInput();
      }

      if (billType === BILL_TYPES.CITIZEN) {
        this.setState(
          {
            activeInput:
              paymentMethod === PAYMENT_METHODS.CARD
                ? PAYMENT_TYPES.CARD
                : PAYMENT_TYPES.CASH,
          },
          () => {
            this.handlePaymentBefore();
          }
        );
      }
    };

    const onStateChange = (key: string, value: any) => {
      this.setState({ [key]: value } as Pick<State, keyof State>);
    };

    return (
      <Header>
        <Ebarimt
          billType={billType}
          isPortrait={isPortrait}
          show={showE}
          onBillTypeChange={onBillTypeChange}
          onStateChange={onStateChange}
        />
      </Header>
    );
  }

  //render Amount
  renderAmount() {
    const { options, orientation, order } = this.props;
    const isPortrait = orientation === "portrait";

    return (
      <FormHead isPortrait={isPortrait}>
        <h4>{__("Payment info")}</h4>
        <KioskAmount color={options.colors.primary}>
          <div className="total-wrapper">
            {__("Amount to pay")}:
            <span> {formatNumber(order.totalAmount || 0)}₮</span>
          </div>
        </KioskAmount>
      </FormHead>
    );
  }

  //render Kiosk PaymentPopUp2
  renderPaymentPopUp() {
    const { orientation } = this.props;
    const isPortrait = orientation === "portrait";

    return (
      <TypeWrapper isPortrait={isPortrait}>
        <h2>
          {__(
            "Make the payment you will make according to the card instructions to the card reader on the right hand side"
          )}
        </h2>

        <Cards isPortrait={isPortrait}>
          <div>
            <img src="/images/payment-success.gif" alt="card-reader" />
          </div>
        </Cards>
      </TypeWrapper>
    );
  }

  //Final tulbur tulugdsunii daraa
  renderDone() {
    const { orientation, order } = this.props;
    const isPortrait = orientation === "portrait";

    return (
      <TypeWrapper isPortrait={isPortrait}>
        <h2>{__("Thank you for choosing us")}</h2>

        <Cards isPortrait={isPortrait}>
          <div>
            <img src="/images/done-relax.gif" alt="card-reader" />
          </div>
        </Cards>

        <h2>
          {__("Your number")}:
          <b>{order && order.number ? order.number.split("_")[1] : ""}</b>
        </h2>
      </TypeWrapper>
    );
  }

  renderPopUpType() {
    const { paymentEnabled } = this.state;

    if (paymentEnabled) {
      return this.renderPaymentPopUp();
      // return this.renderDone();
    }

    return this.renderPayment();
  }

  renderCardButtons() {
    const { options, order, addOrderPayment } = this.props;
    const { paymentEnabled, cardAmount = 0, billType } = this.state;

    if (paymentEnabled) {
      return (
        <Button
          style={{ backgroundColor: options.colors.primary }}
          size="medium"
          icon="check-circle"
          onClick={this.handleSubmit}
        >
          {__("Waiting for payment")}
        </Button>
      );
    }

    return (
      <CardForm
        onStateChange={this.onStateChange}
        cardAmount={cardAmount}
        color={options.colors.primary}
        billType={billType}
        order={order}
        addOrderPayment={addOrderPayment}
      />
    );
  }

  render() {
    const {
      title,
      order,
      isPayment,
      options,
      orderId,
      orientation,
      totalAmount,
    } = this.props;

    const {
      showE,
      billType,
      registerNumber = "",
      paymentType,
      isDone,
    } = this.state;

    const onChangeReg = (e) => {
      const value = (e.target as HTMLInputElement).value;

      this.setState({ registerNumber: value });
    };

    const isPortrait = orientation === "portrait";

    if (!orderId) {
      return null;
    }

    if (paymentType === PAYMENT_METHODS.QPAY) {
      return <QPay order={order} handlePayment={this.handlePayment} />;
    }

    if (totalAmount === 0) {
      return this.renderDone();
    }

    if (isDone) {
      return (
        <VatWrapper>
          {this.renderVatReceipt()}
          <RegisterChecker
            billType={billType}
            show={showE}
            registerNumber={registerNumber}
            checkOrganization={this.checkOrganization}
            reset={this.reset}
            color={options.colors.primary}
            isPortrait={isPortrait}
            onChange={onChangeReg}
            focusOnKeypads={this.focusOnRegisterInput}
            setBill="Entity"
          />
          <KeyPads
            isPayment={isPayment}
            isPortrait={isPortrait}
            onChangeKeyPad={this.onChangeKeyPad}
            billType={billType}
          />
        </VatWrapper>
      );
    }

    return (
      <>
        {this.renderPopUpType()}
        {title && <Title>{__(title)}</Title>}
        <Header>{this.renderAmount()}</Header>
        <PaymentWrapper isPortrait={isPortrait}>
          <FlexCenter>
            <Button
              btnStyle="simple"
              icon="arrow-left"
              onClick={() => this.props.closeDrawer("payment")}
            >
              {__("Cancel")}
            </Button>
            {this.renderCardButtons()}
          </FlexCenter>
        </PaymentWrapper>
      </>
    );
  }
}

export default PaymentForm;
