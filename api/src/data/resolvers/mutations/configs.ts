import * as dotenv from 'dotenv';

import { Configs } from '../../../db/models/Configs';
import Customers from '../../../db/models/Customers';
import { sendRequest } from '../../utils/commonUtils';
import {
  importUsers,
  importProducts,
  validateConfig,
  extractConfig,
} from '../../utils/syncUtils';

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

      await Configs.updateConfig(config._id, {
        ...extractConfig(pos),
        qpayConfig,
      });

      await importUsers(adminUsers, true);
      await importUsers(cashiers, false);
      await importProducts(productGroups);
      await Customers.insertMany(customers);
    }

    return config;
  },
};

export default configMutations;
