import Categories from '../components/Categories';
import { Query } from 'modules/utils';
import { queries } from '../graphql';
import Loading from 'modules/common/ui/Loading';

const CategoriesContainer = () => {
  const { data, loading } = Query(queries, 'productCategories');

  if (loading) return <Loading />;

  const categories = (data || {}).poscProductCategories || [];

  return <Categories categories={categories} />;
};

export default CategoriesContainer;
