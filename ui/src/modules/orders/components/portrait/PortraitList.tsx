import React from "react";
import { IConfig } from "types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from 'react-router-dom';

import { IOrder, IOrderItemInput } from "../../types";
import {
  PortraitListWrapper,
  LogoWrapper,
  Products,
  Title,
  Empty,
} from "./style";
import { ProductLabel, StageItems } from "modules/orders/styles";
import { __ } from "modules/common/utils";
import StageItem from "../StageItem";
import { ColumnBetween } from "modules/common/styles/main";
import { Amount } from "../Calculation";
import { formatNumber } from "modules/utils";
import Button from "modules/common/components/Button";
import EmptyState from "modules/common/components/EmptyState";

type Props = {
  currentConfig: IConfig;
  order: IOrder | null;
  orientation: string;
  products: React.ReactNode;
  items: IOrderItemInput[];
  totalAmount: number;
  changeItemCount: (item: IOrderItemInput) => void;
  onClickDrawer: (drawerContentType: string) => void;
  addOrder: (params: any) => void;
  editOrder: (params: any) => void;
};

type State = {
  type: string;
};

export default class PortraitList extends React.Component<Props, State> {
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

  renderPaymentButton() {
    const { order, onClickDrawer, totalAmount, currentConfig } = this.props;

    if (!order || (order && order.paidDate)) {
      return null;
    }

    const style: any = {};

    if (currentConfig && currentConfig.uiOptions && currentConfig.uiOptions.colors) {
      style.backgroundColor = currentConfig.uiOptions.colors.primary;
    }

    return (
      <Button
        style={style}
        onClick={() => onClickDrawer("payment")}
        icon="dollar-alt"
        block
        disabled={!totalAmount || totalAmount === 0 ? true : false}
      >
        {__("Pay the bill")}
      </Button>
    );
  }

  renderOrders() {
    const {
      items,
      currentConfig,
      changeItemCount,
      orientation,
      totalAmount,
    } = this.props;
    const { colors } = currentConfig.uiOptions || ({} as any);

    if (!items || items.length === 0) {
      return (
        <Empty>
          <EmptyState
            image="/images/empty.png"
            text={"Таны захиалга хоосон байна. Та бүтээгдэхүүнээ сонгоно уу"}
          />
        </Empty>
      );
    }

    return (
      <ColumnBetween orientation={orientation}>
        <StageItems>
          {items.map((i) => (
            <StageItem
              item={i}
              key={`${i._id}`}
              changeItemCount={changeItemCount}
              color={colors.primary || ""}
              orientation={orientation}
            />
          ))}
        </StageItems>
        <div className="payment-section">
          <Amount color={colors.primary}>
            <span>{__("Total amount")}</span>
            {formatNumber(totalAmount || 0)}₮
          </Amount>
          {this.renderAddButton()}
          {this.renderEditButton()}
          {this.renderPaymentButton()}
        </div>
      </ColumnBetween>
    );
  }

  render() {
    const { products, currentConfig, orientation } = this.props;
    const { colors, logo } = currentConfig.uiOptions || ({} as any);

    return (
      <>
        <PortraitListWrapper>
          <Row>
            <Col md={8}>
              <Products>
                <LogoWrapper odd={true}>
                  <Link to="/">
                    <img src={logo ? logo : `/images/logo-dark.png`} alt="logo" />
                  </Link>
                </LogoWrapper>
                {products}
              </Products>
            </Col>
            <Col md={4}>
              <ProductLabel
                color={colors.primary}
                isPortrait={orientation === "portrait"}
              >
                {__("Identify a customer")}
              </ProductLabel>

              <Title>Таны захиалга</Title>
              {this.renderOrders()}
            </Col>
          </Row>
        </PortraitListWrapper>
      </>
    );
  }
}
