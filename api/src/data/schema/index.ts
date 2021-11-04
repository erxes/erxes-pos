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
import { types as ConfigTypes, mutations as ConfigMutations, queries as ConfigQueries } from './configs';

export let types = `
  scalar JSON
  scalar Date
  ${UserTypes}
  ${ProductTypes}
  ${CompanyTypes}
  ${CustomerTypes}
  ${OrderTypes}
  ${ConfigTypes}
`;

export let queries = `
  ${UserQueries}
  ${ProductQueries}
  ${OrderQueries}
  ${ConfigQueries}
`;

export let mutations = `
  ${UserMutations}
  ${OrderMutations}
  ${ConfigMutations}
`;

export default { mutations, queries, types };
