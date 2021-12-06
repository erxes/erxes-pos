import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import FormControl from "modules/common/components/form/Control";
import FormGroup from "modules/common/components/form/Group";
import SelectWithSearch from "modules/common/components/SelectWithSearch";
import { __ } from "modules/common/utils";
import { IOption } from "types";
import { ORDER_TYPES } from "../../../constants";
import { StageContent, FlexColumn } from "../styles";
import ControlLabel from "modules/common/components/form/Label";
import { FlexBetween, ColumnBetween } from "modules/common/styles/main";
import { formatNumber } from "modules/utils";
import Button from "modules/common/components/Button";
import { ICustomer, IOrder } from "../types";
import queries from "../graphql/queries";

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

const Description = styled.div`
  color: #888;
  font-size: 12px;
  margin-bottom: 10px;
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
const generateLabelOptions = (array: ICustomer[] = []): IOption[] => {
  return array.map((item) => {
    const { _id, firstName, primaryEmail, primaryPhone, code } =
      item || ({} as ICustomer);

    const value = firstName || primaryEmail || primaryPhone || code || "";

    return {
      value: _id || value,
      label: value,
    };
  });
};

type Props = {
  totalAmount: number;
  addOrder: (params: any) => void;
  setOrderState: (name: string, value: any) => void;
  onClickDrawer: (drawerContentType: string) => void;
  options: any;
  editOrder: (params) => void;
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

  onChange = (e) => {
    const value = (e.target as HTMLInputElement).value;

    this.props.setOrderState("type", value);
  };

  renderEditButton() {
    const { editOrder, order } = this.props;

    if (!order) {
      return null;
    }

    return (
      <Button btnStyle="success" onClick={editOrder} icon="check-circle" block>
        {__("Edit order")}
      </Button>
    );
  }

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
        <Link to={`/order-receipt/${order._id}`} target="_blank">{__("Print receipt")}</Link>
      </Button>
    );
  }

  renderPaymentButton() {
    const { order, onClickDrawer, options, totalAmount } = this.props;

    if (!order || (order && order.paidDate)) {
      return null;
    }

    return (
      <Button
        style={{ backgroundColor: options.colors.primary }}
        onClick={() => onClickDrawer("payment")}
        icon="dollar-alt"
        block
        disabled={!totalAmount || totalAmount === 0 ? true : false}
      >
        {__("Pay the bill")}
      </Button>
    );
  }

  render() {
    const { totalAmount, options, setOrderState, type } = this.props;

    const onSelectCustomer = (customerId) => {
      this.setState({ customerId });

      setOrderState("customerId", customerId);
    };

    return (
      <>
        <Wrapper color={options.colors.primary}>
          <StageContent>
            <ControlLabel>{__("Identify a customer")}</ControlLabel>
            <Description>{__("Choose customer from select")}</Description>
          </StageContent>
          <SelectWithSearch
            name="customerId"
            queryName="customers"
            label="Select customer"
            initialValue={this.state.customerId}
            onSelect={onSelectCustomer}
            generateOptions={generateLabelOptions}
            customQuery={queries.customers}
          />
          <ColumnBetween>
            <div>
              <FormGroup>
                <StageContent>
                  <ControlLabel>{__("Choose type")}</ControlLabel>
                  <Description>
                    {__("Choose from the following options")}
                  </Description>
                </StageContent>
                <FlexColumn>
                  <FormControl
                    componentClass="radio"
                    value={ORDER_TYPES.TAKE}
                    checked={type === ORDER_TYPES.TAKE}
                    inline={true}
                    name="type"
                    onChange={this.onChange}
                  >
                    {__("Take")}
                  </FormControl>
                  <FormControl
                    componentClass="radio"
                    value={ORDER_TYPES.EAT}
                    checked={type === ORDER_TYPES.EAT}
                    inline={true}
                    name="type"
                    onChange={this.onChange}
                  >
                    {__("Eat")}
                  </FormControl>
                  <FormControl
                    componentClass="radio"
                    value={ORDER_TYPES.SAVE}
                    checked={type === ORDER_TYPES.SAVE}
                    inline={true}
                    name="type"
                    onChange={this.onChange}
                  >
                    {__("Save")}
                  </FormControl>
                </FlexColumn>
              </FormGroup>
              <Amount>
                <span>{__("Total")}</span>
                {formatNumber(totalAmount || 0)}₮
              </Amount>
              <Amount>
                <span>{__("VAT")}</span>
                {formatNumber(0)}₮
              </Amount>
              <Amount>
                <span>{__("CCT")}</span>
                {formatNumber(0)}₮
              </Amount>
              <Amount color={options.colors.primary}>
                <span>{__("Amount to pay")}</span>
                {formatNumber(totalAmount || 0)}₮
              </Amount>
            </div>
            <ButtonWrapper>
              {this.renderAddButton()}
              {this.renderEditButton()}
              {this.renderReceiptButton()}
              {this.renderPaymentButton()}
            </ButtonWrapper>
          </ColumnBetween>
        </Wrapper>
      </>
    );
  } // end render()
}
