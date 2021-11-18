import React from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import FormControl from "modules/common/components/form/Control";
import FormGroup from "modules/common/components/form/Group";
import SelectWithSearch from "modules/common/components/SelectWithSearch";
import { __ } from "modules/common/utils";
import { IOption } from "types";
import { ORDER_TYPES } from "../../../constants";
import { ProductLabel, StageContent, FlexColumn } from "../styles";
import ControlLabel from "modules/common/components/form/Label";
import { FlexBetween, ColumnBetween } from "modules/common/styles/main";
import { formatNumber } from "modules/utils";
import Button from "modules/common/components/Button";
import { ICustomer, IOrder } from "../types";
import queries from "../graphql/queries";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 100%;

  button {
    padding: 10px 20px;
    border-radius: 8px;
  }
`;

const Description = styled.div`
  color: #888;
  font-size: 12px;
  margin-bottom: 10px;
`;

const Amount = styledTS<{ color?: string }>(styled(FlexBetween))`
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
    const customer = item || ({} as ICustomer);

    return {
      value: customer._id || "",
      label: customer.firstName || customer.primaryEmail || "",
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

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const value = (e.target as HTMLInputElement).value;

    this.props.setOrderState("type", value);
  }

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

  render() {
    const { totalAmount, options, onClickDrawer, setOrderState } = this.props;

    const onSelectCustomer = (customerId) => {
      this.setState({ customerId });

      setOrderState("customerId", customerId);
    };

    return (
      <>
        <Wrapper>
          <ProductLabel
            color={options.colors.primary}
            onClick={() => onClickDrawer("customer")}
          >
            {__("Identify a customer")}
          </ProductLabel>
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
                    inline={true}
                    name="type"
                    onChange={this.onChange}
                  >
                    {__("Take")}
                  </FormControl>
                  <FormControl
                    componentClass="radio"
                    value={ORDER_TYPES.EAT}
                    inline={true}
                    name="type"
                    onChange={this.onChange}
                  >
                    {__("Eat")}
                  </FormControl>
                  <FormControl
                    componentClass="radio"
                    value={ORDER_TYPES.SAVE}
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
              <Amount color={options.colors.primary}>
                <span>{__("Amount to pay")}</span>
                {formatNumber(totalAmount || 0)}₮
              </Amount>

              <ProductLabel color={options.colors.primary}>
                {__("Print receipt")}
              </ProductLabel>

              <StageContent>
                <Amount>
                  <span>{__("Paid amount")}</span>
                  {formatNumber(0)}₮
                </Amount>
                <Amount>
                  <span>{__("Change amount")}</span>
                  {formatNumber(0)}₮
                </Amount>
              </StageContent>
            </div>
            <ButtonWrapper>
              {this.renderAddButton()}
              {this.renderEditButton()}
              <Button
                style={{ backgroundColor: options.colors.primary }}
                onClick={() => onClickDrawer("payment")}
                icon="dollar-alt"
                block
              >
                {__("Pay the bill")}
              </Button>
            </ButtonWrapper>
          </ColumnBetween>
        </Wrapper>
      </>
    );
  }
}
