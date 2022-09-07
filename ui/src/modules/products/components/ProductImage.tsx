import { useState } from 'react';
import Image from 'next/future/image';

const ProductImage = ({ url }: { url?: string }) => {
  const [src, setSrc] = useState(url);
  return (
    <div className="img-wrap">
      <Image
        src={src || ''}
        alt=""
        fill
        // sizes="25vw"
        onError={() => setSrc('/product.png')}
      />
    </div>
  );
};

export default ProductImage;
