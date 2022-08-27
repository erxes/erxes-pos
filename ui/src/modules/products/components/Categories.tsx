import { useRouter } from 'next/router';
import HorizontalScroll from 'ui/scrollMenu';
import Button from 'ui/Button';
import cn from 'classnames';

export default function Categories({ categories }: any) {
  const router = useRouter();

  const { categoryId } = router.query;

  const btnClassName = (_id: string) =>
    cn('products-category', { active: categoryId === _id });

  const handleChoose = (_id: string) =>
    router.push({
      pathname: router.pathname,
      query: { categoryId: _id },
    });

  return (
    <HorizontalScroll
      className="categories"
      items={categories}
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
