import type { FC } from 'react';
import Product from 'modules/products/components/Product';
import Counter from 'modules/common/ui/Counter';
import type { ICartItem } from 'modules/types';

const CartItem: FC<ICartItem> = (props) => {
  const { count, _id, productImgUrl, ...data } = props;
  return (
    <div className="kiosk-cart-item">
      <Product riffle={false} {...data} attachment={{ url: productImgUrl }} />
      <Counter btnVariant="flat" count={count} _id={_id} />
    </div>
  );
};

export default CartItem;
