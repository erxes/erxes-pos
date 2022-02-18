import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NameCard from 'modules/common/components/nameCard/NameCard';
import AsyncComponent from 'modules/common/components/AsyncComponent';
import { ICustomerParams, IOrder, IOrderItemInput } from '../types';
import { ORDER_TYPES } from '../../../constants';
import Calculation from './Calculation';
import OrderSearch from '../containers/layout/OrderSearch';
import { IUser } from 'modules/auth/types';
import {
  PosWrapper,
  MainContent,
  FlexCustomer,
  MenuContent,
  ProductsContent,
  FlexHeader,
  Divider
} from '../styles';
import { IConfig } from 'types';
import PaymentForm from './drawer/PaymentForm';
import CustomerForm from './drawer/CustomerForm';
import ProductSearch from '../containers/ProductSearch';
import { IPaymentParams } from '../containers/PosContainer';
import PortraitView from './portrait';
import { renderFullName } from 'modules/common/utils';
import Icon from 'modules/common/components/Icon';
import { NavLink } from 'react-router-dom';
import { NavIcon } from 'modules/layout/styles';

const ProductsContainer = AsyncComponent(
  () => import(/* webpackChunkName: "Pos" */ '../containers/ProductsContainer')
);

const CategoriesContainer = AsyncComponent(
  () =>
    import(/* webpackChunkName: "Pos" */ '../containers/CategoriesContainer')
);

