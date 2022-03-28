import Button from "modules/common/components/Button";
import React from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import { __ } from "modules/common/utils";
import { FlexBetween } from "modules/common/styles/main";
import { formatNumber } from "modules/utils";
import { IConfig, IOption } from "types";
import { ICustomer, IOrder, IOrderItemInput } from "modules/orders/types";
import Stage from "../Stage";
import { FlexColumn, TypeButtons } from "./style";

const Wrapper = styledTS<{ color?: string }>(styled.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 300px;
  background: #F5F5F5;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  max-width:100%;

  button {
    padding: 10px 20px;
    border-radius: 8px;
  }
`;

export const Amount = styled(FlexBetween)`
  margin-bottom: 10px;
  font-size: 16px;

  span {
    font-weight: 600;
  }
`;

const ButtonWrapper = styled.div`
  margin: 40px;
  width: 30%;

  > button {
    width: 300px;
  }
`;

const generateLabel = (customer) => {
  const { firstName, primaryEmail, primaryPhone, lastName } =
    customer || ({} as ICustomer);

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

  return value;
};

// get user options for react-select-plus
export const generateLabelOptions = (array: ICustomer[] = []): IOption[] => {
  return array.map((item) => {
    const value = generateLabel(item);
    return { value: item._id, label: value };
  });
};

type Props = {
  orientation: string;
  totalAmount: number;
  addOrder: () => void;
  setItems: (items: IOrderItemInput[]) => void;
  setOrderState: (name: string, value: any) => void;
  onClickModal: (modalContentType: string) => void;
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

export default class FooterCalculation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { order } = this.props;
    const customerId = order ? order.customerId : "";
    const customerLabel = order ? generateLabel(order.customer) : "";

    let stageHeight = 100; // types title
    const mode = localStorage.getItem("erxesPosMode") || "";

    this.state = {
      customerId: customerId || "",
      customerLabel,
      stageHeight,
      mode,
    };
  }

  onChange = (value) => {
    this.props.setOrderState("type", value);
  };

  renderPaymentButton() {
    const { order, onClickModal, config, addOrder, setItems } = this.props;

    if (order && order.paidDate) {
      return null;
    }

    const onClick = () => {
      addOrder();

      onClickModal("payment");
    };

    const onCancelOrder = () => {
      setItems([]);
    };

    return (
      <TypeButtons>
        <Button onClick={onCancelOrder} btnStyle="simple" block>
          {__("Cancel order")}
        </Button>
        <Button
          style={{ backgroundColor: config.uiOptions.colors.primary }}
          onClick={onClick}
          block
        >
          {__("Payment")}
        </Button>
      </TypeButtons>
    );
  }

  renderAmount(text: string, amount: number) {
    return (
      <>
        <h4>{__("Payment info")}</h4>
        <Amount>
          {text}
          <span>{formatNumber(amount || 0)}₮</span>
        </Amount>
      </>
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
      changeItemIsTake,
    } = this.props;
    const { mode } = this.state;
    const color = config.uiOptions && config.uiOptions.colors.primary;

    return (
      <>
        <Wrapper color={color}>
          <FlexColumn>
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
          </FlexColumn>
          <ButtonWrapper
            className={orientation === "portrait" ? "payment-section" : ""}
          >
            {this.renderAmount(`${__("Amount to pay")}:`, totalAmount)}
            {this.renderPaymentButton()}
          </ButtonWrapper>
        </Wrapper>
      </>
    );
  } // end render()
}
