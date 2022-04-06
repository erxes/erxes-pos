import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";

import apolloClient from "apolloClient";
import { queries } from "../../graphql/index";
import { BILL_TYPES } from "../../../../constants";
import { FlexCenter } from "modules/common/styles/main";
import { __, Alert } from "modules/common/utils";
import {
  IOrder,
  IPaymentInput,
  IInvoiceParams,
  IInvoiceCheckParams,
  IPaymentParams,
} from "modules/orders/types";
import CardSection from "./cardPayment/CardSection";
import QPaySection from "./qpayPayment/QPaySection";
import EntitySelector from "../drawer/EntitySelector";
import { Card, Cards, TypeWrapper } from "../drawer/style";
import KeyPads from "../drawer/KeyPads";
import EntityChecker from "./EntityChecker";
import CashSection from "./cashPayment/CashSection";
import { BackButton } from "modules/orders/styles";
import Icon from "modules/common/components/Icon";

const DASHED_BORDER = "1px dashed #ddd";

const PaymentWrapper = styled.div`
  background-color: #fff;
  overflow: auto;
  flex: 1;
`;

const TabContentWrapper = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-top: ${DASHED_BORDER};
`;

type Props = {
  order: IOrder;
  addPayment: (params: IPaymentInput, callback?: () => void) => void;
  createQPayInvoice: (params: IInvoiceParams) => void;
  checkQPayInvoice: (params: IInvoiceCheckParams) => void;
  cancelQPayInvoice: (id: string) => void;
  makePayment: (_id: string, params: IPaymentParams) => void;
  onOrdersChange: (props) => void;
  onChangeProductBodyType: (type: string) => void;
  isPortrait?: boolean;
};

const INPUT_TYPES = {
  CASH: "cashAmount",
  CARD: "cardAmount",
  QPAY: "mobileAmount",
  REGISTER: "registerNumber",
};

type State = {
  billType: string;
  activeInput: string;
  order: IOrder;
  cashAmount: number;
  cardAmount: number;
  mobileAmount: number;
  registerNumber: string;
  showE: boolean;
  showRegModal: boolean;
  companyName: string;
  mode: string;
  remainder: number;
};

export default class SplitPayment extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { order } = this.props;

    const remainder = this.getRemainderAmount(order);

    this.state = {
      billType: BILL_TYPES.CITIZEN,
      activeInput: "empty",
      order: props.order,
      cashAmount: 0,
      cardAmount: remainder,
      mobileAmount: 0,
      registerNumber: "",
      showE: true,
      showRegModal: false,
      companyName: "",
      mode: localStorage.getItem("erxesPosMode") || "",
      remainder,
    };

    this.checkOrganization = this.checkOrganization.bind(this);
  }

  getRemainderAmount(order: IOrder) {
    const sumCashAmount = order.cashAmount || 0;
    const sumCardAmount = order.cardAmount || 0;
    const sumMobileAmount = (
      (order.qpayInvoices || []).filter((q) => q.status === "PAID") || []
    ).reduce((am, q) => am + Number(q.amount), 0);

    return order.totalAmount - sumCashAmount - sumCardAmount - sumMobileAmount;
  }

  onBoxClick = (e, activeInput) => {
    const remainder = this.getRemainderAmount(this.props.order);
    const state = { activeInput };

    if (e.target && e.target.nodeName === "DIV") {
      // when clicked on wrapper box, auto fill remainder
      state[activeInput] = remainder;
    }

    this.setState({ ...state });
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

          this.setState({ companyName: data.ordersCheckCompany.name });
        }
      })
      .then(() => {
        this.handlePayment();
      });
  }

  handlePayment = () => {
    const { makePayment, order } = this.props;
    const { registerNumber, billType, cashAmount, remainder } = this.state;

    if (remainder > 0) {
      return Alert.warning(
        `${__("Please pay the remaining amount")}: ${remainder}`
      );
    }

    makePayment(order._id, { registerNumber, billType, cashAmount });
  };

  renderEbarimt() {
    const { order } = this.props;
    const { showE, billType, registerNumber, activeInput } = this.state;

    const onBillTypeChange = (value: string) => {
      this.setState({
        billType: value,
        showRegModal: billType === BILL_TYPES.ENTITY,
        activeInput:
          value === BILL_TYPES.ENTITY ? INPUT_TYPES.REGISTER : activeInput,
      });
    };

    const onStateChange = (key: string, value: any) => {
      this.setState({ [key]: value } as Pick<State, keyof State>);
    };

    const ebarimtBillType = () => {
      if (billType === BILL_TYPES.ENTITY) {
        return (
          <EntityChecker
            onStateChange={onStateChange}
            order={order}
            registerNumber={registerNumber}
            onSubmit={this.checkOrganization}
            onBillTypeChange={onBillTypeChange}
          />
        );
      }

      return (
        <EntitySelector
          billType={billType}
          isPortrait={false}
          show={showE}
          onBillTypeChange={onBillTypeChange}
          onStateChange={onStateChange}
          makePayment={this.handlePayment}
        />
      );
    };

    return <div>{ebarimtBillType()}</div>;
  }

  renderTabContent() {
    const { addPayment, checkQPayInvoice, cancelQPayInvoice } = this.props;
    const {
      billType,
      activeInput,
      order,
      cardAmount,
      remainder,
      cashAmount,
      mobileAmount,
    } = this.state;

    const setAmount = (amount) => {
      this.setState({ [activeInput]: amount } as Pick<State, keyof State>);
    };

    if (activeInput === INPUT_TYPES.CARD) {
      return (
        <CardSection
          order={order}
          addPayment={addPayment}
          billType={billType}
          cardAmount={cardAmount}
          maxAmount={remainder}
          setAmount={setAmount}
        />
      );
    }

    if (activeInput === INPUT_TYPES.QPAY) {
      return (
        <QPaySection
          order={order}
          billType={billType}
          checkQPayInvoice={checkQPayInvoice}
          cancelQPayInvoice={cancelQPayInvoice}
          maxAmount={remainder}
          mobileAmount={mobileAmount}
          setAmount={setAmount}
        />
      );
    }

    if (activeInput === INPUT_TYPES.CASH) {
      return (
        <CashSection
          order={order}
          cashAmount={cashAmount}
          remainder={remainder || 0}
          setAmount={setAmount}
          addPayment={addPayment}
          // onCallback={e => this.onBoxClick(e, '')}
        />
      );
    }

    return null;
  }

  onChangeKeyPad = (num) => {
    const { activeInput } = this.state;

    let currentValue = this.state[activeInput];
    const isNumberFocused = [
      INPUT_TYPES.CARD,
      INPUT_TYPES.CASH,
      INPUT_TYPES.QPAY,
    ].includes(activeInput);

    // clear input
    if (num === "CE") {
      currentValue = isNumberFocused ? 0 : "";
    } else if (num === "C") {
      // remove last character
      currentValue = currentValue.toString().slice(0, -1);
      currentValue = isNumberFocused ? Number(currentValue) : currentValue;
    } else {
      currentValue = isNumberFocused
        ? Number(currentValue + num)
        : currentValue + num;
    }

    this.setState({ [activeInput]: currentValue } as Pick<State, keyof State>);
  };

  renderPaymentType(type: string, img: string) {
    const { activeInput } = this.state;

    const renderImgOrInput = () => {
      if (activeInput !== type) {
        return <img src={`/images/${img}`} alt={`payment-${type}`} />;
      }

      return this.renderTabContent();
    };

    return (
      <Card
        className={activeInput === type ? "activeCard" : ""}
        onClick={(e) => this.onBoxClick(e, type)}
        isPortrait={this.props.isPortrait}
      >
        <div>{renderImgOrInput()}</div>
      </Card>
    );
  }

  render() {
    const { isPortrait } = this.props;
    const { billType, mode, remainder } = this.state;

    return (
      <PaymentWrapper>
        <div>
          <BackButton
            onClick={() => this.props.onChangeProductBodyType("product")}
          >
            <Icon icon="leftarrow-3" />
            {__("Cancel")}
          </BackButton>
        </div>
        <TypeWrapper isPortrait={isPortrait}>
          {remainder > 0 ? (
            <React.Fragment>
              <h4>{__("Choose the payment method")}</h4>

              <Cards isPortrait={isPortrait}>
                {mode !== "kiosk" &&
                  this.renderPaymentType(INPUT_TYPES.CASH, "payment2.png")}
                {this.renderPaymentType(INPUT_TYPES.CARD, "payment4.png")}
                {this.renderPaymentType(INPUT_TYPES.QPAY, "payment1.png")}
              </Cards>
            </React.Fragment>
          ) : null}
        </TypeWrapper>
        {remainder <= 0 && this.renderEbarimt()}
        {remainder > 0 || billType === BILL_TYPES.ENTITY ? (
          <TabContentWrapper>
            <FlexCenter>
              <KeyPads
                isPayment={false}
                isPortrait={true}
                onChangeKeyPad={this.onChangeKeyPad}
                billType={billType}
              />
            </FlexCenter>
          </TabContentWrapper>
        ) : null}
      </PaymentWrapper>
    );
  } // end render()

  componentDidUpdate(_prevProps: Props, prevState: State) {
    const { order, onOrdersChange } = this.props;
    const remainder = this.getRemainderAmount(order);
    const { companyName, registerNumber } = this.state;

    if (prevState.remainder !== remainder) {
      this.setState({ remainder });
    }

    if (
      prevState.remainder !== remainder ||
      prevState.companyName !== companyName ||
      prevState.registerNumber !== registerNumber
    ) {
      onOrdersChange({ companyName, registerNumber, remainder });
    }
  }
}
