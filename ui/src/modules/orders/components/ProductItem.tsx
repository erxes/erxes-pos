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
  const { attachment, name, unitPrice, description } = product;

  const onClick = () => {
    addItem({
      productId: product._id,
      count: 1,
      productName: product.name,
      _id: Math.random().toString()
    });
  };

  return (
    <Item onClick={onClick}>
      <div>
        <img
          src={
            attachment || "https://office.erxes.io/images/icons/erxes-16.svg"
          }
          alt={name}
        />
        <strong>{formatNumber(unitPrice || 0)}₮</strong>
        <h4>{name}</h4>
        <div>
          <p dangerouslySetInnerHTML={{ __html: description || "" }} />
        </div>
      </div>
    </Item>
  );
}
