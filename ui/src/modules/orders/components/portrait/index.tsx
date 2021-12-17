import React from "react";
import { ICustomerParams, IOrder, IOrderItemInput } from "../../types";
import { IUser } from "modules/auth/types";
import { IConfig } from "types";
import Modal from "react-bootstrap/Modal";
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
import PortraitList from "./PortraitList";

type Props = {
  createOrder: (params) => void;
  currentUser: IUser;
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
  };

  handleModal = (modalContentType: string) => {
    console.log("here", modalContentType);
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
            Авч явах
          </Type>
          <Type color={color} onClick={() => this.onClickType("eat")}>
            <img src="images/type2.png" alt="type" />
            Сууж зооглох
          </Type>
        </FlexCenter>
        <AppWrapper>
          <img src="/images/yoshinaya-app.png" alt="app" />
          <FlexCenter>
            <a href="#" target="_blank">
              <img className="app-download" src="/images/ios.png" alt="ios" />
            </a>
            <a href="#" target="_blank">
              <img
                className="app-download"
                src="/images/android.png"
                alt="android"
              />
            </a>
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
            />
          )
        );
      default:
        return null;
    }
  }

  render() {
    const { currentConfig, products, items, changeItemCount } = this.props;
    const { showModal, type } = this.state;
    const { colors, logo } = currentConfig.uiOptions || ({} as any);

    if (type) {
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
          <img src={logo ? logo : `/images/logo-dark.png`} alt="logo" />
        </LogoWrapper>
        {this.renderContent(colors.primary)}
        <Footer color={colors.primary}>
          <span>
            <Icon icon="earthgrid" /> www.yoshinoya.mn
          </span>
          &emsp;
          <span>
            <Icon icon="car" /> Хүргэлт: 7007-7007
          </span>
        </Footer>
      </PortraitViewWrapper>
    );
  } // end render()
}
