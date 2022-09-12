import { useApp } from 'modules/AppContext';
import type { IProduct } from 'modules/types';
import Product from '../components/Product';

const ProductContainer = (props: IProduct) => {
  const { addItemToCart } = useApp();

  const { _id, name, unitPrice, attachment } = props;

  const handleClick = () => {
    const cartItem = {
      name,
      unitPrice,
      producImgUrl: (attachment || {}).url,
      _id,
    };
    return addItemToCart(cartItem);
  };

  return (
    <div className="col col-3" onClick={handleClick}>
      <Product {...props} />
    </div>
  );
};

export default ProductContainer;
