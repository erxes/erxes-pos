import { gql, useQuery } from '@apollo/client';

export const Query = (queries: object, name: string) =>
  useQuery(gql(queries[name as keyof typeof queries]));

export const formatNum = (num: number): string =>
  num.toLocaleString().replaceAll(',', ' ');
