import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import NameCard from "modules/common/components/nameCard/NameCard";
import AsyncComponent from "modules/common/components/AsyncComponent";
import { ICustomerParams, IOrder, IOrderItemInput } from "../types";
import { ORDER_TYPES } from "../../../constants";
import Calculation from "./Calculation";
import OrderSearch from "../containers/layout/OrderSearch";
import { IUser } from "modules/auth/types";
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
  LogoSection,
} from "../styles";
import { IConfig } from "types";
// import PaymentForm from './drawer/PaymentForm';
import CustomerForm from "./drawer/CustomerForm";
import ProductSearch from "../containers/ProductSearch";
// import { IPaymentParams } from '../containers/PosContainer';
import PortraitView from "./kiosk";
import { renderFullName } from "modules/common/utils";
import Icon from "modules/common/components/Icon";
import FooterCalculation from "./kiosk/FooterCalculation";
import SplitPaymentContainer from "../containers/SplitPaymentContainer";
import { Cards, TypeWrapper } from "./drawer/style";
import { __ } from "modules/common/utils";
import Tip from "modules/common/components/Tip";

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
  logout?: () => void;
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
  orderProps: any;
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

    const { order, type } = props;

    this.state = {
      items: order ? order.items : [],
      totalAmount: order ? getTotalAmount(order.items) : 0,
      showMenu: false,
      productBodyType: "product",
      type: type || (order && order.type ? order.type : ORDER_TYPES.EAT),
      modalContentType: "",
      customerId: order && order.customerId ? order.customerId : "",
      registerNumber: "",
      orderProps: {},
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

  onOrdersChange = (orderProps) => {
    this.setState({ orderProps });
  };

  renderOrderSearch() {
    const { orientation } = this.props;

    return (
      <OrderSearch
        orientation={orientation}
        onChange={this.onChangeProductBodyType}
      />
    );
  }

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
        <Tip placement="top" key={Math.random()} text="Settings">
          <Icon icon={"settings"} size={18} />
        </Tip>
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
        <Tip placement="top" key={Math.random()} text="Show kitchen screen">
          <Icon icon={"desktop"} size={20} />
        </Tip>
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
        <Tip placement="top" key={Math.random()} text="Show waiting screen">
          <Icon icon={"wallclock"} size={17} />
        </Tip>
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

    return (
      <>
        <FlexHeader>
          {this.renderCurrentLogin(
            currentConfig ? currentConfig.uiOptions : {}
          )}
          <ProductSearch productsQuery={productsQuery} />
        </FlexHeader>
        <Divider />
        <ProductsContainer
          setItems={this.setItems}
          items={items}
          productsQuery={productsQuery}
          orientation={orientation}
        />
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

  renderMainContent() {
    const { addCustomer, order } = this.props;
    const { productBodyType } = this.state;

    switch (productBodyType) {
      case "product": {
        return this.renderProduct();
      }
      case "payment": {
        if (order) {
          return (
            <SplitPaymentContainer
              order={order}
              onOrdersChange={this.onOrdersChange}
              onChangeProductBodyType={this.onChangeProductBodyType}
            />
          );
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
    const data = currentConfig ? currentConfig.uiOptions : {};

    return (
      <LogoSection color={data.colors ? data.colors.primary : ""}>
        <NavLink to={"/?home=true"}>
          <img src={data.logo} alt="logo11" />
        </NavLink>
        <div className="syncMenu">
          {this.renderSyncMenu()}
          {this.renderKitchenMenu()}
          {this.renderWaitingMenu()}
          <Tip placement="top" key={Math.random()} text="Logout">
            <Icon icon={"logout-2"} size={17} onClick={this.props.logout} />
          </Tip>
        </div>
      </LogoSection>
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
        mode={mode}
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
          <KioskMainContent>
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
                <ProductsContent>{this.renderMainContent()}</ProductsContent>
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
                  orderProps={this.state.orderProps}
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
