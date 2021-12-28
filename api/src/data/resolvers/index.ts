import customScalars from './customScalars';
import Mutation from './mutations';
import Query from './queries';
import Order from './order';
import OrderItem from './orderItem'
import Subscription from './subscriptions';

const resolvers: any = {
  ...customScalars,
  Mutation,
  Query,
  Order,
  OrderItem,
  Subscription
};

export default resolvers;
