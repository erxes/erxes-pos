import { useState, FC } from 'react';
import NextImage, { ImageProps } from 'next/future/image';

const Image: FC<ImageProps & { src?: string; alt?: string }> = (props) => {
  const {
    src = '/product.png',
    fill = true,
    alt = '',
    onError = () => setSrcI('/product.png'),
    width,
    height,
    ...rest
  } = props;
  const [srcI, setSrcI] = useState(src);

  const updatedProps = {
    ...rest,
    src: srcI || '/product.png',
    alt,
    fill: !width && !height ? true : undefined,
    width,
    height,
    onError,
  };

  return (
    <div className="img-wrap">
      <NextImage {...updatedProps} />
    </div>
  );
};

export default Image;
