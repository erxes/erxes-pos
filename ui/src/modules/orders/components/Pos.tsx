import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NameCard from "modules/common/components/nameCard/NameCard";
import AsyncComponent from "modules/common/components/AsyncComponent";
import RTG from "react-transition-group";
import { ICustomerParams, IOrder, IOrderItemInput } from "../types";
import { ORDER_TYPES } from "../../../constants";
import Calculation from "./Calculation";
import OrderSearch from "../containers/layout/OrderSearch";
import { IUser } from "modules/auth/types";
import {
  PosWrapper,
  MainContent,
  LeftMenuContainer,
  Drawer,
  DrawerContent,
} from "../styles";
import { FlexBetween } from "modules/common/styles/main";
import { IConfig } from "types";
import PaymentForm from "./drawer/PaymentForm";
import CustomerForm from "./drawer/CustomerForm";
import ProductSearch from "../containers/ProductSearch";
import { IPaymentParams } from "../containers/PosContainer";
import PortraitView from "./portrait";

const ProductsContainer = AsyncComponent(
  () => import(/* webpackChunkName: "Pos" */ "../containers/ProductsContainer")
);

type Props = {
  createOrder: (params) => void;
  posCurrentUser: IUser;
  currentConfig: IConfig;
  order: IOrder | null;
  orientation: string;
  updateOrder: (params) => void;
  makePayment: (_id: string, params: IPaymentParams) => void;
  productCategoriesQuery: any;
  productsQuery: any;
  addCustomer: (params: ICustomerParams) => void;
  qp: any;
  setCardPaymentInfo: (params: any) => void;
};

type State = {
  items: IOrderItemInput[];
  totalAmount: number;
  type: string;
  drawerContentType: string;
  showMenu: boolean;
  customerId: string;
  registerNumber: string;
};

const getTotalAmount = (items: IOrderItemInput[]) => {
  let total = 0;

  for (const i of items) {
    total += (i.unitPrice || 0) * i.count;
  }

  return total;
};

export default class Pos extends React.Component<Props, State> {
  private wrapperRef;

  constructor(props: Props) {
    super(props);

    const { order } = props;

    this.state = {
      items: order ? order.items : [],
      totalAmount: order ? getTotalAmount(order.items) : 0,
      showMenu: false,
      type: order && order.type ? order.type : ORDER_TYPES.EAT,
      drawerContentType: "",
      customerId: order && order.customerId ? order.customerId : "",
      registerNumber: "",
    };
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  setItems = (items: IOrderItemInput[]) => {
    this.setState({ items, totalAmount: getTotalAmount(items) });
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = (event) => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      this.state.showMenu
    ) {
      this.setState({ showMenu: false });
    }
  };

  toggleDrawer = (drawerContentType: string) => {
    this.setState({ showMenu: !this.state.showMenu, drawerContentType });
  };

  changeItemCount = (item: IOrderItemInput) => {
    let items = this.state.items.map((i) => {
      if (i.productId === item.productId) {
        i.count = item.count;
      }

      return i;
    });

    items = items.filter((i) => i.count > 0);

    const totalAmount = getTotalAmount(items);

    this.setState({ items, totalAmount });
  };

  // set state field that doesn't need amount calculation
  setOrderState = (name: string, value: any) => {
    this.setState({ [name]: value } as Pick<State, keyof State>);
  };

  addOrder = () => {
    const { createOrder } = this.props;
    const { totalAmount, type, items, customerId } = this.state;

    const currentItems = items.map((item) => ({
      _id: item._id,
      productId: item.productId,
      count: item.count,
      unitPrice: item.unitPrice,
    }));

    createOrder({ items: currentItems, totalAmount, type, customerId });
  };

  editOrder = () => {
    const { updateOrder, order } = this.props;
    const { totalAmount, type, items, customerId } = this.state;

    if (order && order._id) {
      const currentItems = items.map((item) => ({
        _id: item._id,
        productId: item.productId,
        count: item.count,
        unitPrice: item.unitPrice,
        isPackage: item.isPackage,
      }));

      updateOrder({
        _id: order._id,
        items: currentItems,
        totalAmount,
        type,
        customerId,
      });
    }
  };

  renderDrawerContent() {
    const {
      currentConfig,
      makePayment,
      order,
      addCustomer,
      setCardPaymentInfo,
    } = this.props;
    const { drawerContentType, totalAmount } = this.state;

    switch (drawerContentType) {
      case "order":
        return <OrderSearch />;
      case "payment":
        return (
          order && (
            <PaymentForm
              orderId={order ? order._id : ""}
              options={currentConfig ? currentConfig.uiOptions : {}}
              totalAmount={totalAmount}
              closeDrawer={this.toggleDrawer}
              makePayment={makePayment}
              order={order}
              setCardPaymentInfo={setCardPaymentInfo}
            />
          )
        );
      case "customer":
        return (
          <CustomerForm
            addCustomer={addCustomer}
            toggleDrawer={this.toggleDrawer}
          ></CustomerForm>
        );
      default:
        return null;
    }
  }

  render() {
    const {
      posCurrentUser,
      currentConfig,
      order,
      orientation,
      productCategoriesQuery,
      productsQuery,
      setCardPaymentInfo,
    } = this.props;

    const { items, totalAmount, showMenu, type, customerId } = this.state;

    const products = (
      <ProductsContainer
        setItems={this.setItems}
        items={items}
        productCategoriesQuery={productCategoriesQuery}
        productsQuery={productsQuery}
        orientation={orientation}
      />
    );

    if (orientation === "portrait") {
      return (
        <PortraitView
          {...this.props}
          products={products}
          items={items}
          changeItemCount={this.changeItemCount}
          totalAmount={totalAmount}
          addOrder={this.addOrder}
          editOrder={this.editOrder}
          order={order}
          setOrderState={this.setOrderState}
          customerId={customerId}
          setCardPaymentInfo={setCardPaymentInfo}
        />
      );
    }

    return (
      <>
        <PosWrapper>
          <Row>
            <Col md={9} className="kk">
              <MainContent hasBackground={true}>
                <FlexBetween>
                  <NameCard user={posCurrentUser} avatarSize={40} />
                  <ProductSearch productsQuery={productsQuery} />
                </FlexBetween>
                {products}
              </MainContent>
            </Col>
            <Col sm={3}>
              <MainContent
                hasBackground={true}
                hasShadow={true}
                noPadding={true}
              >
                <Calculation
                  totalAmount={totalAmount}
                  addOrder={this.addOrder}
                  editOrder={this.editOrder}
                  setOrderState={this.setOrderState}
                  onClickDrawer={this.toggleDrawer}
                  items={items}
                  changeItemCount={this.changeItemCount}
                  config={currentConfig}
                  order={order}
                  type={type}
                />
              </MainContent>
            </Col>
          </Row>
        </PosWrapper>

        <Drawer show={showMenu}>
          <div ref={this.setWrapperRef}>
            <RTG.CSSTransition
              in={showMenu}
              timeout={300}
              classNames="slide-in-left"
              unmountOnExit={true}
            >
              <LeftMenuContainer>
                <DrawerContent
                  options={currentConfig ? currentConfig.uiOptions : {}}
                >
                  {this.renderDrawerContent()}
                </DrawerContent>
              </LeftMenuContainer>
            </RTG.CSSTransition>
          </div>
        </Drawer>
      </>
    );
  } // end render()
}
