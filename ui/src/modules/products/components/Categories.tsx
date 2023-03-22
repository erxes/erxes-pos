/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { getMode } from 'modules/utils';
import { useAddQuery, useRemoveQuery } from 'lib/useQuery';
import { useConfigsContext } from 'modules/auth/containers/Configs';
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
  const { currentConfig } = useConfigsContext();
  let filteredCategories = categories;

  if (getMode() === 'kiosk') {
    const excludeCatIds = currentConfig.kioskExcludeCategoryIds || [];
    filteredCategories = categories.filter((c: any) => !excludeCatIds.includes(c._id));
  }

  const [renderCats, setRenderCats] = useState<any>([]);
  const { query, addQuery } = useAddQuery();
  const { removeQuery } = useRemoveQuery();

  const { categoryId } = query;

  const rootCat = filteredCategories.find(({ order }: any) => !order.includes('/'));

  const findChildren: IFindChildren = (parent) => {
    const children = filteredCategories.filter(({ parentId }) => parentId === parent);

    const chosenCat = filteredCategories.find(({ _id }: any) => parent === _id);

    if (chosenCat && children.length === 0)
      return findChildren(chosenCat.parentId);

    if (children.length > 0) return [chosenCat, ...children];

    return [];
  };

  const mainCats = filteredCategories.filter(
    ({ parentId }: any) => parentId === rootCat?._id
  );

  useEffect(() => {
    if (!rootCat) {
      setRenderCats(filteredCategories);
      return;
    }

    if (!categoryId) {
      setRenderCats([rootCat, ...mainCats]);
      return;
    }
    setRenderCats(findChildren(categoryId));
  }, [filteredCategories, categoryId]);

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
