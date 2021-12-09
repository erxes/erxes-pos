import * as dotenv from 'dotenv';
import messageBroker from 'erxes-message-broker';
import { receiveCustomer, receiveProduct, receiveProductCategory } from './data/utils/syncUtils';

dotenv.config();

let client;

export const initBroker = async server => {
  client = await messageBroker({
    name: 'pos',
    server,
    envs: process.env
  });

  const { consumeQueue } = client;

  consumeQueue('pos:crudData', async data => {
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
        default:
          break;
      }
    }
  });
};

export default function() {
  return client;
};
