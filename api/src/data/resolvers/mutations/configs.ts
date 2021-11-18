import * as dotenv from 'dotenv';

import { Configs } from '../../../db/models/Configs';
import { sendRequest } from '../../utils/commonUtils';
import { importUsers, importProducts, importCustomers, validateConfig } from '../../syncUtils';

dotenv.config();

const configMutations = {
  async configsFetch(_root, { token }) {
    const { ERXES_API_DOMAIN } = process.env;

    const config = await Configs.createConfig(token);

    const response = await sendRequest({
      url: `${ERXES_API_DOMAIN}/pos`,
      method: 'get',
      headers: { 'POS-TOKEN': token }
    });

    if (response) {
      const { pos = {}, adminUsers = [], cashiers = [], productGroups = [], customers = [] } = response;

      validateConfig(pos);

      await Configs.updateConfig(config._id, {
        name: pos.name,
        description: pos.description,
        brandId: pos.brandId,
        productDetails: pos.productDetails,
        adminIds: pos.adminIds,
        cashierIds: pos.cashierIds,
        uiOptions: pos.uiOptions,
        ebarimtConfig: pos.ebarimtConfig
      });

      await importUsers(adminUsers, true);
      await importUsers(cashiers, false);
      await importProducts(productGroups);
      await importCustomers(customers);
    }

    return config;
  }
};

export default configMutations;
