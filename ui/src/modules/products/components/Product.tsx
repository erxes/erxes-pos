import React from 'react';
import Image from 'next/future/image';

export default function Product({ attachment, name, unitPrice }: any) {
  const formatPrice = unitPrice.toLocaleString().replace(',', ' ');
  return (
    <div className="col col-3">
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
        <div className="product-price">{formatPrice}₮</div>
      </div>
    </div>
  );
}
