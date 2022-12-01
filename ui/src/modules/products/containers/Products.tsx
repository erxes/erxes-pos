import { useQuery, gql } from '@apollo/client';
import { queries } from '../graphql';
import Loading from 'modules/common/ui/Loading';
import Products from '../components/Products';
import Empty from 'modules/common/ui/Empty';
import { useApp } from 'modules/AppContext';
import useIsEditable from 'lib/useIsEditable';
import { useAddQuery } from 'lib/useQuery';

const ProductsContainer = () => {
  const { addQuery, query } = useAddQuery();
  const { categoryId, searchValue, barcode } = query;
  const categoryIdStr = (categoryId || '').toString();
  const FETCH_MORE_PER_PAGE = 20;
  const { paidDate } = useIsEditable();
  const { addItemToCart } = useApp();

  const { data, loading, refetch, fetchMore } = useQuery(
    gql(queries.products),
    {
      variables: {
        perPage: FETCH_MORE_PER_PAGE,
        categoryId: categoryIdStr,
        searchValue,
        page: 1,
      },
      onCompleted(data) {
        const products = data.poscProducts || [];
        if (products.length === 1 && barcode === 'true') {
          const { _id, name, unitPrice, attachment } = products[0];

          if (paidDate) return;

          const cartItem = {
            name,
            unitPrice,
            productImgUrl: (attachment || {}).url,
            _id,
          };
          addItemToCart(cartItem);

          return addQuery({ searchValue: '', barcode: false });
        }
      },
    }
  );
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

  return <Products products={products} onLoadMore={handleLoadMore} />;
};

export default ProductsContainer;
