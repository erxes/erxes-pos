import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import { queries } from '../graphql';
import Loading from 'modules/common/ui/Loading';
import Products from '../components/Products';
import { useEffect } from 'react';
import Empty from 'modules/common/ui/Empty';

const ProductsContainer = () => {
  const router = useRouter();
  const { categoryId, searchValue } = router.query;
  const categoryIdStr = (categoryId || '').toString();
  const FETCH_MORE_PER_PAGE = 20;

  const { data, loading, refetch, fetchMore } = useQuery(
    gql(queries.products),
    {
      variables: {
        perPage: FETCH_MORE_PER_PAGE,
        categoryId: categoryIdStr,
        searchValue,
        page: 1,
      },
    }
  );
  const productsCountQuery = useQuery(gql(queries.productsCount), {
    variables: { categoryId: categoryIdStr },
  });

  useEffect(() => {
    refetch({ categoryId: categoryIdStr });
    productsCountQuery.refetch({ categoryId: categoryIdStr });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  if (loading || productsCountQuery.loading) return <Loading />;

  const products = data.poscProducts || [];
  const productsCount = productsCountQuery.data.poscProductsTotalCount || 0;

  if (!products.length || !productsCount)
    return <Empty text="Бүтээгдэхүүн олдсонгүй" />;

  const handleLoadMore = () => {
    if (productsCount > products.length) {
      console.log(productsCount, products.length);
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

  return <Products products={products} onLoadMore={handleLoadMore} />;
};

export default ProductsContainer;
