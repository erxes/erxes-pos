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

const ProductsContainer = AsyncComponent(
  () => import(/* webpackChunkName: "Pos" */ "../containers/ProductsContainer")
);

type Props = {
  makePayment: (params) => void;
  currentUser: IUser;
  currentConfig: IConfig;
  order: IOrder | null;
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

    this.state = {
      items: [],
      totalAmount: 0,
      showMenu: false,
      type: ORDER_TYPES.EAT,
      drawerContentType: "",
      customerId: ""
    };
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  setItems = (items: IOrderItemInput[]) => {
    let total = getTotalAmount(items);

    this.setState({ items, totalAmount: total });
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

  makePayment = () => {
    const { makePayment } = this.props;
    const { totalAmount, type, items, customerId } = this.state;

    const currentItems = items.map((item) => ({
      productId: item.productId,
      count: item.count,
      unitPrice: item.unitPrice,
    }));

    makePayment({ items: currentItems, totalAmount, type, customerId });
  };

  renderDrawerContent() {
    const { currentConfig } = this.props;
    const { drawerContentType, totalAmount } = this.state;

    if (drawerContentType === "order") {
      return (
        <OrderSearch options={currentConfig.uiOptions} />
      );
    }

    if (drawerContentType === "payment") {
      return (
        <PaymentForm
          options={currentConfig ? currentConfig.uiOptions : {}}
          totalAmount={totalAmount}
          closeDrawer={this.toggleDrawer}
        />
      );
    }

    return <div>empty content</div>;
  }

  render() {
    const { currentUser, currentConfig } = this.props;
    const { items, totalAmount, showMenu } = this.state;

    return (
      <>
        <PosContainer>
          <Row>
            <Col md={6}>
              <MainContent hasBackground={true}>
                <FlexBetween>
                  <NameCard user={currentUser} avatarSize={40} />
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
                  makePayment={this.makePayment}
                  setOrderState={this.setOrderState}
                  onClickDrawer={this.toggleDrawer}
                  options={currentConfig ? currentConfig.uiOptions : {}}
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
                <DrawerContent>{this.renderDrawerContent()}</DrawerContent>
              </LeftMenuContainer>
            </RTG.CSSTransition>
          </div>
        </Drawer>
      </>
    );
  }
}
