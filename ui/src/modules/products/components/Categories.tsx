/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useAddQuery, useRemoveQuery } from 'lib/useQuery';
import HorizontalScroll from 'modules/common/ui/scrollMenu';
import Button from 'modules/common/ui/Button';
import cn from 'classnames';

type ICategory = { name: string; _id?: string; parentId: string };
type IFindChildren = (parent?: string | string[]) => (ICategory | undefined)[];

export default function Categories({
  categories,
}: {
  categories: ICategory[];
}) {
  const [renderCats, setRenderCats] = useState<any>([]);
  const { query, addQuery } = useAddQuery();
  const { removeQuery } = useRemoveQuery();

  const { categoryId } = query;

  const rootCat = categories.find(({ order }: any) => !order.includes('/'));

  const findChildren: IFindChildren = (parent) => {
    const children = categories.filter(({ parentId }) => parentId === parent);

    const chosenCat = categories.find(({ _id }: any) => parent === _id);

    if (chosenCat && children.length === 0)
      return findChildren(chosenCat.parentId);

    if (children.length > 0) return [chosenCat, ...children];

    return [];
  };

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
    setRenderCats(findChildren(categoryId));
  }, [categories, categoryId]);

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
