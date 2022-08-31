import Button from 'modules/common/components/Button';
import client from 'apolloClient';
import gql from 'graphql-tag';
import ModalTrigger from 'modules/common/components/ModalTrigger';
import OrderInfo from './splitPayment/OrderInfo';
import queries from '../graphql/queries';
import React from 'react';
import Select from 'react-select-plus';
import Stage from './Stage';
import styled, { css } from 'styled-components';
import styledTS from 'styled-components-ts';
import { __, Alert, confirm } from 'modules/common/utils';
import { ColumnBetween } from 'modules/common/styles/main';
import { ControlLabel, FormControl } from 'modules/common/components/form';
import { formatNumber } from 'modules/utils';
import { IConfig, IOption } from 'types';
import { ICustomer, IOrder, IOrderItemInput } from '../types';
import { ISlot } from '../../../types';
import { ORDER_STATUSES, ORDER_TYPES, POS_MODES } from '../../../constants';
import {
  Amount,
  CalculationHeader,
  Divid,
  Divider,
  // PaymentInfo,
  ProductLabel,
  Types
} from '../styles';

const Wrapper = styledTS<{ color?: string; showPayment?: boolean }>(styled.div)`
  padding: 0 10px 0 10px;
  height: 100%;
  position: relative;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.10);
  border-radius: 16px;
  background: #fff;
  overflow: auto;

  .ioevLe:checked + span:before, .hCqfzh .react-toggle--checked .react-toggle-track {
    background-color: ${props => props.color && props.color};
  }


  ${props =>
    props.showPayment &&
    css`
      &:before {
        content: '';
        background: rgba(0, 0, 0, 0.25);
        position: absolute;
        z-index: 2;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
    `}
`;

const ButtonWrapper = styledTS<{ showPayment?: boolean }>(styled.div)`
  > button {
    margin-bottom: 10px;
    margin-left: 0;
  }

  ${props =>
    props.showPayment &&
    css`
      background: #fff;
      z-index: 100;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 10px;
    `}
`;
const SelectOption = styled.div`
  margin-top: 10px;
`;

const generateLabel = customer => {
  const { firstName, primaryEmail, primaryPhone, lastName } =
    customer || ({} as ICustomer);

  let value = firstName ? firstName.toUpperCase() : '';

  if (lastName) {
    value = `${value} ${lastName}`;
  }
  if (primaryPhone) {
    value = `${value} (${primaryPhone})`;
  }
  if (primaryEmail) {
    value = `${value} /${primaryEmail}/`;
  }

  return value;
};

// get user options for react-select-plus
export const generateLabelOptions = (array: ICustomer[] = []): IOption[] => {
  return array.map(item => {
    const value = generateLabel(item);
    return { value: item._id, label: value };
  });
};

type Props = {
  orientation: string;
  totalAmount: number;
  setItems: (items: IOrderItemInput[]) => void;
  addOrder: (callback?: () => void) => void;
  onChangeProductBodyType: (type: string) => void;
  setOrderState: (name: string, value: any) => void;
  items: IOrderItemInput[];
  changeItemCount: (item: IOrderItemInput) => void;
  changeItemIsTake: (item: IOrderItemInput, value: boolean) => void;
  config: IConfig;
  editOrder: (callback?: () => void) => void;
  order: IOrder | null;
  type: string;
  productBodyType?: any;
  orderProps?: any;
  cancelOrder: (id: string) => void;
  slotCode: string;
  onChangeSlot: (value: string) => void;
  slots: ISlot[];
  changeOrderStatus: (doc) => void;
};

type State = {
  customerSearchValue: string;
  customerId: string;
  customerLabel: string;
  mode: string;
  cashAmount: number;
  companyName: string;
  registerNumber: string;
};

export default class Calculation extends React.Component<Props, State> {
  private timer?: NodeJS.Timer;

  constructor(props: Props) {
    super(props);

    const { order } = this.props;
    const customerId = order ? order.customerId : '';
    const customerLabel = order ? generateLabel(order.customer) : '';

    const mode = localStorage.getItem('erxesPosMode') || '';

    this.state = {
      customerSearchValue: '',
      customerId: customerId || '',
      customerLabel,
      mode,
      cashAmount: 0,
      companyName: '',
      registerNumber: ''
    };
  }
  
  onChange = value => {
    this.props.setOrderState('type', value);
  };

  renderReceiptButton() {
    const { order } = this.props;
    const { mode } = this.state;

    if (!order) {
      return null;
    }

    if (mode === POS_MODES.KIOSK) {
      return null;
    }

    return (
      <Button
        icon="print"
        btnStyle="warning"
        block
        onClick={() => {
          window.open(`/order-receipt/${order._id}`, '_blank');
        }}
      >
        {__('Print receipt')}
      </Button>
    );
  }

  renderSplitPaymentButton() {
    const {
      order,
      orderProps,
      addOrder,
      editOrder,
      onChangeProductBodyType,
      productBodyType,
      setItems,
      type,
      cancelOrder
    } = this.props;
    if (order && order.paidDate && order.status === ORDER_STATUSES.PAID) {
      return this.renderReceiptButton();
    }

    const isDisabled = orderProps
      ? orderProps.remainder !== 0
        ? true
        : false
      : false;

    const onClickPay = () => {
      const callback = () => onChangeProductBodyType('payment');
      if (order && order._id) {
        editOrder(callback);
      } else {
        addOrder(callback);
      }
    };

    const onClickSave = () => {
      if (order && order._id) {
        editOrder();
      } else {
        addOrder();
      };
    }

    const paymentDone = () => {
      onChangeProductBodyType('done');
    };

    const onCancelOrder = () => {
      if (order) {
        cancelOrder(order._id);
      }

      setItems([]);
      onChangeProductBodyType('product');
    };

    if (productBodyType === 'payment') {
      return (
        <Types>
          <Button style={{ background: '#616E7C' }} onClick={onCancelOrder}>
            {__('Cancel order')}
          </Button>
          <Button
            btnStyle="success"
            onClick={paymentDone}
            disabled={isDisabled}
          >
            {__('Payment')}
          </Button>
        </Types>
      );
    }

    return (
      <Types>
        {type === 'eat' ? (
          <Button
            style={{ background: '#9ba3ab' }}
            onClick={() => this.onChange(ORDER_TYPES.TAKE)}
          >
            {__('Take')}
          </Button>
        ) : (
          <Button
            style={{ background: '#616E7C' }}
            onClick={() => this.onChange(ORDER_TYPES.EAT)}
          >
            {__('Eat')}
          </Button>
        )}
        <Button btnStyle="success" onClick={onClickSave}>
          {__('Make an order')}
        </Button>
        <Button btnStyle="success" onClick={onClickPay}>
          {__('Pay the bill')}
        </Button>
      </Types>
    );
  }

  renderHeader(mode) {
    if (mode === 'kiosk') {
      return <></>;
    }

    const { onChangeProductBodyType, config } = this.props;
    const { customerLabel } = this.state;

    const color = config.uiOptions && config.uiOptions.colors.primary;

    const trigger = (
      <ProductLabel
        onClick={() => onChangeProductBodyType('orderSearch')}
        color={color}
      >
        {customerLabel ? customerLabel : __('Identify a customer')}
      </ProductLabel>
    );

    const content = props => this.renderCustomerChooser(props);

    return (
      <>
        <ProductLabel
          onClick={() => onChangeProductBodyType('orderSearch')}
          color={color}
        >
          {__('Find orders')}
        </ProductLabel>

        <ModalTrigger
          title={__('Identify a customer')}
          trigger={trigger}
          hideHeader={true}
          size="sm"
          paddingContent="less-padding"
          content={content}
        />
      </>
    );
  }

  renderCustomerChooser(props) {
    const { setOrderState } = this.props;

    const getCustomer = (value) => {
      props.closeModal();
      client
        .query({
          query: gql(queries.customerDetail),
          fetchPolicy: 'network-only',
          variables: {
            _id: value.trim()
          }
        })
        .then(async response => {
          const data = response.data.poscCustomerDetail;

          if (data && data._id) {
            this.setState({
              customerLabel: generateLabel(data),
              customerId: data._id
            });
            setOrderState('customerId', data._id);
          } else {
            confirm('Хэрэглэгч олдсонгүй, Хайлт зогсоох уу?')
              .then(() => {
                this.setState({ customerSearchValue: '' });
              })
              .catch(error => {
                Alert.error(error);
              });
          }
        })
        .catch(error => (console.log(error)));
    }

    const onChangeQrcode = e => {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      const beforeValue = `${this.state.customerSearchValue}`;
      const value = (e.currentTarget as HTMLInputElement).value || '';
      this.setState({ customerSearchValue: value });

      if (value.replace(beforeValue, '').length === 1) {
        return;
      }

      this.timer = setTimeout(() => {
        getCustomer(value)
      }, 20);
    };

    const onClearChosenCustomer = () => {
      this.setState({ customerLabel: '', customerId: '' });
      setOrderState('customerId', '');
    };

    const handleFocus = event => event.target.select();

    const onKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const value = (e.currentTarget as HTMLInputElement).value || '';
        getCustomer(value);
      }
    }

    return (
      <>
        <ControlLabel>{__('Identify a customer')}</ControlLabel>
        <FormControl
          {...props}
          autoFocus={true}
          id="customerIdInput"
          name="customerId"
          value={this.state.customerSearchValue}
          onChange={onChangeQrcode}
          onClick={onClearChosenCustomer}
          onFocus={handleFocus}
          onKeyPress={onKeyPress}
        />
      </>
    );
  }

  getRemainderAmount() {
    const { order } = this.props;

    return order
      ? order.totalAmount -
      ((order.cardAmount || 0) +
        (order.cashAmount || 0) +
        (order.mobileAmount || 0))
      : 0;
  }

  renderAmount(text: string, amount: number, color?: string) {
    const prop = { color };

    const { order, productBodyType, orderProps } = this.props;

    if ((order && order.paidDate) || productBodyType === 'payment') {
      return (
        <OrderInfo
          order={order}
          remainderAmount={orderProps ? orderProps.remainder : 0}
          companyName={orderProps ? orderProps.companyName : 0}
          registerNumber={orderProps ? orderProps.registerNumber : 0}
          color={prop.color}
        />
      );
    }

    return (
      <Amount {...prop}>
        <span>
          №: {order && order.number ? order.number.split('_')[1] : ''}
        </span>
        <span>{text}</span>
        {formatNumber(amount || 0)}₮
      </Amount>
    );
  }

  renderTotal(color) {
    const { totalAmount, orientation, items, productBodyType } = this.props;

    if (!items || items.length === 0) {
      return null;
    }

    const showPayment = productBodyType === 'payment';

    return (
      <ButtonWrapper
        className={orientation === 'portrait' ? 'payment-section' : ''}
        showPayment={showPayment}
      >
        {this.renderAmount(`${__('Total amount')}:`, totalAmount, color)}
        {this.renderSplitPaymentButton()}
      </ButtonWrapper>
    );
  }

  renderSlotOptions(slots) {
    return (slots || []).map(slot => {
      return {
        label: `${slot.code} - ${slot.name}`,
        value: slot.code
      };
    });
  }

  renderSlots() {
    const { slots } = this.props;
    if (!slots || !slots.length) {
      return (<Divider />);
    }

    return (
      <>
        <SelectOption>
          <Select
            placeholder="Pos Slot"
            options={this.renderSlotOptions(slots)}
            clearable={true}
            value={this.props.slotCode}
            onChange={({ value }) => this.props.onChangeSlot(value)}
          />
        </SelectOption>
        <Divid />
      </>
    )
  }

  render() {
    const {
      config,
      items,
      changeItemCount,
      changeItemIsTake,
      orientation,
      type,
      productBodyType,
    } = this.props;
    const { mode } = this.state;
    const color = config.uiOptions && config.uiOptions.colors.primary;

    const checkOrder = this.props.order || {} as IOrder;
    let newItems = items as IOrderItemInput[];
    if (Object.keys(checkOrder).length !== 0) {
      newItems = [];
      const orderItems = checkOrder.items as IOrderItemInput[];
      newItems = items.map( i => {
        let found = orderItems.find(
          c => c.productId === i.productId 
          && c._id === i._id
          && c.status !== i.status 
        )
        if (found) {
          i.status = found.status
          return i;
        }
        return i;
      })
    }
    return (
      <>
        <Wrapper color={color} showPayment={productBodyType === 'payment'}>
          <CalculationHeader>{this.renderHeader(mode)}</CalculationHeader>
          {this.renderSlots()}
          <ColumnBetween>
            <Stage
              orientation={orientation}
              items={newItems}
              changeItemCount={changeItemCount}
              changeItemIsTake={changeItemIsTake}
              options={config.uiOptions}
              type={type}
              mode={mode}
            />
            {this.renderTotal(color)}
          </ColumnBetween>
        </Wrapper>
      </>
    );
  } // end render()
}
