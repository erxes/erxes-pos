import { useQuery, gql } from '@apollo/client';
import Categories from '../components/Categories';
import { queries } from '../graphql';
import Loading from 'modules/common/ui/Loading';

const CategoriesContainer = () => {
  const { data, loading } = useQuery(gql(queries.productCategories));

  if (loading) return <Loading />;

  const categories = (data || {}).poscProductCategories || [];

  return <Categories categories={categories} />;
};

export default CategoriesContainer;
