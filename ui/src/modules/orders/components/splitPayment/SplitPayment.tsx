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
  ICardPayment,
  IInvoiceParams,
  IInvoiceCheckParams,
  IPaymentParams,
} from "modules/orders/types";
import CardSection from "./cardPayment/CardSection";
import QPaySection from "./qpayPayment/QPaySection";
import Ebarimt from "../drawer/Ebarimt";
import { Card, Cards, TypeWrapper } from "../drawer/style";
import KeyPads from "../drawer/KeyPads";
import EntityChecker from "./EntityChecker";
// import OrderInfo from "./OrderInfo";
import CashSection from "./CashSection";

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
  addCardPayment: (params: ICardPayment) => void;
  createQPayInvoice: (params: IInvoiceParams) => void;
  checkQPayInvoice: (params: IInvoiceCheckParams) => void;
  cancelQPayInvoice: (id: string) => void;
  makePayment: (_id: string, params: IPaymentParams) => void;
  isPortrait?: boolean;
};

const ACTIVE_INPUT_TYPES = {
  CASH: "cashAmount",
  CARD: "cardAmount",
  QPAY: "mobileAmount",
  REGISTER: "register",
};

type State = {
  billType: string;
  currentTab: string;
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

    const sumCashAmount = order.cashAmount || 0;
    const sumCardAmount = (order.cardPayments || []).reduce(
      (am, c) => am + c.amount,
      0
    );
    const sumMobileAmount = (
      (order.qpayInvoices || []).filter((q) => q.status === "done") || []
    ).reduce((am, q) => am + Number(q.amount), 0);

    const remainder =
      order.totalAmount - sumCashAmount - sumCardAmount - sumMobileAmount;

    this.state = {
      billType: BILL_TYPES.CITIZEN,
      currentTab: "empty",
      order: props.order,
      cashAmount: 0,
      cardAmount: 0,
      mobileAmount: 0,
      registerNumber: "",
      showE: true,
      showRegModal: false,
      companyName: "",
      mode: localStorage.getItem("erxesPosMode") || "",
      remainder,
    };
  }

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
      });
  };

  handlePayment = () => {
    const { makePayment, order } = this.props;
    const { registerNumber, billType, cashAmount } = this.state;

    makePayment(order._id, { registerNumber, billType, cashAmount });
  };

  renderEbarimt() {
    const { order } = this.props;
    const { showE, billType, registerNumber } = this.state;

    const onBillTypeChange = (value: string) => {
      const billType = value;

      this.setState({ billType, showRegModal: billType === BILL_TYPES.ENTITY });
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
        <Ebarimt
          billType={billType}
          isPortrait={false}
          show={showE}
          onBillTypeChange={onBillTypeChange}
          onStateChange={onStateChange}
        />
      );
    };

    return <div>{ebarimtBillType()}</div>;
  }

  renderTabContent() {
    const { addCardPayment, checkQPayInvoice, cancelQPayInvoice } = this.props;
    const {
      billType,
      currentTab,
      order,
      cardAmount,
      remainder,
      cashAmount,
      mobileAmount,
    } = this.state;

    const setAmount = (amount) => {
      this.setState({ [currentTab]: amount } as Pick<State, keyof State>);
    };

    if (currentTab === ACTIVE_INPUT_TYPES.CARD) {
      return (
        <CardSection
          order={order}
          addCardPayment={addCardPayment}
          billType={billType}
          // amount={remainder - this.state.amount}
          amount={cardAmount || 0}
          remainder={remainder || 0}
        />
      );
    }

    if (currentTab === ACTIVE_INPUT_TYPES.QPAY) {
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

    if (currentTab === ACTIVE_INPUT_TYPES.CASH) {
      return (
        <CashSection
          order={order}
          cashAmount={cashAmount}
          remainder={remainder || 0}
          currentAmount={cashAmount}
          setState={(param) => this.setState({ ...param })}
        />
      );
    }

    return null;
  }

  onChangeKeyPad = (num) => {
    const { currentTab } = this.state;

    let amount = this.state[currentTab] || 0;

    // clear input
    if (num === "CE") {
      this.setState({ [currentTab]: 0 } as unknown as Pick<State, keyof State>);
    } else if (num === "C") {
      // remove last character
      this.setState({
        [currentTab]: Number(amount.toString().slice(0, -1)),
      } as unknown as Pick<State, keyof State>);
    } else {
      this.setState({ [currentTab]: Number(amount + num) } as unknown as Pick<
        State,
        keyof State
      >);
    }
  };

  renderPaymentType(type: string, img: string) {
    const { currentTab } = this.state;

    const onClick = () => {
      this.setState({ currentTab: type });
    };

    const renderImgOrInput = () => {
      if (currentTab !== type) {
        return <img src={`/images/${img}`} alt={`payment-${type}`} />;
      }

      return this.renderTabContent();
    };

    return (
      <Card
        className={currentTab === type ? "activeCard" : ""}
        onClick={onClick}
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
        <TypeWrapper isPortrait={isPortrait}>
          {/* <OrderInfo
            order={order}
            remainderAmount={remainder}
            cashAmount={cashAmount}
          /> */}
          <h4>{__("Choose the payment method")}</h4>

          <Cards isPortrait={isPortrait}>
            {mode !== "kiosk" &&
              this.renderPaymentType(ACTIVE_INPUT_TYPES.CASH, "payment2.png")}
            {this.renderPaymentType(ACTIVE_INPUT_TYPES.CARD, "payment4.png")}
            {this.renderPaymentType(ACTIVE_INPUT_TYPES.QPAY, "payment1.png")}
          </Cards>
        </TypeWrapper>
        {remainder <= 0 && this.renderEbarimt()}
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
      </PaymentWrapper>
    );
  } // end render()
}
