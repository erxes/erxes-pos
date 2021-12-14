import * as dotenv from 'dotenv';
import messageBroker from 'erxes-message-broker';
import {
  receiveCustomer,
  receiveProduct,
  receiveProductCategory,
  receiveUser,
  receivePosConfig
} from './data/utils/syncUtils';
import { Configs } from './db/models/Configs';
import { Orders } from './db/models/Orders';
import { debugError } from './debuggers';
import { PutResponses } from './db/models/PutResponses';

dotenv.config();

let client;

export const initBroker = async server => {
  client = await messageBroker({
    name: 'pos',
    server,
    envs: process.env
  });

  const { consumeQueue } = client;

  const config = await Configs.findOne().lean();
  const syncId = (config.syncInfo || {}).id || '';

  try {
    consumeQueue(`pos:crudData_${syncId}`, async (data) => {
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

    consumeQueue(`vrpc_queue:erxes-pos-from-api_${syncId}`, async (data) => {
      const { responseId, orderId } = data;
      await Configs.updateOne({}, { $set: { 'syncInfo.date': new Date() } })
      await Orders.updateOne({ _id: orderId }, { $set: { synced: true } });
      await PutResponses.updateOne({ _id: responseId }, { $set: { synced: true } });

    })
  } catch (e) {
    debugError(`Error occurred while receiving message: ${e.message}`);
  }
};

export default function () {
  return client;
};
