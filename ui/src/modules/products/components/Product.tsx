import React from 'react';
import Image from 'next/image';

export default function Product() {
  return (
    <div className="col">
      <div className="product">
        <div className="img-wrap">
          <Image
            src="https://yoshinoyabucket.s3.us-east-2.amazonaws.com/0.24390352059101983%60613-1-Copy.png"
            alt=""
            layout="fill"
          />
        </div>
        <div className="product-name">Үхрийн махтай боул</div>
        <div className="product-price">17 500₮</div>
      </div>
    </div>
  );
}
