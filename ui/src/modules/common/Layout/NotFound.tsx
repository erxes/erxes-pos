import Button from 'ui/Button';
import { useRouter } from 'next/router';
import Empty from 'ui/Empty';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex-center h-100vh fill flex-col">
      <h1>404</h1>
      <Empty
        fill={false}
        text={
          <p>
            Уучлаарай энэ хуудас
            <br />
            олдсонгүй
          </p>
        }
      />
      <h1>
        <Button className="bg-primary" onClick={() => router.back()}>
          Буцах
        </Button>
      </h1>
    </div>
  );
};

export default NotFound;
