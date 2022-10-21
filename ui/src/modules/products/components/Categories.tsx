import { useState, useEffect } from 'react';
import { useAddQuery, useRemoveQuery } from 'lib/useQuery';
import HorizontalScroll from 'modules/common/ui/scrollMenu';
import Button from 'modules/common/ui/Button';
import cn from 'classnames';

export default function Categories({
  categories,
}: {
  categories: { name: string; _id?: string }[];
}) {
  const [renderCats, setRenderCats] = useState<any>([]);
  const { query, addQuery } = useAddQuery();
  const { removeQuery } = useRemoveQuery();

  const { categoryId } = query;

  const rootCat = categories.find(({ order }: any) => !order.includes('/'));

  const findChildren = (parent: any) =>
    categories.filter(({ parentId }: any) => parentId === parent);

  const mainCats = categories.filter(
    ({ parentId }: any) => parentId === rootCat?._id
  );

  useEffect(() => {
    if (!rootCat) {
      setRenderCats(categories);
      return;
    }

    if (!categoryId) {
      setRenderCats([rootCat, ...mainCats]);
      return;
    }
    const childrenCat = findChildren(categoryId);

    if (childrenCat.length > 0) {
      const chosenCat = categories.find(({ _id }: any) => categoryId === _id);
      setRenderCats([chosenCat, ...childrenCat]);
    }
  }, [categoryId]);

  const btnClassName = (_id: string) =>
    cn('products-category', { active: categoryId == _id });

  const handleChoose = (_id: string) => {
    if (!_id || categoryId === _id) {
      removeQuery('categoryId');
    }

    return addQuery({ categoryId: _id });
  };
  return (
    <HorizontalScroll
      className="categories"
      items={renderCats}
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
