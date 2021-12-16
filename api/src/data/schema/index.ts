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
import { types as CustomerTypes, queries as CustomerQueries, mutations as CustomerMutations } from './customer';
import { types as OrderTypes, mutations as OrderMutations, queries as OrderQueries } from './orders';
import { types as ConfigTypes, mutations as ConfigMutations, queries as ConfigQueries } from './configs';
import { types as PaymentTypes, mutations as PaymentMutations, queries as PaymentQueries } from './payment';

export let types = `
  scalar JSON
  scalar Date
  ${UserTypes}
  ${ProductTypes}
  ${CompanyTypes}
  ${CustomerTypes}
  ${OrderTypes}
  ${ConfigTypes}
  ${PaymentTypes}
`;

export let queries = `
  ${UserQueries}
  ${ProductQueries}
  ${OrderQueries}
  ${ConfigQueries}
  ${CustomerQueries}
  ${PaymentQueries}
`;

export let mutations = `
  ${UserMutations}
  ${OrderMutations}
  ${ConfigMutations}
  ${PaymentMutations}
  ${CustomerMutations}
`;

export default { mutations, queries, types };
