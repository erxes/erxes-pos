import Button from 'modules/common/components/Button';
import client from 'apolloClient';
import gql from 'graphql-tag';
import queries from '../graphql/queries';
import React from 'react';
import Stage from './Stage';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import { __ } from 'modules/common/utils';
import { ColumnBetween, FlexBetween } from 'modules/common/styles/main';
import { formatNumber } from 'modules/utils';
import { FormControl } from 'modules/common/components/form';
import { IConfig, IOption } from 'types';
import { ICustomer, IOrder, IOrderItemInput } from '../types';
import { FinderButtons, ProductLabel, Types } from '../styles';
import { colors } from 'modules/common/styles';
import { ORDER_TYPES, ORDER_STATUSES, POS_MODES } from '../../../constants';

const Wrapper = styledTS<{ color?: string }>(styled.div)`
  display: flex;
  flex-direction: column;
  padding: 0 20px 0 20px;
  height: 100%;
  box-shadow: 0px 2px 4px rgb(0 0 0 / 25%);
  border-radius: 16px;
  background: #fff;

  button {
    padding: 10px 20px;
    border-radius: 8px;
  }

  .ioevLe:checked + span:before, .hCqfzh .react-toggle--checked .react-toggle-track {
    background-color: ${props => props.color && props.color};
  }
`;

export const Amount = styledTS<{ isPortrait?: boolean; color?: string }>(
  styled(FlexBetween)
)`
  border: 1px solid ${props => props.color};
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  font-weight: ${props => (props.isPortrait ? '' : '600')}
  border-color:${props => props.color && props.color}
  color:${props => (props.isPortrait ? colors.colorCoreBlack : props.color)}
  height: ${props => (props.isPortrait ? ' 115px' : '70px')}
  margin-bottom: 40px;
  display: ${props => (props.isPortrait ? ' block' : '')};

  .total-wrapper {
    text-align: center;
    display: flex;
    justify-content: space-between;

    span {
      font-weight: 600;
    }
  }

  .amount-wrapper {
    text-align: center;
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;

    span {
      font-weight: 600;
    }
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
  addOrder: (params: any) => void;
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
};

export default class Calculation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { order, orientation } = this.props;
    const customerId = order ? order.customerId : '';
    const customerLabel = order ? generateLabel(order.customer) : '';

    let stageHeight = window.innerHeight - 120; // types title
    const mode = localStorage.getItem('erxesPosMode') || '';

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
      mode
    };
  }

  onChange = value => {
    this.props.setOrderState('type', value);
  };

  renderReceiptButton() {
    const { order } = this.props;

    if (!order) {
      return null;
    }
    const { mode } = this.state;

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
    const { order, config, editOrder, onChangeProductBodyType } = this.props;

    if (
      !order ||
      (order && order.paidDate && order.status === ORDER_STATUSES.PAID)
    ) {
      return null;
    }

    const onClick = () => {
      editOrder();

      onChangeProductBodyType('payment');
    };

    return (
      <Button
        style={{ backgroundColor: config.uiOptions.colors.primary }}
        onClick={onClick}
        icon="dollar-alt"
        block
      >
        {__('Payment')}
      </Button>
    );
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

  renderAddButton() {
    const { addOrder, order } = this.props;

    if (order && order._id) {
      return null;
    }

    return (
      <Types>
        <Button
          btnStyle="primary"
          onClick={() => this.onChange(ORDER_TYPES.TAKE)}
          icon="check-circle"
        >
          {__('Take')}
        </Button>
        <Button btnStyle="success" onClick={addOrder} icon="check-circle">
          {__('Make an order')}
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
              {this.renderAddButton()}
              {/* {this.renderReceiptButton()} */}
              {this.renderSplitPaymentButton()}
            </ButtonWrapper>
          </ColumnBetween>
        </Wrapper>
      </>
    );
  } // end render()
}
