import React from 'react';
import Image from 'ui/Image';
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
      <Image src={(attachment || {}).url} alt="" />
      <div className="product-name">{name}</div>
      <div className="product-price">{formatNum(unitPrice)}₮</div>
      {riffle && <Ink background={false} duration={800} />}
    </div>
  );
}
