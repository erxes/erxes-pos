import Button from 'modules/common/components/Button';
import client from 'apolloClient';
import gql from 'graphql-tag';
import queries from '../graphql/queries';
import React from 'react';
import Stage from './Stage';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import { __ } from 'modules/common/utils';
import { ColumnBetween } from 'modules/common/styles/main';
import { formatNumber } from 'modules/utils';
import { FormControl } from 'modules/common/components/form';
import { IConfig, IOption } from 'types';
import { ICustomer, IOrder, IOrderItemInput } from '../types';
import { Amount, FinderButtons, ProductLabel, Types } from '../styles';
import { ORDER_TYPES, ORDER_STATUSES, POS_MODES } from '../../../constants';
import OrderInfo from './splitPayment/OrderInfo';

const Wrapper = styledTS<{ color?: string }>(styled.div)`
  display: flex;
  flex-direction: column;
  padding: 0 5px 0 5px;
  height: 100%;
  box-shadow: 0px 2px 4px rgb(0 0 0 / 25%);
  border-radius: 16px;
  background: #fff;
  overflow: auto;

  button {
    padding: 10px 20px;
    border-radius: 8px;
  }

  .ioevLe:checked + span:before, .hCqfzh .react-toggle--checked .react-toggle-track {
    background-color: ${props => props.color && props.color};
  }
`;

const ButtonWrapper = styled.div`
  margin-bottom: 30px;

  > button {
    margin-bottom: 10px;
    margin-left: 0;
  }
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
  addOrder: (callback?: () => void) => void;
  onChangeProductBodyType: (type: string) => void;
  setOrderState: (name: string, value: any) => void;
  onClickDrawer: (drawerContentType: string) => void;
  items: IOrderItemInput[];
  changeItemCount: (item: IOrderItemInput) => void;
  changeItemIsTake: (item: IOrderItemInput, value: boolean) => void;
  config: IConfig;
  editOrder: () => void;
  order: IOrder | null;
  type: string;
};

type State = {
  customerId: string;
  customerLabel: string;
  stageHeight: number;
  mode: string;
  cashAmount: number;
  companyName: string;
  registerNumber: string;
};

export default class Calculation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { order, orientation } = this.props;
    const customerId = order ? order.customerId : '';
    const customerLabel = order ? generateLabel(order.customer) : '';

    let stageHeight = window.innerHeight - 120; // types title
    const mode = localStorage.getItem('erxesPosMode') || '';

    console.log('stageHeight', stageHeight);

    if (mode === '') {
      stageHeight -= 45; // findOrder
    }
    stageHeight -= 78; // customer

    if (orientation === 'portrait') {
      stageHeight -= 135; // amount
      stageHeight -= mode === 'kiosk' ? 0 : 125; // printButton
      stageHeight -= order && order.paidDate ? 0 : 100; // oneButton
    } else {
      stageHeight -= 52; // amount
      stageHeight -= mode === 'kiosk' ? 0 : 50; // printButton
      stageHeight -= order && order.paidDate ? 0 : 50; // oneButton
    }

    if (stageHeight < 50) {
      stageHeight = 50;
    }
    this.state = {
      customerId: customerId || '',
      customerLabel,
      stageHeight,
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
    const { order, config, addOrder, onChangeProductBodyType } = this.props;

    if (order && order.paidDate && order.status === ORDER_STATUSES.PAID) {
      return null;
    }

    const onClick = () => {
      const callback = () => onChangeProductBodyType('payment');

      addOrder(callback);
    };

    return (
      <Types>
        <Button
          btnStyle="primary"
          onClick={() => this.onChange(ORDER_TYPES.TAKE)}
          icon="check-circle"
        >
          {__('Take')}
        </Button>
        <Button
          style={{ backgroundColor: config.uiOptions.colors.primary }}
          onClick={onClick}
          icon="check-circle"
        >
          {__('Payment')}
        </Button>
      </Types>
    );
  }

  renderFindOrder(mode) {
    if (mode === 'kiosk') {
      return <></>;
    }

    const { onChangeProductBodyType, config } = this.props;
    const color = config.uiOptions && config.uiOptions.colors.primary;
    return (
      <>
        <ProductLabel
          onClick={() => onChangeProductBodyType('orderSearch')}
          color={color}
        >
          {__('Find orders')}
        </ProductLabel>
        <ProductLabel
          onClick={() => {
            mode !== 'kiosk' && onChangeProductBodyType('customer');
          }}
          color={color}
        >
          {__('Identify a customer')}
        </ProductLabel>
      </>
    );
  }

  renderCustomerChooser() {
    const { setOrderState } = this.props;

    const onChangeQrcode = e => {
      const value = (e.currentTarget as HTMLInputElement).value || '';
      client
        .query({
          query: gql(queries.customerDetail),
          fetchPolicy: 'network-only',
          variables: {
            _id: value.trim()
          }
        })
        .then(async response => {
          const data = response.data.customerDetail;
          this.setState({
            customerLabel: generateLabel(data),
            customerId: data._id
          });
          setOrderState('customerId', data._id);
        })
        .catch(error => {});
    };

    const onClearChosenCustomer = () => {
      this.setState({ customerLabel: '', customerId: '' });
      setOrderState('customerId', '');
    };

    return (
      <FormControl
        autoFocus={true}
        id="customerIdInput"
        name="customerId"
        value={this.state.customerLabel}
        onChange={onChangeQrcode}
        onClick={onClearChosenCustomer}
      />
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

    const { order } = this.props;

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

  renderOrderInfo() {
    const { order } = this.props;
    const { cashAmount, companyName, registerNumber } = this.state;
    console.log('cashAmount', cashAmount);

    if (!order) {
      return null;
    }

    return (
      <OrderInfo
        order={order}
        remainderAmount={this.getRemainderAmount() - cashAmount}
        companyName={companyName}
        registerNumber={registerNumber}
      />
    );
  }

  render() {
    const {
      totalAmount,
      config,
      items,
      changeItemCount,
      changeItemIsTake,
      orientation,
      type
    } = this.props;
    const { mode } = this.state;
    const color = config.uiOptions && config.uiOptions.colors.primary;

    return (
      <>
        <Wrapper color={color}>
          <FinderButtons>{this.renderFindOrder(mode)}</FinderButtons>
          {this.renderCustomerChooser()}
          <ColumnBetween>
            <Stage
              orientation={orientation}
              items={items}
              changeItemCount={changeItemCount}
              changeItemIsTake={changeItemIsTake}
              options={config.uiOptions}
              stageHeight={this.state.stageHeight}
              type={type}
              mode={mode}
            />
            <ButtonWrapper
              className={orientation === 'portrait' ? 'payment-section' : ''}
            >
              {this.renderAmount(`${__('Total amount')}:`, totalAmount, color)}
              {this.renderOrderInfo()}
              {this.renderSplitPaymentButton()}
              {/* {this.renderReceiptButton()} */}
            </ButtonWrapper>
          </ColumnBetween>
        </Wrapper>
      </>
    );
  } // end render()
}
