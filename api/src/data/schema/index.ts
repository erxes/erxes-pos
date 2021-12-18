import { mutations as UserMutations, queries as UserQueries, types as UserTypes } from './user';
import { mutations as CustomerMutations, queries as CustomerQueries, types as CustomerTypes } from './customer';
import { mutations as OrderMutations, queries as OrderQueries, types as OrderTypes } from './orders';
import { mutations as ConfigMutations, queries as ConfigQueries, types as ConfigTypes } from './configs';
import { mutations as PaymentMutations, queries as PaymentQueries, types as PaymentTypes } from './payment';
import { queries as ProductQueries, types as ProductTypes } from './product';
import { types as CompanyTypes } from './company';



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
