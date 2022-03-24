import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NameCard from "modules/common/components/nameCard/NameCard";
import AsyncComponent from "modules/common/components/AsyncComponent";
import { ICustomerParams, IOrder, IOrderItemInput } from "../types";
import { ORDER_TYPES } from "../../../constants";
import Calculation from "./Calculation";
import OrderSearch from "../containers/layout/OrderSearch";
import { IUser } from "modules/auth/types";
import Modal from "react-bootstrap/Modal";
import {
  PosWrapper,
  MainContent,
  FlexCustomer,
  MenuContent,
  ProductsContent,
  FlexHeader,
  Divider,
  KioskMainContent,
  KioskMenuContent,
  KioskProductsContent,
  FooterContent,
  PosMenuContent,
} from "../styles";
import { IConfig } from "types";
// import PaymentForm from './drawer/PaymentForm';
import CustomerForm from "./drawer/CustomerForm";
import ProductSearch from "../containers/ProductSearch";
// import { IPaymentParams } from '../containers/PosContainer';
import PortraitView from "./kiosk";
import { renderFullName } from "modules/common/utils";
import Icon from "modules/common/components/Icon";
import { NavLink } from "react-router-dom";
import { NavIcon } from "modules/layout/styles";
import FooterCalculation from "./kiosk/FooterCalculation";
import SplitPaymentContainer from "../containers/SplitPaymentContainer";
import { Cards, TypeWrapper } from "./drawer/style";
import { __ } from "modules/common/utils";

const ProductsContainer = AsyncComponent(
  () => import(/* webpackChunkName: "Pos" */ "../containers/ProductsContainer")
);

const CategoriesContainer = AsyncComponent(
  () =>
    import(/* webpackChunkName: "Pos" */ "../containers/CategoriesContainer")
);

type Props = {
  createOrder: (params, callback?) => void;
  posCurrentUser: IUser;
  currentConfig: IConfig;
  order: IOrder | null;
  orientation: string;
  updateOrder: (params, callback?) => Promise<IOrder>;
  // makePayment: (_id: string, params: IPaymentParams) => void;
  productCategoriesQuery: any;
  productsQuery: any;
  addCustomer: (params: ICustomerParams) => void;
  qp: any;
  type?: string;
};

type State = {
  items: IOrderItemInput[];
  totalAmount: number;
  type: string;
  modalContentType: string;
  showMenu: boolean;
  productBodyType: string;
  customerId: string;
  registerNumber: string;
  // paymentType: string;
};

const getTotalAmount = (items: IOrderItemInput[]) => {
  let total = 0;

  for (const i of items || []) {
    total += (i.unitPrice || 0) * i.count;
  }

  return total;
};

