/* eslint-disable react-hooks/exhaustive-deps */
import { useApp } from 'modules/AppContext';
import type { IProduct } from 'modules/types';
import Product from '../components/Product';
import useIsEditable from 'lib/useIsEditable';

const ProductContainer = (props: IProduct) => {
  const { addItemToCart, changeFoundItem } = useApp();
  const { paidDate, warning } = useIsEditable();

  const { _id, name, unitPrice, attachment } = props;

  const cartItem = {
    name,
    unitPrice,
    productImgUrl: (attachment || {}).url,
    _id,
  };

  const handleClick = () => {
    if (paidDate) return warning();
    changeFoundItem(null)
    return addItemToCart(cartItem);
  };

  return (
    <div className="col col-3">
      <Product {...props} onClick={handleClick} />
    </div>
  );
};

export default ProductContainer;
