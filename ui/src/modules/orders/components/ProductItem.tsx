import React from "react";
import { IProduct, IOrderItemInput } from "../types";
import { Item } from "../styles";
import { formatNumber } from "modules/utils";

type Props = {
  product: IProduct;
  addItem: (item: IOrderItemInput) => void;
};

export default function ProductItem(props: Props) {
  const { product, addItem } = props;
  const { attachment, name, unitPrice } = product;

  const onClick = () => {
    addItem({
      productId: product._id,
      count: 1,
      productName: product.name,
      _id: Math.random().toString(),
      unitPrice: product.unitPrice
    });
  };

  const attachmentUrl = attachment && attachment.url ? attachment.url : "";

  return (
    <Item onClick={onClick}>
      {attachmentUrl && <img
        src={attachmentUrl}
        alt={name}
      />}
      <strong>{formatNumber(unitPrice || 0)}₮</strong>
      <h4>{name}</h4>
    </Item>
  );
}