export default class Pos extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { order } = props;

    this.state = {
      items: order ? order.items : [],
      totalAmount: order ? getTotalAmount(order.items) : 0,
      showMenu: false,
      productBodyType: "product",
      type:
        this.props.type || (order && order.type ? order.type : ORDER_TYPES.EAT),
      modalContentType: "",
      customerId: order && order.customerId ? order.customerId : "",
      registerNumber: "",
      // paymentType: 'card'
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order !== this.props.order) {
      const order = nextProps.order;

      this.setState({
        totalAmount: order ? getTotalAmount(order.items) : 0,
        items: order ? order.items || [] : [],
      });
    }

    if (
      nextProps.qp.categoryId ||
      (Object.keys(nextProps.qp).length === 1 && nextProps.qp.home)
    ) {
      this.setState({
        productBodyType: "product",
      });
    }
  }

  setItems = (items: IOrderItemInput[]) => {
    this.setState({ items, totalAmount: getTotalAmount(items) });
  };

  toggleModal = (modalContentType: string) => {
    this.setState({ showMenu: !this.state.showMenu, modalContentType });
  };

  changeItemCount = (item: IOrderItemInput) => {
    let items = this.state.items.map((i) => {
      if (i.productId === item.productId && item._id === i._id) {
        i.count = item.count;
      }

      return i;
    });

    items = items.filter((i) => i.count > 0);

    const totalAmount = getTotalAmount(items);

    this.setState({ items, totalAmount });
  };

  changeItemIsTake = (item: IOrderItemInput, value: boolean) => {
    const { type, items } = this.state;
    if (type !== ORDER_TYPES.EAT) {
      this.setState({ items: items.map((i) => ({ ...i, isTake: true })) });
      return;
    }

    this.setState({
      items: items.map((i) =>
        item._id === i._id ? { ...i, isTake: value } : i
      ),
    });
  };

  // set state field that doesn't need amount calculation
  setOrderState = (name: string, value: any) => {
    this.setState({ [name]: value } as Pick<State, keyof State>);

    if (name === "type") {
      const { items } = this.state;
      const isTake = value !== ORDER_TYPES.EAT;
      this.setState({ items: items.map((i) => ({ ...i, isTake })) });
    }
  };

  addOrder = (callback?: () => void) => {
    const { createOrder } = this.props;
    const { totalAmount, type, items, customerId } = this.state;

    const currentItems = items.map((item) => ({
      _id: item._id,
      productId: item.productId,
      count: item.count,
      unitPrice: item.unitPrice,
      isPackage: item.isPackage,
      isTake: type !== ORDER_TYPES.EAT ? true : item.isTake,
    }));

    createOrder(
      { items: currentItems, totalAmount, type, customerId },
      callback
    );
  };

  editOrder = (callback?: () => void) => {
    const { updateOrder, order } = this.props;
    const { totalAmount, type, items, customerId } = this.state;

    if (order && order._id) {
      const currentItems = items.map((item) => ({
        _id: item._id,
        productId: item.productId,
        count: item.count,
        unitPrice: item.unitPrice,
        isPackage: item.isPackage,
        isTake: type !== ORDER_TYPES.EAT ? true : item.isTake,
      }));

      updateOrder(
        {
          _id: order._id,
          items: currentItems,
          totalAmount,
          type,
          customerId,
        },
        callback
      ).then((updatedOrder) => {
        this.setState({
          items: updatedOrder.items,
          totalAmount: getTotalAmount(updatedOrder.items),
        });
      });
    }
  };

  onChangeProductBodyType = (productBodyType: string) => {
    this.setState({ productBodyType });
  };

  renderOrderSearch() {
    const { orientation } = this.props;

    return <OrderSearch orientation={orientation} />;
  }

  // handlePayment = (params: IPaymentParams) => {
  //   const { order, makePayment } = this.props;

  //   makePayment(order ? order._id : '', params);
  // };

  // renderKioskModalContent() {
  //   const {
  //     currentConfig,
  //     makePayment,
  //     order,
  //     setCardPaymentInfo,
  //     orientation
  //   } = this.props;
  //   const { modalContentType, totalAmount, paymentType } = this.state;

  //   const options = currentConfig ? currentConfig.uiOptions : {};

  //   switch (modalContentType) {
  //     case 'payment':
  //       return (
  //         order && (
  //           <PaymentForm
  //             orderId={order ? order._id : ''}
  //             options={options}
  //             totalAmount={totalAmount}
  //             closeDrawer={this.toggleModal}
  //             makePayment={makePayment}
  //             order={order}
  //             setCardPaymentInfo={setCardPaymentInfo}
  //             orientation={orientation}
  //             handlePayment={this.handlePayment}
  //             paymentMethod={paymentType}
  //           />
  //         )
  //       );
  //     default:
  //       return null;
  //   }
  // }

  renderCurrentLogin(uiOptions) {
    const mode = localStorage.getItem("erxesPosMode");
    const { order, posCurrentUser } = this.props;

    if (mode === "kiosk") {
      if (order && order.customer) {
        const customer = order.customer;

        return (
          <>
            <Icon
              icon="home"
              onClick={() => {
                window.location.href = "/";
              }}
              size={36}
              color={uiOptions.colors ? uiOptions.colors.primary : ""}
            />
            <FlexCustomer>
              <NameCard.Avatar customer={customer} size={40} />
              {renderFullName(customer)}
            </FlexCustomer>
          </>
        );
      }

      return (
        <Icon
          icon="home"
          onClick={() => {
            window.location.href = "/";
          }}
          size={36}
          color={uiOptions.colors ? uiOptions.colors.primary : ""}
        />
      );
    }

    return <NameCard user={posCurrentUser} avatarSize={40} />;
  }

  renderSyncMenu() {
    const { posCurrentUser } = this.props;

    if (!posCurrentUser) {
      return "";
    }

    if (localStorage.getItem("erxesPosMode")) {
      return "";
    }

    return (
      <NavLink to="/settings">
        <NavIcon className={"icon-sync-exclamation"} />
      </NavLink>
    );
  }

  renderKitchenMenu() {
    const { posCurrentUser, currentConfig } = this.props;

    if (!posCurrentUser || !currentConfig) {
      return "";
    }

    if (!currentConfig.kitchenScreen) {
      return "";
    }

    if (!["", "kitchen"].includes(localStorage.getItem("erxesPosMode") || "")) {
      return "";
    }

    return (
      <NavLink to="/kitchen-screen">
        <NavIcon className={"icon-wallclock"} />
      </NavLink>
    );
  }

  renderWaitingMenu() {
    const { posCurrentUser, currentConfig } = this.props;

    if (!posCurrentUser || !currentConfig) {
      return "";
    }

    if (!currentConfig.waitingScreen) {
      return "";
    }

    if (!["", "waiting"].includes(localStorage.getItem("erxesPosMode") || "")) {
      return "";
    }

    return (
      <NavLink to="/waiting-screen">
        <NavIcon className={"icon-presentation"} />
      </NavLink>
    );
  }

  handleModal = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  };

  renderProduct() {
    const { currentConfig, orientation, productsQuery } = this.props;

    const { items } = this.state;

    const products = (
      <ProductsContainer
        setItems={this.setItems}
        items={items}
        productsQuery={productsQuery}
        orientation={orientation}
      />
    );

    return (
      <>
        <FlexHeader>
          {this.renderCurrentLogin(
            currentConfig ? currentConfig.uiOptions : {}
          )}
          <ProductSearch productsQuery={productsQuery} />
        </FlexHeader>
        <Divider />
        {products}
      </>
    );
  }

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

  renderProductBody() {
    const { addCustomer, order } = this.props;
    const { productBodyType } = this.state;

    switch (productBodyType) {
      case "product": {
        return this.renderProduct();
      }
      case "payment": {
        if (order) {
          return <SplitPaymentContainer order={order} />;
        }

        return null;
      }
      case "orderSearch": {
        return this.renderOrderSearch();
      }
      case "customer": {
        return (
          <CustomerForm
            addCustomer={addCustomer}
            onChangeProductBodyType={this.onChangeProductBodyType}
          ></CustomerForm>
        );
      }
      case "done": {
        return this.renderDone();
      }
      default: {
        return null;
      }
    }
  }

  renderLogo() {
    const { currentConfig } = this.props;

    return (
      <>
        <FlexHeader>
          <NavLink to={"/?home=true"}>
            <img src={currentConfig.uiOptions.logo} alt="logo11" />
          </NavLink>
          <div className="syncMenu">
            {this.renderSyncMenu()}
            {this.renderKitchenMenu()}
            {this.renderWaitingMenu()}
          </div>
        </FlexHeader>
      </>
    );
  }

  render() {
    const {
      currentConfig,
      order,
      orientation,
      productCategoriesQuery,
      productsQuery,
      qp,
    } = this.props;

    const { items, totalAmount, showMenu, type } = this.state;
    const mode = localStorage.getItem("erxesPosMode");

    const products = (
      <ProductsContainer
        setItems={this.setItems}
        items={items}
        productsQuery={productsQuery}
        orientation={orientation}
      />
    );

    const categories = (
      <CategoriesContainer
        productCategoriesQuery={productCategoriesQuery}
        productsQuery={productsQuery}
        orientation={orientation}
      />
    );

    if (mode === "kiosk" && !this.props.type && !(qp && qp.id)) {
      return <PortraitView {...this.props} order={order} />;
    }

    if (mode === "kiosk") {
      return (
        <>
          <div className="headerKiosk">
            <img src="/images/headerKiosk.png" alt="type" />
          </div>
          <KioskMainContent mainHeight={items.length}>
            <KioskMenuContent>
              <MenuContent>{categories}</MenuContent>
            </KioskMenuContent>
            <KioskProductsContent>{products}</KioskProductsContent>
          </KioskMainContent>
          {items.length > 0 && (
            <FooterContent>
              <FooterCalculation
                orientation={orientation}
                totalAmount={totalAmount}
                addOrder={this.addOrder}
                setItems={this.setItems}
                editOrder={this.editOrder}
                setOrderState={this.setOrderState}
                onClickModal={this.toggleModal}
                items={items}
                changeItemCount={this.changeItemCount}
                changeItemIsTake={this.changeItemIsTake}
                config={currentConfig}
                order={order}
                type={type}
              />
            </FooterContent>
          )}

          <Modal
            enforceFocus={false}
            onHide={this.handleModal}
            show={showMenu}
            animation={false}
            size="lg"
          >
            {/* <Modal.Body>{this.renderKioskModalContent()}</Modal.Body> */}
          </Modal>
        </>
      );
    }

    return (
      <>
        <PosWrapper>
          <Row>
            <Col sm={3}>
              <MainContent numPadding={true}>
                <PosMenuContent>
                  {this.renderLogo()}
                  {categories}
                </PosMenuContent>
              </MainContent>
            </Col>
            <Col md={8}>
              <MainContent numPadding={true}>
                <ProductsContent>{this.renderProductBody()}</ProductsContent>
              </MainContent>
            </Col>
            <Col md={3}>
              <MainContent>
                <Calculation
                  orientation={orientation}
                  totalAmount={totalAmount}
                  addOrder={this.addOrder}
                  editOrder={this.editOrder}
                  setOrderState={this.setOrderState}
                  setItems={this.setItems}
                  onChangeProductBodyType={this.onChangeProductBodyType}
                  items={items}
                  changeItemCount={this.changeItemCount}
                  changeItemIsTake={this.changeItemIsTake}
                  productBodyType={this.state.productBodyType}
                  config={currentConfig}
                  order={order}
                  type={type}
                />
              </MainContent>
            </Col>
          </Row>
        </PosWrapper>
      </>
    );
  } // end render()
}
