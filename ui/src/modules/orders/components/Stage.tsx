import React from "react";
import { IOrderItemInput } from "../types";
import StageItem from "./StageItem";
import { Stages, ProductLabel, StageContent } from "../styles";
import EmptyState from "modules/common/components/EmptyState";

type Props = {
  items: IOrderItemInput[];
  changeItemCount: (item: IOrderItemInput) => void;
};

export default class Stage extends React.Component<Props> {
  renderItems() {
    const { items, changeItemCount } = this.props;

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
        <b>Selected products</b>
        {items.map((i) => (
          <StageItem
            item={i}
            key={`${i.productId}-${Math.random()}`}
            changeItemCount={changeItemCount}
          />
        ))}
      </StageContent>
    );
  }

  render() {
    return (
      <Stages>
        <ProductLabel>Захиалга хайх</ProductLabel>
        {this.renderItems()}
      </Stages>
    );
  }
}
