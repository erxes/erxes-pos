import React from "react";
import { IProduct, IOrderItemInput } from "../types";
import { Item } from "../styles";

type Props = {
  product: IProduct;
  addItem: (item: IOrderItemInput) => void;
};

export default function ProductItem(props: Props) {
  const { product, addItem } = props;
  const { attachment, name, unitPrice, description } = product;

  const onClick = () => {
    addItem({ productId: product._id, count: 1, productName: product.name });
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
        <strong>{Number((unitPrice || 0).toFixed(1)).toLocaleString()}₮</strong>
        <h4>{name}</h4>
        <p>
          <div dangerouslySetInnerHTML={{ __html: description || "" }} />
        </p>
      </div>
      <span>Үлдэгдэл: 3ш</span>
    </Item>
  );
}
