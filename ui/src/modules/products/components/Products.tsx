import ProductContainer from '../containers/Product';

export default function Products({ products, onLoadMore }: any) {
  const handleScroll = ({ currentTarget }: any, onLoadMore: any) => {
    const { scrollTop, clientHeight, scrollHeight } = currentTarget;
    if (scrollTop + clientHeight >= scrollHeight) {
      onLoadMore();
    }
  };

  return (
    <div
      className="row custom-scrollbar products"
      onScroll={(e) => handleScroll(e, onLoadMore)}
    >
      {products.map((product: any, key: number) => (
        <ProductContainer {...product} key={key} />
      ))}
    </div>
  );
}
