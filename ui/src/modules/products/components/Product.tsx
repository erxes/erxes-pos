import React from 'react';
import Image from 'next/future/image';
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
      <div className="img-wrap">
        <Image
          src={(attachment || {}).url || '/product_placeholder.jpg'}
          alt=""
          fill
          sizes="25vw"
        />
      </div>
      <div className="product-name">{name}</div>
      <div className="product-price">{formatNum(unitPrice)}₮</div>
      {riffle && <Ink background={false} duration={800} />}
    </div>
  );
}
