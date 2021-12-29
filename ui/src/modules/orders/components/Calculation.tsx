import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import FormControl from "modules/common/components/form/Control";
import FormGroup from "modules/common/components/form/Group";
import SelectWithSearch from "modules/common/components/SelectWithSearch";
import Icon from "modules/common/components/Icon";
import { FlexRow } from "modules/common/components/filterableList/styles";
import { __ } from "modules/common/utils";
import { IConfig, IOption } from "types";
import { ORDER_TYPES } from "../../../constants";
import { StageContent, FlexColumn } from "../styles";
import ControlLabel from "modules/common/components/form/Label";
import { FlexBetween, ColumnBetween } from "modules/common/styles/main";
import { formatNumber, calcTaxAmount } from "modules/utils";
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
export const generateLabelOptions = (array: ICustomer[] = []): IOption[] => {
  return array.map((item) => {
    const { _id, firstName, primaryEmail, primaryPhone, lastName } =
      item || ({} as ICustomer);

    let value = firstName ? firstName.toUpperCase() : '';

    if (lastName) {
      value = `${value} ${lastName}`;
    }
    if (primaryPhone) {
      value = `${value} (${primaryPhone})`
    }
    if (primaryEmail) {
      value = `${value} /${primaryEmail}/`
    }

    return { value: _id, label: value };
  });
};

type Props = {
  totalAmount: number;
  addOrder: (params: any) => void;
  setOrderState: (name: string, value: any) => void;
  onClickDrawer: (drawerContentType: string) => void;
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

  onChange = (e) => {
    const value = (e.target as HTMLInputElement).value;

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
        <Link to={`/order-receipt/${order._id}`} target="_blank">{__("Print receipt")}</Link>
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

  render() {
    const { totalAmount, config, setOrderState, type, onClickDrawer } = this.props;

    const onSelectCustomer = (customerId) => {
      this.setState({ customerId });

      setOrderState("customerId", customerId);
    };

    const color = config.uiOptions && config.uiOptions.colors.primary;
    const taxAmount = calcTaxAmount(totalAmount, config.ebarimtConfig);

    let vatPercent = 0;
    let cityTaxPercent = 0;

    if (config.ebarimtConfig) {
      vatPercent = config.ebarimtConfig.vatPercent || 0;
      cityTaxPercent = config.ebarimtConfig.cityTaxPercent || 0;
    }

    const btnStyle = { padding: "4px 10px" };

    return (
      <>
        <Wrapper color={color}>
          <StageContent>
            <FlexRow>
              <div>
                <ControlLabel>{__("Identify a customer")}</ControlLabel>
                <Description>{__("Choose customer from select")}</Description>
              </div>
              <Button onClick={() => onClickDrawer('customer')} style={btnStyle} btnStyle="success">
                <Icon icon="plus" />
              </Button>
            </FlexRow>
          </StageContent>
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

              {this.renderAmount(`${__('Pure amount')}:`, taxAmount.pureAmount)}
              {taxAmount.vatAmount ? this.renderAmount(`${__("VAT")} (${vatPercent}%):`, taxAmount.vatAmount) : ''}
              {taxAmount.cityTaxAmount ? this.renderAmount(`${__("UB city tax")} (${cityTaxPercent}%):`, taxAmount.cityTaxAmount) : ''}
              {this.renderAmount(`${__("Total amount")}:`, totalAmount, color)}
            </div>
            <ButtonWrapper>
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
