import { ApolloServer, gql, PlaygroundConfig } from 'apollo-server-express';
import * as dotenv from 'dotenv';
import resolvers from './data/resolvers';
import * as typeDefDetails from './data/schema';

// load environment variables
dotenv.config();

const { NODE_ENV } = process.env;

let playground: PlaygroundConfig = true;

if (NODE_ENV !== 'production') {
  playground = {
    settings: {
      'general.betaUpdates': false,
      'editor.theme': 'dark',
      'editor.reuseHeaders': true,
      'tracing.hideTracingResponse': true,
      'editor.fontSize': 14,
      'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
      'request.credentials': 'include'
    }
  };
}

let apolloServer;

export const initApolloServer = async () => {
  const { types, queries, mutations } = typeDefDetails;

  const typeDefs = gql(`
    ${types}
    type Query {
      ${queries}
    }
    type Mutation {
      ${mutations}
    }
  `);

  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground,
    uploads: false,
    context: ({ req, res, connection }) => {
      let user = req && req.user ? req.user : null;

      if (!req) {
        if (connection && connection.context && connection.context.user) {
          user = connection.context.user;
        }

        return {
          user
        };
      }

      return {
        user,
        res,
        requestInfo: {
          secure: req.secure,
          cookies: req.cookies
        }
      };
    }
  });

  return apolloServer;
};

export default apolloServer;
