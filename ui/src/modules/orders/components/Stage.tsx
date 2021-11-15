import React from "react";
import { __ } from "modules/common/utils";
import { IOrderItemInput } from "../types";
import StageItem from "./StageItem";
import { Stages, ProductLabel, StageContent } from "../styles";
import EmptyState from "modules/common/components/EmptyState";

type Props = {
  items: IOrderItemInput[];
  changeItemCount: (item: IOrderItemInput) => void;
  onClickDrawer: (drawerContentType: string) => void;
  options: any;
};

export default class Stage extends React.Component<Props> {
  renderItems() {
    const { items, changeItemCount, options } = this.props;

    if (!items || items.length === 0) {
      return (
        <EmptyState
          image="/images/actions/8.svg"
          text="Add some reservations!"
        />
      );
    }

    return (
      <StageContent>
        <b>{__("Selected products")}</b>
        {items.map((i) => (
          <StageItem
            item={i}
            key={`${i._id}`}
            changeItemCount={changeItemCount}
            color={options.colors.primary || ""}
          />
        ))}
      </StageContent>
    );
  }

  render() {
    const { onClickDrawer, options } = this.props;

    return (
      <Stages>
        <ProductLabel
          onClick={() => onClickDrawer("order")}
          color={options.colors.primary}
        >
          {__("Find orders")}
        </ProductLabel>
        {this.renderItems()}
      </Stages>
    );
  }
}
