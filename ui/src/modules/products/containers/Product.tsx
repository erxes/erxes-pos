/* eslint-disable react-hooks/exhaustive-deps */
import { useApp } from 'modules/AppContext';
import { useEffect } from 'react';
import { useAddQuery } from 'lib/useQuery';
import type { IProduct } from 'modules/types';
import Product from '../components/Product';
import useIsEditable from 'lib/useIsEditable';

const ProductContainer = (props: IProduct & { length: number }) => {
  const { addItemToCart } = useApp();
  const { paidDate, warning } = useIsEditable();
  const { addQuery, query } = useAddQuery();
  const { barcode, manufacturedDate } = query;

  const { _id, name, unitPrice, attachment, length } = props;

  const cartItem = {
    name,
    unitPrice,
    productImgUrl: (attachment || {}).url,
    _id,
  };

  useEffect(() => {
    if (length === 1 && barcode === 'true') {
      if (paidDate) return;
      addItemToCart({ ...cartItem, manufacturedDate });
      return addQuery({ searchValue: '', barcode: false });
    }
  }, [length, barcode]);

  const handleClick = () => {
    if (paidDate) return warning();
    return addItemToCart(cartItem);
  };

  return (
    <div className="col col-3">
      <Product {...props} onClick={handleClick} />
    </div>
  );
};

export default ProductContainer;
