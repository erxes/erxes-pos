import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { createServer } from 'http';
import * as mongoose from 'mongoose';
import * as path from 'path';
import { initApolloServer } from './apolloServer';
import {
  authCookieOptions,
  getEnv,
  routeErrorHandling,
} from './data/utils/commonUtils';
import { connect, mongoStatus } from './db/connection';
import { Configs } from './db/models/Configs';
import { QPayInvoices } from './db/models/QPayInvoices';
import { Orders } from './db/models/Orders';
import { debugError, debugInit } from './debuggers';
import userMiddleware from './middlewares/userMiddleware';
import { initBroker } from './messageBroker';
import './cronJobs/changeStatusDone';
import './cronJobs/changeStatusComplete';

// load environment variables
dotenv.config();

const { NODE_ENV, JWT_TOKEN_SECRET } = process.env;

if (!JWT_TOKEN_SECRET) {
  throw new Error('Please configure JWT_TOKEN_SECRET environment variable.');
}

const MAIN_APP_DOMAIN = getEnv({ name: 'MAIN_APP_DOMAIN' });

export const app = express();

app.disable('x-powered-by');

app.use(express.urlencoded({ extended: true }));

app.use(
  express.json({
    limit: '15mb',
  })
);

app.use(cookieParser());

const corsOptions = {
  credentials: true,
  origin: [MAIN_APP_DOMAIN],
};

app.use(cors(corsOptions));

app.get(
  '/initial-setup',
  routeErrorHandling(async (req: any, res) => {
    const configCount = await Configs.countDocuments();

    if (configCount === 0) {
      return res.send('no config found');
    }

    const envMaps = JSON.parse(req.query.envs || '{}');

    for (const key of Object.keys(envMaps)) {
      res.cookie(key, envMaps[key], authCookieOptions(req.secure));
    }

    return res.send('success');
  })
);

app.use(userMiddleware);

app.use('/static', express.static(path.join(__dirname, 'private')));

// for health check
app.get('/health', async (_req, res) => {
  await mongoStatus();

  res.end('ok');
});

// qpay invoice callback
app.get('/payments', async (req) => {
  const { payment_id, qpay_payment_id } = req.query;

  if (payment_id && qpay_payment_id) {
    const order = await Orders.findOne({ _id: payment_id });

    if (order) {
      await Orders.updateOne(
        { _id: order._id },
        { $set: { paidDate: new Date() } }
      );
    }

    const invoice = await QPayInvoices.findOne({ senderInvoiceNo: payment_id });

    if (invoice) {
      await QPayInvoices.updateOne(
        { _id: invoice._id },
        { $set: { qpayPaymentId: qpay_payment_id, paymentDate: new Date() } }
      );
    }
  }
});

// Error handling middleware
app.use((error, _req, res, _next) => {
  debugError(error.message);
  res.status(500).send(error.message);
});

// Wrap the Express server
export const httpServer = createServer(app);

const PORT = getEnv({ name: 'PORT' });
const MONGO_URL = getEnv({ name: 'MONGO_URL' });
const TEST_MONGO_URL = getEnv({ name: 'TEST_MONGO_URL' });

httpServer.listen(PORT, () => {
  let mongoUrl = MONGO_URL;

  if (NODE_ENV === 'test') {
    mongoUrl = TEST_MONGO_URL;
  }

  initApolloServer().then((apolloServer) => {
    apolloServer.applyMiddleware({ app, path: '/graphql', cors: corsOptions });

    // subscriptions server
    apolloServer.installSubscriptionHandlers(httpServer);
  });

  // connect to mongo database
  connect(mongoUrl)
    .then(async () => {
      debugInit(`GraphQL Server is now running on ${PORT}`);
      try {
        initBroker(httpServer).then(() => {
          debugInit('Message broker has started.')
        }).catch(e => {
          debugError(`Error occurred when starting message broker: ${e.message}`);
        });
      } catch (e) {
        debugError(`Error occurred when starting message broker on try: ${e.message}`);
      }

    })
    .catch((e) => {
      debugError(`Error occured while starting init: ${e.message}`);
    });
});

// GRACEFULL SHUTDOWN
process.stdin.resume(); // so the program will not close instantly

// If the Node process ends, close the Mongoose connection
if (NODE_ENV === 'production') {
  (['SIGINT', 'SIGTERM'] as NodeJS.Signals[]).forEach((sig) => {
    process.on(sig, () => {
      // Stops the server from accepting new connections and finishes existing connections.
      httpServer.close((error: Error | undefined) => {
        if (error) {
          console.error(error.message);
          process.exit(1);
        }

        mongoose.connection.close(() => {
          console.log('Mongoose connection disconnected');
          process.exit(0);
        });
      });
    });
  });
}
