import { useState, FC, memo } from 'react';
import NextImage, { ImageProps } from 'next/future/image';
import cls from 'classnames';
import ProductFallback from 'icons/productFallback';

const Image: FC<
  ImageProps & {
    src?: string;
    alt?: string;
    fallBack?: string;
    noWrap?: boolean;
    withLoader?: boolean;
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
    withLoader,
    ...rest
  } = props;
  const [isImageLoading, setIsImageLoading] = useState(withLoader);
  const [srcI, setSrcI] = useState(src || fallBack || '/product.png');
  const handleComplete = () => setIsImageLoading(false);

  const updatedProps = {
    ...rest,
    src: srcI,
    alt,
    fill: !width && !height ? true : undefined,
    width,
    height,
    onError,
  };

  const renderImage = () => (
    <NextImage
      {...updatedProps}
      onLoadingComplete={handleComplete}
      className={cls(
        'next-image',
        isImageLoading
          ? 'skelton-wave next-image-loading'
          : 'next-image-completed'
      )}
    />
  );

  if (srcI === '/product.png')
    return (
      <div className="img-wrap">
        <ProductFallback />
      </div>
    );

  return noWrap ? (
    renderImage()
  ) : (
    <div className="img-wrap">{renderImage()}</div>
  );
};

export default memo(Image);
