import React from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import FormControl from "modules/common/components/form/Control";
import FormGroup from "modules/common/components/form/Group";
import SelectWithSearch from "modules/common/components/SelectWithSearch";
import { __ } from "modules/common/utils";
import { IOption } from "types";
import { ORDER_TYPES } from "../../../constants";
import { ProductLabel, StageContent } from "../styles";
import ControlLabel from "modules/common/components/form/Label";
import { FlexBetween, ColumnBetween } from "modules/common/styles/main";
import { formatNumber } from "modules/utils";
import Button from "modules/common/components/Button";
import { ICustomer } from '../types';
import queries from '../graphql/queries';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 100%;
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
  return array.map(item => {
    const customer = item || ({} as ICustomer);

    return {
      value: customer._id || '',
      label: customer.firstName || customer.primaryEmail || ''
    };
  });
}

type Props = {
  totalAmount: number;
  makePayment: (params: any) => void;
  setOrderState: (name: string, value: any) => void;
  onClickDrawer: (drawerContentType: string) => void;
  options: any;
};

type State = {
  customerId: string;
}

export default class Calculation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      customerId: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const value = (e.target as HTMLInputElement).value;

    this.props.setOrderState("type", value);
  }

  render() {
    const { totalAmount, makePayment, options, onClickDrawer, setOrderState } = this.props;

    const onSelectCustomer = (customerId) => {
      this.setState({ customerId });

      setOrderState("customerId", customerId);
    }

    return (
      <>
        <Wrapper>
          <ProductLabel color={options.colors.primary}>
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
                  <ControlLabel>Choose type</ControlLabel>
                  <Description>Choose type from following options</Description>
                </StageContent>
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
              </FormGroup>
              <Amount>
                <span>Total</span>
                {formatNumber(totalAmount || 0)}₮
              </Amount>
              <Amount color={options.colors.primary}>
                <span>Amount to pay</span>
                {formatNumber(totalAmount || 0)}₮
              </Amount>

              <ProductLabel color={options.colors.primary}>
                Print receipt
              </ProductLabel>

              <StageContent>
                <Amount>
                  <span>Paid amount</span>
                  {formatNumber(0)}₮
                </Amount>
                <Amount>
                  <span>Change</span>
                  {formatNumber(0)}₮
                </Amount>
              </StageContent>
            </div>
            <ButtonWrapper>
              <Button
                btnStyle="warning"
                onClick={makePayment}
                icon="check-circle"
                block
              >
                Make Order
              </Button>
              <Button
                btnStyle="success"
                onClick={() => onClickDrawer("payment")}
                icon="dollar-alt"
                block
              >
                Pay the bill
              </Button>
            </ButtonWrapper>
          </ColumnBetween>
        </Wrapper>
      </>
    );
  }
}
