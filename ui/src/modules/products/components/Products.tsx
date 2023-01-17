/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, memo } from 'react';
import ProductContainer from '../containers/Product';
import { getMode } from 'modules/utils';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import Scroll from 'modules/kiosk/components/Scroll';
import { useInView } from 'react-intersection-observer';
import Loading from 'ui/Loading';
import type { IProduct } from 'modules/types';

type IProducts = {
  products: IProduct[];
  onLoadMore: () => void;
  productsCount: number;
};

function Products({ products, onLoadMore, productsCount }: IProducts) {
  const { currentConfig } = useConfigsContext();

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  let filteredProducts = products;

  if (getMode() === 'kiosk') {
    const excludeIds = currentConfig.kioskExcludeProductIds || [];
    filteredProducts = products.filter((p: any) => !excludeIds.includes(p._id));
  }

  useEffect(() => {
    if (inView) {
      onLoadMore();
    }
  }, [products.length, inView]);

  return (
    <Scroll>
      <div className="row products">
        {filteredProducts.map((product: any) => (
          <ProductContainer
            {...product}
            key={product._id}
            length={filteredProducts.length}
          />
        ))}
      </div>
      {filteredProducts.length >= 20 && products.length < productsCount && (
        <div className="load-products" ref={ref}>
          <Loading />
        </div>
      )}
    </Scroll>
  );
}

export default memo(Products);
