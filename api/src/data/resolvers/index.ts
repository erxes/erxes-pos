import customScalars from './customScalars';
import Mutation from './mutations';
import Query from './queries';

const resolvers: any = {
  ...customScalars,
  Mutation,
  Query
};

export default resolvers;
