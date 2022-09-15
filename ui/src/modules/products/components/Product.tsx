import React from 'react';
import Image from 'ui/Image';
import Ink from 'react-ink';
import { formatNum } from 'modules/utils';
import { getMode } from 'modules/utils';
import cn from 'classnames';

export default function Product({
  attachment,
  name,
  unitPrice,
  riffle = true,
}: any) {
  return (
    <div className={cn('product', { 'kiosk-product': getMode() === 'kiosk' })}>
      <Image src={(attachment || {}).url} alt="" />
      <div className="product-name">{name}</div>
      <div className="product-price">{formatNum(unitPrice)}₮</div>
      {riffle && <Ink background={false} duration={800} />}
    </div>
  );
}
