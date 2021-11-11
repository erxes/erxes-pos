import customScalars from './customScalars';
import Mutation from './mutations';
import Query from './queries';
import Order from './order';

const resolvers: any = {
  ...customScalars,
  Mutation,
  Query,
  Order
};

export default resolvers;
