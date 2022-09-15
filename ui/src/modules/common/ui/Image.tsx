import { useState, FC } from 'react';
import NextImage, { ImageProps } from 'next/future/image';

const Image: FC<ImageProps & { src?: string }> = (props) => {
  const {
    src = '/product.png',
    fill = true,
    alt = '',
    onError = () => setSrcI('/product.png'),
    ...rest
  } = props;
  const [srcI, setSrcI] = useState(src);
  return (
    <div className="img-wrap">
      <NextImage
        src={srcI || '/product.png'}
        alt={alt}
        fill={true}
        onError={onError}
        {...rest}
      />
    </div>
  );
};

export default Image;
