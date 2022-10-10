import ProductContainer from '../containers/Product';
import { getMode } from 'modules/utils';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import Scroll from 'modules/kiosk/components/Scroll';

export default function Products({ products, onLoadMore }: any) {
  const { currentConfig } = useConfigsContext();

  let filteredProducts = products;

  if (getMode() === 'kiosk') {
    const excludeIds = currentConfig.kioskExcludeProductIds || [];
    filteredProducts = products.filter((p: any) => !excludeIds.includes(p._id));
  }

  const handleScroll = ({ currentTarget }: any, onLoadMore: any) => {
    const { scrollTop, clientHeight, scrollHeight } = currentTarget;
    if (scrollTop + clientHeight >= scrollHeight) {
      onLoadMore();
    }
  };

  return (
    <Scroll>
      <div
        className="row products"
        onScroll={(e) => handleScroll(e, onLoadMore)}
      >
        {products.map((product: any, key: number) => (
          <ProductContainer {...product} key={key} />
        ))}
      </div>
    </Scroll>
  );
}
