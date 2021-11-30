import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NameCard from "modules/common/components/nameCard/NameCard";
import AsyncComponent from "modules/common/components/AsyncComponent";
import RTG from "react-transition-group";
import { IOrder, IOrderItemInput } from "../types";
import { ORDER_TYPES } from "../../../constants";
import Stage from "./Stage";
import Calculation from "./Calculation";
import OrderSearch from "../containers/layout/OrderSearch";
import { IUser } from "modules/auth/types";
import {
  PosContainer,
  MainContent,
  LeftMenuContainer,
  Drawer,
  DrawerContent,
} from "../styles";
import { FlexBetween } from "modules/common/styles/main";
import { IConfig } from "types";
import PaymentForm from "./drawer/PaymentForm";
import ProductSearch from "../containers/ProductSearch";

const ProductsContainer = AsyncComponent(
  () => import(/* webpackChunkName: "Pos" */ "../containers/ProductsContainer")
);

type Props = {
  createOrder: (params) => void;
  currentUser: IUser;
  currentConfig: IConfig;
  order: IOrder | null;
  updateOrder: (params) => void;
  makePayment: (params) => void;
};

type State = {
  items: IOrderItemInput[];
  totalAmount: number;
  type: string;
  drawerContentType: string;
  showMenu: boolean;
  customerId: string;
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
    const excludedList = this.state.items.filter(
      (i) => i.productId !== item.productId
    );

    const items = [...excludedList];

    if (item.count > 0) {
      items.push(item);
    }

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
    const { currentConfig, makePayment } = this.props;
    const { drawerContentType, totalAmount } = this.state;

    switch (drawerContentType) {
      case "order":
        return <OrderSearch />;
      case "payment":
        return (
          <PaymentForm
            options={currentConfig ? currentConfig.uiOptions : {}}
            totalAmount={totalAmount}
            closeDrawer={this.toggleDrawer}
            makePayment={makePayment}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const { currentUser, currentConfig, order } = this.props;
    const { items, totalAmount, showMenu, type } = this.state;

    return (
      <>
        <PosContainer>
          <Row>
            <Col md={6}>
              <MainContent hasBackground={true}>
                <FlexBetween>
                  <NameCard user={currentUser} avatarSize={40} />
                  <ProductSearch />
                </FlexBetween>
                <ProductsContainer setItems={this.setItems} items={items} />
              </MainContent>
            </Col>
            <Col sm={3}>
              <MainContent noPadding={true}>
                <Stage
                  items={items}
                  changeItemCount={this.changeItemCount}
                  onClickDrawer={this.toggleDrawer}
                  options={currentConfig ? currentConfig.uiOptions : {}}
                />
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
                  options={currentConfig ? currentConfig.uiOptions : {}}
                  order={order}
                  type={type}
                />
              </MainContent>
            </Col>
          </Row>
        </PosContainer>

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
  }
}
