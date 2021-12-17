import React from "react";
import { IProduct, IOrderItemInput } from "../types";
import { Item } from "../styles";
import { formatNumber } from "modules/utils";

type Props = {
  product: IProduct;
  orientation: string;
  addItem: (item: IOrderItemInput) => void;
};

export default function ProductItem(props: Props) {
  const { product, addItem, orientation } = props;
  const { attachment, name, unitPrice } = product;

  const onClick = () => {
    addItem({
      productId: product._id,
      count: 1,
      productName: product.name,
      _id: Math.random().toString(),
      unitPrice: product.unitPrice,
    });
  };

  const attachmentUrl = attachment && attachment.url ? attachment.url : "";

  return (
    <Item onClick={onClick} isPortrait={orientation === "portrait"}>
      {attachmentUrl && (
        <img
          src={
            "https://yoshinoyabucket.s3.us-east-2.amazonaws.com/0.12592724587805204%6019-Copya.png"
          }
          alt={name}
        />
      )}
      <strong>{formatNumber(unitPrice || 0)}₮</strong>
      <h4>{name}</h4>
    </Item>
  );
}
