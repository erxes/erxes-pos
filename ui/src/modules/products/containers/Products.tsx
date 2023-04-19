import { useQuery, gql } from '@apollo/client';
import { queries } from '../graphql';
import Loading from 'modules/common/ui/Loading';
import Products from '../components/Products';
import Empty from 'modules/common/ui/Empty';
import { useAddQuery } from 'lib/useQuery';
import { useApp } from 'modules/AppContext';

const ProductsContainer = () => {
  const { query } = useAddQuery();
  const { categoryId } = query;
  const { searchValue, changeFoundItem } = useApp();
  const categoryIdStr = (categoryId || '').toString();
  const FETCH_MORE_PER_PAGE = 20;

  const { data, loading, fetchMore } = useQuery(gql(queries.products), {
    variables: {
      perPage: FETCH_MORE_PER_PAGE,
      categoryId: categoryIdStr,
      searchValue: searchValue.split('_')[0],
      page: 1,
    },
    onCompleted(data) {
      const products = (data || {}).poscProducts || [];
      changeFoundItem(products.length === 1 ? { ...products[0], manufacturedDate: searchValue.split('_')[1] } : null);
    },
  });
  const productsCountQuery = useQuery(gql(queries.productsCount), {
    variables: {
      categoryId: categoryIdStr,
      searchValue,
    },
  });

  if (loading || productsCountQuery.loading) return <Loading />;

  const products = (data || {}).poscProducts || [];
  const productsCount = productsCountQuery.data.poscProductsTotalCount || 0;

  if (!products.length || !productsCount)
    return <Empty text="Бүтээгдэхүүн олдсонгүй" />;

  const handleLoadMore = () => {
    if (productsCount > products.length) {
      fetchMore({
        variables: {
          page: Math.ceil(products.length / FETCH_MORE_PER_PAGE) + 1,
          perPage: FETCH_MORE_PER_PAGE,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            poscProducts: [
              ...(prev.poscProducts || []),
              ...fetchMoreResult.poscProducts,
            ],
          });
        },
      });
    }
  };

  return (
    <Products
      products={products}
      onLoadMore={handleLoadMore}
      productsCount={productsCount}
    />
  );
};

export default ProductsContainer;
