/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import ProductContainer from '../containers/Product';
import { getMode } from 'modules/utils';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import Scroll from 'modules/kiosk/components/Scroll';
import { useInView } from 'react-intersection-observer';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function Products({ products, onLoadMore }: any) {
  const { currentConfig } = useConfigsContext();
  const [animationParent] = useAutoAnimate<HTMLDivElement>();

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
    inView && onLoadMore();
  }, [products.length, inView]);

  return (
    <Scroll>
      <div className="row products" ref={animationParent}>
        {filteredProducts.map((product: any, key: number) => (
          <ProductContainer {...product} key={key} />
        ))}
        <div ref={ref} />
      </div>
    </Scroll>
  );
}
