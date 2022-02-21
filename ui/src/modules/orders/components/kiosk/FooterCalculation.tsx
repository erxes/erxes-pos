import Button from 'modules/common/components/Button';
import React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import { __ } from 'modules/common/utils';
import { ColumnBetween, FlexBetween } from 'modules/common/styles/main';
import { formatNumber } from 'modules/utils';
import { IConfig, IOption } from 'types';
import { ICustomer, IOrder, IOrderItemInput } from 'modules/orders/types';
import Stage from '../Stage';

const Wrapper = styledTS<{ color?: string }>(styled.div)`
  position: fixed;
  width: 100%;
  height: 286px;
  left: 0px;
  top: 1634px;
  background: #F5F5F5;

  button {
    padding: 10px 20px;
    border-radius: 8px;
  }

  .ioevLe:checked + span:before, .hCqfzh .react-toggle--checked .react-toggle-track {
    background-color: ${props => props.color && props.color};
  }
`;

export const Amount = styledTS<{ color?: string }>(styled(FlexBetween))`
  border: 1px solid #cbd2d9;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  font-weight: 600;
  border-color:${props => props.color && props.color}
  color:${props => props.color && props.color}
  height: 70px;
  margin-bottom: 40px;
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

    const { order } = this.props;
    const customerId = order ? order.customerId : '';
    const customerLabel = order ? generateLabel(order.customer) : '';

    let stageHeight = 100; // types title
    const mode = localStorage.getItem('erxesPosMode') || '';

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

    if (mode === 'kiosk') {
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

  renderPaymentButton() {
    const { order, onClickDrawer, config, totalAmount, editOrder } = this.props;

    if (!order || (order && order.paidDate)) {
      return null;
    }

    const onClick = () => {
      editOrder();

      onClickDrawer('payment');
    };

    return (
      <Button
        style={{ backgroundColor: config.uiOptions.colors.primary }}
        onClick={onClick}
        icon="dollar-alt"
        block
        disabled={!totalAmount || totalAmount === 0 ? true : false}
      >
        {__('Pay the bill')}
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

  render() {
    const {
      totalAmount,
      config,
      items,
      changeItemCount,
      orientation,
      type,
      changeItemIsTake
    } = this.props;
    const { mode } = this.state;
    const color = config.uiOptions && config.uiOptions.colors.primary;

    return (
      <>
        <Wrapper color={color}>
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
              {this.renderReceiptButton()}
              {this.renderPaymentButton()}
            </ButtonWrapper>
          </ColumnBetween>
        </Wrapper>
      </>
    );
  } // end render()
}
