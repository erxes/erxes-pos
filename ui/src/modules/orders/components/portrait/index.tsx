import React from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

import { ICustomerParams, IOrder, IOrderItemInput } from "../../types";
import { IUser } from "modules/auth/types";
import { IConfig } from "types";
import { IPaymentParams } from "../../containers/PosContainer";
import {
  LogoWrapper,
  ChooseType,
  Footer,
  PortraitViewWrapper,
  Type,
  AppWrapper,
} from "./style";
import PaymentForm from "../drawer/PaymentForm";
import Icon from "modules/common/components/Icon";
import { FlexCenter } from "modules/common/styles/main";
import { __ } from "modules/common/utils";
import PortraitList from "./PortraitList";

type Props = {
  createOrder: (params) => void;
  posCurrentUser: IUser;
  currentConfig: IConfig;
  order: IOrder | null;
  orientation: string;
  products: React.ReactNode;
  updateOrder: (params) => void;
  makePayment: (_id: string, params: IPaymentParams) => void;
  productCategoriesQuery: any;
  productsQuery: any;
  totalAmount: number;
  items: IOrderItemInput[];
  addCustomer: (params: ICustomerParams) => void;
  changeItemCount: (item: IOrderItemInput) => void;
  addOrder: (params: any) => void;
  editOrder: () => void;
  setOrderState: (name: string, value: any) => void;
  qp: any;
  customerId: string;
  setCardPaymentInfo: (params: any) => void;
};

type State = {
  type: string;
  showModal: boolean;
  modalContentType: string;
};

export default class PortraitView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      type: "",
      showModal: false,
      modalContentType: "",
    };
  }

  onClickType = (type: string) => {
    this.setState({ type });
    this.props.setOrderState("type", type);
  };

  handleModal = (modalContentType: string) => {
    this.setState({ showModal: !this.state.showModal, modalContentType });
  };

  renderContent(color) {
    return (
      <ChooseType>
        <h4>
          Та үйлчилгээний <br /> төрлөө сонгоно уу?
        </h4>
        <FlexCenter>
          <Type color={color} onClick={() => this.onClickType("take")}>
            <img src="images/type1.png" alt="type" />
            {__("Take")}
          </Type>
          <Type color={color} onClick={() => this.onClickType("eat")}>
            <img src="images/type2.png" alt="type" />
            {__("Eat")}
          </Type>
        </FlexCenter>
        <AppWrapper>
          <img src="/images/yoshinaya-app.png" alt="app" />
          <FlexCenter>
            <img className="app-download" src="/images/ios.png" alt="ios" />
            <img
              className="app-download"
              src="/images/android.png"
              alt="android"
            />
          </FlexCenter>
        </AppWrapper>
      </ChooseType>
    );
  }

  renderModalContent() {
    const {
      order,
      currentConfig,
      totalAmount,
      makePayment,
      orientation,
      setCardPaymentInfo,
    } = this.props;
    const { modalContentType } = this.state;

    switch (modalContentType) {
      case "payment":
        return (
          order && (
            <PaymentForm
              orderId={order ? order._id : ""}
              options={currentConfig ? currentConfig.uiOptions : {}}
              totalAmount={totalAmount}
              closeDrawer={this.handleModal}
              makePayment={makePayment}
              order={order}
              orientation={orientation}
              setCardPaymentInfo={setCardPaymentInfo}
            />
          )
        );
      default:
        return null;
    }
  }

  render() {
    const { currentConfig, products, items, changeItemCount, qp } = this.props;
    const { showModal, type } = this.state;
    const { colors, logo } = currentConfig.uiOptions || ({} as any);

    if (type || (qp && qp.id)) {
      return (
        <>
          <PortraitList
            {...this.props}
            products={products}
            items={items}
            changeItemCount={changeItemCount}
            onClickDrawer={this.handleModal}
          />
          <Modal
            enforceFocus={false}
            show={showModal}
            onHide={() => this.handleModal("")}
            size="lg"
            centered
          >
            <Modal.Body>{this.renderModalContent()}</Modal.Body>
          </Modal>
        </>
      );
    }

    return (
      <PortraitViewWrapper>
        <LogoWrapper>
          <Link to="/">
            <img src={logo ? logo : `/images/logo-dark.png`} alt="logo" />
          </Link>
        </LogoWrapper>
        {this.renderContent(colors.primary)}
        <Footer color={colors.primary}>
          <span>
            <Icon icon="earthgrid" /> www.yoshinoyamongolia.com
          </span>
        </Footer>
      </PortraitViewWrapper>
    );
  } // end render()
}
