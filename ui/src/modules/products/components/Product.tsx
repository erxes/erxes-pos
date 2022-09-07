import React from 'react';
import ProductImage from './ProductImage';
import Ink from 'react-ink';
import { formatNum } from 'modules/utils';

export default function Product({
  attachment,
  name,
  unitPrice,
  riffle = true,
}: any) {
  return (
    <div className="product">
      <ProductImage url={(attachment || {}).url} />
      <div className="product-name">{name}</div>
      <div className="product-price">{formatNum(unitPrice)}₮</div>
      {riffle && <Ink background={false} duration={800} />}
    </div>
  );
}
