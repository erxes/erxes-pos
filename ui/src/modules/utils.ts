import { gql, useQuery } from '@apollo/client';

export const Query = (queries: object, name: string) =>
  useQuery(gql(queries[name as keyof typeof queries]));

export const formatNum = (num: number): string =>
  num.toLocaleString().replaceAll(',', ' ');

export const parseNum = (val: string | number) => {
  const str = val.toString();
  return str.length > 0 ? parseFloat(str.replaceAll(' ', '')) : 0;
};

export const removeQuery = (router: any, name: string) => {
  delete router.query[name];
  router.push({ pathname: router.pathname, query: router.query });
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
