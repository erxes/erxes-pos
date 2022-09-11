import { gql, useQuery } from '@apollo/client';

export const Query = (queries: object, name: string) =>
  useQuery(gql(queries[name as keyof typeof queries]));

export const formatNum = (num: number): string =>
  num.toLocaleString().replaceAll(',', ' ');

export const removeSelectedOrder = (router: any) => {
  const { selectedOrder, ...rest } = router.query;
  router.push({ pathname: router.pathname, query: rest });
};

export const getMode = (): string => {
  const mode =
    typeof window !== 'undefined' ? localStorage.getItem('mode') : 'pos';
  if (!mode) {
    localStorage.setItem('mode', 'pos');
    return 'pos';
  }
  return mode;
};