type Props = {
  createOrder: (params) => void;
  posCurrentUser: IUser;
  currentConfig: IConfig;
  order: IOrder | null;
  orientation: string;
  updateOrder: (params) => Promise<IOrder>;
  makePayment: (_id: string, params: IPaymentParams) => void;
  productCategoriesQuery: any;
  productsQuery: any;
  addCustomer: (params: ICustomerParams) => void;
  qp: any;
  setCardPaymentInfo: (params: any) => void;
  type?: string;
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

  for (const i of items || []) {
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
      type:
        this.props.type || (order && order.type ? order.type : ORDER_TYPES.EAT),
      drawerContentType: '',
      customerId: order && order.customerId ? order.customerId : '',
      registerNumber: ''
    };
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  setItems = (items: IOrderItemInput[]) => {
    this.setState({ items, totalAmount: getTotalAmount(items) });
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickOutside = event => {
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
    let items = this.state.items.map(i => {
      if (i.productId === item.productId && item._id === i._id) {
        i.count = item.count;
      }

      return i;
    });

    items = items.filter(i => i.count > 0);

    const totalAmount = getTotalAmount(items);

    this.setState({ items, totalAmount });
  };

  changeItemIsTake = (item: IOrderItemInput, value: boolean) => {
    const { type, items } = this.state;
    if (type !== ORDER_TYPES.EAT) {
      this.setState({ items: items.map(i => ({ ...i, isTake: true })) });
      return;
    }

    this.setState({
      items: items.map(i => (item._id === i._id ? { ...i, isTake: value } : i))
    });
  };

  // set state field that doesn't need amount calculation
  setOrderState = (name: string, value: any) => {
    this.setState({ [name]: value } as Pick<State, keyof State>);

    if (name === 'type') {
      const { items } = this.state;
      const isTake = value !== ORDER_TYPES.EAT;
      this.setState({ items: items.map(i => ({ ...i, isTake })) });
    }
  };

  addOrder = () => {
    const { createOrder } = this.props;
    const { totalAmount, type, items, customerId } = this.state;

    const currentItems = items.map(item => ({
      _id: item._id,
      productId: item.productId,
      count: item.count,
      unitPrice: item.unitPrice,
      isPackage: item.isPackage,
      isTake: type !== ORDER_TYPES.EAT ? true : item.isTake
    }));

    createOrder({ items: currentItems, totalAmount, type, customerId });
  };

  editOrder = () => {
    const { updateOrder, order } = this.props;
    const { totalAmount, type, items, customerId } = this.state;

    if (order && order._id) {
      const currentItems = items.map(item => ({
        _id: item._id,
        productId: item.productId,
        count: item.count,
        unitPrice: item.unitPrice,
        isPackage: item.isPackage,
        isTake: type !== ORDER_TYPES.EAT ? true : item.isTake
      }));

      updateOrder({
        _id: order._id,
        items: currentItems,
        totalAmount,
        type,
        customerId
      }).then(updatedOrder => {
        this.setState({
          items: updatedOrder.items,
          totalAmount: getTotalAmount(updatedOrder.items)
        });
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
      orientation
    } = this.props;
    const { drawerContentType, totalAmount } = this.state;

    switch (drawerContentType) {
      case 'order':
        return <OrderSearch />;
      case 'payment':
        return (
          order && (
            <PaymentForm
              orderId={order ? order._id : ''}
              options={currentConfig ? currentConfig.uiOptions : {}}
              totalAmount={totalAmount}
              closeDrawer={this.toggleDrawer}
              makePayment={makePayment}
              order={order}
              setCardPaymentInfo={setCardPaymentInfo}
              orientation={orientation}
            />
          )
        );
      case 'customer':
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

  renderCurrentLogin(uiOptions) {
    const mode = localStorage.getItem('erxesPosMode');
    const { order } = this.props;

    if (mode === 'kiosk') {
      if (order && order.customer) {
        const customer = order.customer;

        return (
          <>
            <Icon
              icon="home"
              onClick={() => {
                window.location.href = '/';
              }}
              size={36}
              color={uiOptions.colors ? uiOptions.colors.primary : ''}
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
            window.location.href = '/';
          }}
          size={36}
          color={uiOptions.colors ? uiOptions.colors.primary : ''}
        />
      );
    }

    const { posCurrentUser } = this.props;

    return <NameCard user={posCurrentUser} avatarSize={40} />;
  }

  renderSyncMenu() {
    const { posCurrentUser } = this.props;

    if (!posCurrentUser) {
      return '';
    }

    if (localStorage.getItem('erxesPosMode')) {
      return '';
    }

    return (
      <NavLink to="/settings">
        <NavIcon className={'icon-sync-exclamation'} />
      </NavLink>
    );
  }

  renderKitchenMenu() {
    const { posCurrentUser, currentConfig } = this.props;

    if (!posCurrentUser || !currentConfig) {
      return '';
    }

    if (!currentConfig.kitchenScreen) {
      return '';
    }

    if (!['', 'kitchen'].includes(localStorage.getItem('erxesPosMode') || '')) {
      return '';
    }

    return (
      <NavLink to="/kitchen-screen">
        <NavIcon className={'icon-wallclock'} />
      </NavLink>
    );
  }

  renderWaitingMenu() {
    const { posCurrentUser, currentConfig } = this.props;

    if (!posCurrentUser || !currentConfig) {
      return '';
    }

    if (!currentConfig.waitingScreen) {
      return '';
    }

    if (!['', 'waiting'].includes(localStorage.getItem('erxesPosMode') || '')) {
      return '';
    }

    return (
      <NavLink to="/waiting-screen">
        <NavIcon className={'icon-presentation'} />
      </NavLink>
    );
  }

  render() {
    const {
      currentConfig,
      order,
      orientation,
      productCategoriesQuery,
      productsQuery,
      qp
    } = this.props;

    console.log('currentConfig.uiOptions', currentConfig);

    const { items, totalAmount, showMenu, type } = this.state;

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

    const mode = localStorage.getItem('erxesPosMode');

    if (mode === 'kiosk' && !this.props.type && !(qp && qp.id)) {
      return <PortraitView {...this.props} order={order} />;
    }

    return (
      <>
        <PosWrapper>
          <Row>
            <Col sm={3}>
              <MainContent numPadding={true}>
                <MenuContent>
                  <NavLink to="/">
                    <img src={currentConfig.uiOptions.logo} alt="logo11" />
                  </NavLink>
                  {categories}
                </MenuContent>
              </MainContent>
            </Col>
            <Col md={8}>
              <MainContent numPadding={true}>
                <ProductsContent>
                  {showMenu === true ? (
                    this.renderDrawerContent()
                  ) : (
                    <>
                      <FlexHeader>
                        {this.renderCurrentLogin(
                          currentConfig ? currentConfig.uiOptions : {}
                        )}
                        {this.renderSyncMenu()}
                        {this.renderKitchenMenu()}
                        {this.renderWaitingMenu()}
                        <ProductSearch productsQuery={productsQuery} />
                      </FlexHeader>
                      <Divider />
                      {products}
                    </>
                  )}
                </ProductsContent>
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
                  onClickDrawer={this.toggleDrawer}
                  items={items}
                  changeItemCount={this.changeItemCount}
                  changeItemIsTake={this.changeItemIsTake}
                  config={currentConfig}
                  order={order}
                  type={type}
                />
              </MainContent>
            </Col>
          </Row>
        </PosWrapper>

        {/* <Drawer show={showMenu}>
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
                  innerWidth={window.innerWidth}
                >
                  {this.renderDrawerContent()}
                </DrawerContent>
              </LeftMenuContainer>
            </RTG.CSSTransition>
          </div>
        </Drawer> */}
      </>
    );
  } // end render()
}
