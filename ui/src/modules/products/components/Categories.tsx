import { useAddQuery, useRemoveQuery } from 'lib/useQuery';
import HorizontalScroll from 'modules/common/ui/scrollMenu';
import Button from 'modules/common/ui/Button';
import cn from 'classnames';

export default function Categories({
  categories,
}: {
  categories: { name: string; _id?: string }[];
}) {
  const { query, addQuery } = useAddQuery();
  const { removeQuery } = useRemoveQuery();

  const { categoryId } = query;

  const btnClassName = (_id: string) =>
    cn('products-category', { active: categoryId == _id });

  const handleChoose = (_id: string) => {
    if (!_id || categoryId === _id) {
      removeQuery('categoryId');
    }

    return addQuery({ categoryId: _id });
  };
  // { _id: null, name: 'Бүгд' }
  return (
    <HorizontalScroll
      className="categories"
      items={[...categories]}
      ItemComponent={({ _id, name }) => {
        return (
          <Button
            className={btnClassName(_id)}
            variant="slim"
            onClick={() => handleChoose(_id)}
          >
            {name}
          </Button>
        );
      }}
    ></HorizontalScroll>
  );
}
