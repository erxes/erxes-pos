import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import FormGroup from "modules/common/components/form/Group";
import SelectWithSearch from "modules/common/components/SelectWithSearch";
import { __ } from "modules/common/utils";
import { IConfig, IOption } from "types";
import { ORDER_TYPES } from "../../../constants";
import { StageContent, ProductLabel, Types, Type } from "../styles";
import ControlLabel from "modules/common/components/form/Label";
import { FlexBetween, ColumnBetween } from "modules/common/styles/main";
import { formatNumber } from "modules/utils";
import Button from "modules/common/components/Button";
import { ICustomer, IOrder, IOrderItemInput } from "../types";
import queries from "../graphql/queries";
import Stage from "./Stage";

const Wrapper = styledTS<{ color?: string }>(styled.div)`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 100%;

  button {
    padding: 10px 20px;
    border-radius: 8px;
  }

  .ioevLe:checked + span:before, .hCqfzh .react-toggle--checked .react-toggle-track {
    background-color: ${(props) => props.color && props.color};
  }
`;

export const Amount = styledTS<{ color?: string }>(styled(FlexBetween))`
  border: 1px solid #cbd2d9;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  font-weight: 600;
  border-color:${(props) => props.color && props.color}
  color:${(props) => props.color && props.color}
`;

const ButtonWrapper = styled.div`
  margin-bottom: 30px;

  > button {
    margin-bottom: 10px;
    margin-left: 0;
  }
`;

// get user options for react-select-plus
export const generateLabelOptions = (array: ICustomer[] = []): IOption[] => {
  return array.map((item) => {
    const { _id, firstName, primaryEmail, primaryPhone, lastName } =
      item || ({} as ICustomer);

    let value = firstName ? firstName.toUpperCase() : "";

    if (lastName) {
      value = `${value} ${lastName}`;
    }
    if (primaryPhone) {
      value = `${value} (${primaryPhone})`;
    }
    if (primaryEmail) {
      value = `${value} /${primaryEmail}/`;
    }

    return { value: _id, label: value };
  });
};

type Props = {
  totalAmount: number;
  addOrder: (params: any) => void;
  setOrderState: (name: string, value: any) => void;
  onClickDrawer: (drawerContentType: string) => void;
  items: IOrderItemInput[];
  changeItemCount: (item: IOrderItemInput) => void;
  config: IConfig;
  editOrder: () => void;
  order: IOrder | null;
  type: string;
};

type State = {
  customerId: string;
};

export default class Calculation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      customerId: "",
    };
  }

  onChange = (value) => {
    this.props.setOrderState("type", value);
  };

  renderAddButton() {
    const { addOrder, order } = this.props;

    if (order && order._id) {
      return null;
    }

    return (
      <Button btnStyle="success" onClick={addOrder} icon="check-circle" block>
        {__("Make an order")}
      </Button>
    );
  }

  renderReceiptButton() {
    const { order } = this.props;

    if (!order) {
      return null;
    }

    return (
      <Button icon="print" btnStyle="warning" block>
        <Link to={`/order-receipt/${order._id}`} target="_blank">
          {__("Print receipt")}
        </Link>
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

      onClickDrawer("payment");
    };

    return (
      <Button
        style={{ backgroundColor: config.uiOptions.colors.primary }}
        onClick={onClick}
        icon="dollar-alt"
        block
        disabled={!totalAmount || totalAmount === 0 ? true : false}
      >
        {__("Pay the bill")}
      </Button>
    );
  }

  renderAmount(text: string, amount: number, color?: string) {
    const prop = { color };

    return (
      <Amount {...prop}>
        <span>{text}</span>
        {formatNumber(amount || 0)}₮
      </Amount>
    );
  }

  renderDeliveryTypes(color: string) {
    const { type } = this.props;

    return (
      <FormGroup>
        <StageContent>
          <ControlLabel>{__("Choose type")}</ControlLabel>
        </StageContent>
        <Types>
          <Type
            onClick={() => this.onChange(ORDER_TYPES.TAKE)}
            checked={type === ORDER_TYPES.TAKE}
            color={color}
          >
            {__("Take")}
          </Type>
          <Type
            onClick={() => this.onChange(ORDER_TYPES.EAT)}
            checked={type === ORDER_TYPES.EAT}
            color={color}
          >
            {__("Eat")}
          </Type>
          <Type
            onClick={() => this.onChange(ORDER_TYPES.SAVE)}
            checked={type === ORDER_TYPES.SAVE}
            color={color}
          >
            {__("Save")}
          </Type>
        </Types>
      </FormGroup>
    );
  }

  render() {
    const {
      totalAmount,
      config,
      setOrderState,
      onClickDrawer,
      items,
      changeItemCount,
    } = this.props;

    const onSelectCustomer = (customerId) => {
      this.setState({ customerId });

      setOrderState("customerId", customerId);
    };

    const color = config.uiOptions && config.uiOptions.colors.primary;

    return (
      <>
        <Wrapper color={color}>
          <ProductLabel onClick={() => onClickDrawer("order")} color={color}>
            {__("Find orders")}
          </ProductLabel>
          <ProductLabel
            className="mt-10"
            onClick={() => onClickDrawer("customer")}
            color={color}
          >
            {__("Identify a customer")}
          </ProductLabel>
          <SelectWithSearch
            name="customerId"
            queryName="customers"
            label={__("Type name, phone, or email to search")}
            initialValue={this.state.customerId}
            onSelect={onSelectCustomer}
            generateOptions={generateLabelOptions}
            customQuery={queries.customers}
          />
          <ColumnBetween>
            <div>
              {this.renderDeliveryTypes(color)}

              <Stage
                items={items}
                changeItemCount={changeItemCount}
                options={config.uiOptions}
              />
            </div>
            <ButtonWrapper>
              {this.renderAmount(`${__("Total amount")}:`, totalAmount, color)}
              {this.renderAddButton()}
              {this.renderReceiptButton()}
              {this.renderPaymentButton()}
            </ButtonWrapper>
          </ColumnBetween>
        </Wrapper>
      </>
    );
  } // end render()
}
