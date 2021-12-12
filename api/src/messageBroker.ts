import * as dotenv from 'dotenv';
import messageBroker from 'erxes-message-broker';
import {
  receiveCustomer,
  receiveProduct,
  receiveProductCategory,
  receiveUser,
  receivePosConfig
} from './data/utils/syncUtils';
import { debugError } from './debuggers';

dotenv.config();

let client;

export const initBroker = async server => {
  client = await messageBroker({
    name: 'pos',
    server,
    envs: process.env
  });

  const { consumeQueue } = client;

  try {
    consumeQueue('pos:crudData', async (data) => {
      if (data) {
        switch (data.type) {
          case 'product':
            await receiveProduct(data);
            break;
          case 'productCategory':
            await receiveProductCategory(data);
            break;
          case 'customer':
            await receiveCustomer(data);
            break;
          case 'user':
            await receiveUser(data);
            break;
          case 'pos':
            await receivePosConfig(data);
            break;
          default:
            break;
        }
      }
    });
  } catch (e) {
    debugError(`Error occurred while receiving message: ${e.message}`);
  }
};

export default function() {
  return client;
};
