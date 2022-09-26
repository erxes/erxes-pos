import { useRouter } from 'next/router';

const useAddQuery = () => {
  const router = useRouter();
  const addQuery = (query: any) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, ...query },
      },
      undefined,
      { shallow: true }
    );
  };
  return { query: router.query, addQuery };
};

const useRemoveQuery = () => {
  const router = useRouter();

  const removeQuery = (name: string) => {
    delete router.query[name];
    router.push({ pathname: router.pathname, query: router.query });
  };

  return { query: router.query, removeQuery };
};

export { useAddQuery, useRemoveQuery };
