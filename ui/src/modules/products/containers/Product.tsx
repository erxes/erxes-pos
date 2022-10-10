import { memo } from 'react';
import { useApp } from 'modules/AppContext';
import type { IProduct } from 'modules/types';
import Product from '../components/Product';
import useIsEditable from 'lib/useIsEditable';

const ProductContainer = (props: IProduct) => {
  const { addItemToCart } = useApp();
  const { paidDate, warning } = useIsEditable();

  const { _id, name, unitPrice, attachment } = props;

  const handleClick = () => {
    if (paidDate) return warning();

    const cartItem = {
      name,
      unitPrice,
      productImgUrl: (attachment || {}).url,
      _id,
    };
    return addItemToCart(cartItem);
  };

  return (
    <div className="col col-3">
      <Product {...props} onClick={handleClick} />
    </div>
  );
};

export default memo(ProductContainer);
