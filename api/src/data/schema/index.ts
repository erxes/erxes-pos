import {
  mutations as UserMutations,
  queries as UserQueries,
  types as UserTypes
} from './user';

import {
  queries as ProductQueries,
  types as ProductTypes
} from './product';

import { types as CompanyTypes } from './company';
import { types as CustomerTypes } from './customer';
import { types as OrderTypes, mutations as OrderMutations, queries as OrderQueries } from './orders';

export let types = `
  scalar JSON
  scalar Date
  ${UserTypes}
  ${ProductTypes}
  ${CompanyTypes}
  ${CustomerTypes}
  ${OrderTypes}
`;

export let queries = `
  ${UserQueries}
  ${ProductQueries}
  ${OrderQueries}
`;

export let mutations = `
  ${UserMutations}
  ${OrderMutations}
`;

export default { mutations, queries, types };
