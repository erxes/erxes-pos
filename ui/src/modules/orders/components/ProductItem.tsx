import React from 'react';
import { IProduct, IOrderItemInput } from '../types';
import styled from 'styled-components';

const Item = styled.div`
  border: 1px solid #ddd;
  padding: 5px;
  margin: 5px;
  max-height: 100px;
  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: #fff;
    color: #000;
    cursor: pointer;
  }
`;

type Props = {
  product: IProduct;
  addItem: (item: IOrderItemInput) => void;
}

export default function ProductItem(props: Props) {
  const { product, addItem } = props;
  const { attachment, name, unitPrice } = product;

  const onClick = () => {
    addItem({ productId: product._id, count: 1, productName: product.name });
  };

  return (
    <Item onClick={onClick}>
      <img src={attachment} alt={attachment} />
      <strong>{name}</strong>
      <span>{unitPrice || 0}</span>
    </Item>
  );
}
