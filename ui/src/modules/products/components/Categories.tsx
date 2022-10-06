import { useRouter } from 'next/router';
import HorizontalScroll from 'modules/common/ui/scrollMenu';
import Button from 'modules/common/ui/Button';
import cn from 'classnames';

export default function Categories({
  categories,
}: {
  categories: { name: string; _id?: string }[];
}) {
  const router = useRouter();

  const { categoryId } = router.query;

  const btnClassName = (_id: string) =>
    cn('products-category', { active: categoryId == _id });

  const handleChoose = (_id: string) => {
    if (!_id) {
      delete router.query.categoryId;
      return router.push(router.query);
    }

    return router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, categoryId: _id },
      },
      undefined,
      { shallow: true }
    );
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
