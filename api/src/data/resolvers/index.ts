import customScalars from './customScalars';
import Mutation from './mutations';
import Query from './queries';
import Order from './order';
import OrderItem from './orderItem'

const resolvers: any = {
  ...customScalars,
  Mutation,
  Query,
  Order,
  OrderItem
};

export default resolvers;
