import * as dotenv from 'dotenv';

import { Configs } from '../../../db/models/Configs';
import Customers from '../../../db/models/Customers';
import { sendRequest } from '../../utils/commonUtils';
import { initBroker } from '../../../messageBroker';
import { httpServer } from '../../../index';
import {
  importUsers,
  importProducts,
  validateConfig,
  extractConfig,
  importCustomers,
} from '../../utils/syncUtils';
import { debugError, debugInit } from '../../../debuggers';

dotenv.config();

const configMutations = {
  async configsFetch(_root, { token }) {
    const { ERXES_API_DOMAIN } = process.env;

    const config = await Configs.createConfig(token);

    const response = await sendRequest({
      url: `${ERXES_API_DOMAIN}/pos-init`,
      method: 'get',
      headers: { 'POS-TOKEN': token },
    });

    if (response) {
      const {
        pos = {},
        adminUsers = [],
        cashiers = [],
        productGroups = [],
        customers = [],
        qpayConfig,
      } = response;

      validateConfig(pos);

      await Configs.updateConfig(config._id, { ...extractConfig(pos), syncInfo: pos.syncInfo, qpayConfig });

      await importUsers(adminUsers, true);
      await importUsers(cashiers, false);
      await importProducts(productGroups);
      await Customers.insertMany(customers);
    }

    initBroker(httpServer).then(() => {
      debugInit('Message broker has started.')
    }).catch(e => {
      debugError(`Error occurred when starting message broker: ${e.message}`);
    });

    return config;
  },

  async syncConfig(_root, { type }) {
    const { ERXES_API_DOMAIN } = process.env;

    const config = await Configs.findOne({}).lean();

    const response = await sendRequest({
      url: `${ERXES_API_DOMAIN}/pos-sync-config`,
      method: 'get',
      headers: { 'POS-TOKEN': config.token || '' },
      body: { syncId: config.syncInfo.id, type }
    });

    if (!response) {
      return;
    }

    switch (type) {
      case 'config':
        const {
          pos = {},
          adminUsers = [],
          cashiers = [],
          qpayConfig,
        } = response;
        await Configs.updateConfig(config._id, { ...extractConfig(pos), qpayConfig });

        await importUsers(adminUsers, true);
        await importUsers(cashiers, false);

        break;
      case 'products':
        const { productGroups = [] } = response;
        await importProducts(productGroups);
        break;
      case 'customers':
        const { customers = [] } = response;
        await importCustomers(customers);
        break;
    }

    return 'success'
  },

  async syncOrders(_root, _param) {
    return 'success'
  }
};

export default configMutations;
