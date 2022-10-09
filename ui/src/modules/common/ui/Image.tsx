import { useState, FC } from 'react';
import NextImage, { ImageProps } from 'next/future/image';

const Image: FC<
  ImageProps & {
    src?: string;
    alt?: string;
    fallBack?: string;
    noWrap?: boolean;
  }
> = (props) => {
  const {
    src,
    fill = true,
    alt = '',
    onError = () => setSrcI(props.fallBack || '/product.png'),
    width,
    height,
    fallBack,
    noWrap,
    ...rest
  } = props;
  const [srcI, setSrcI] = useState(src || fallBack || '/product.png');

  const updatedProps = {
    ...rest,
    src: srcI,
    alt,
    fill: !width && !height ? true : undefined,
    width,
    height,
    onError,
  };

  return noWrap ? (
    <NextImage {...updatedProps} />
  ) : (
    <div className="img-wrap">
      <NextImage {...updatedProps} />
    </div>
  );
};

export default Image;
