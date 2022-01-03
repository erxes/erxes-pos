import * as dotenv from 'dotenv';
import Customers from '../../../db/models/Customers';
import { Configs } from '../../../db/models/Configs';
import { debugError, debugInit } from '../../../debuggers';
import { httpServer } from '../../../index';
import { initBroker } from '../../../messageBroker';
import { IOrderItem } from '../../../db/models/definitions/orderItems';
import { OrderItems } from '../../../db/models/OrderItems';
import { Orders } from '../../../db/models/Orders';
import { PutResponses } from '../../../db/models/PutResponses';
import { sendRequest } from '../../utils/commonUtils';

import {
  importUsers,
  importProducts,
  validateConfig,
  extractConfig,
  importCustomers,
  preImportProducts,
  preImportCustomers,
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

        await importUsers(cashiers, false);
        await importUsers(adminUsers, true);

        break;
      case 'products':
        const { productGroups = [] } = response;
        await preImportProducts(productGroups);
        await importProducts(productGroups);
        break;
      case 'customers':
        const { customers = [] } = response;
        await preImportCustomers(customers);
        await importCustomers(customers);
        break;
    }

    return 'success'
  },

  async syncOrders(_root, _param) {
    const { ERXES_API_DOMAIN } = process.env;

    const orderFilter = { synced: false, paidDate: { $exists: true, $ne: null } };
    let sumCount = await Orders.find({ ...orderFilter }).count();
    const orders = await Orders.find({ ...orderFilter }).sort({ paidDate: 1 }).limit(100).lean();

    let kind = 'order';
    let putResponses = [];

    if (orders.length) {
      const orderIds = orders.map(o => o._id)
      const orderItems: IOrderItem[] = await OrderItems.find({ orderId: { $in: orderIds } }).lean();

      for (const order of orders) {
        order.items = (orderItems || []).filter(item => (item.orderId === order._id))
      }

      putResponses = await PutResponses.find({ contentId: { $in: orderIds }, synced: false }).lean();
    } else {
      kind = 'putResponse'
      sumCount = await PutResponses.find({ synced: false }).count();
      putResponses = await PutResponses.find({ synced: false }).sort({ paidDate: 1 }).limit(100).lean();
    }

    const config = await Configs.getConfig({});

    try {
      const response = await sendRequest({
        url: `${ERXES_API_DOMAIN}/pos-sync-orders`,
        method: 'post',
        headers: { 'POS-TOKEN': config.token || '' },
        body: { syncId: config.syncInfo.id, orders, putResponses }
      });

      const { error, resOrderIds, putResponseIds } = response;

      if (error) {
        throw new Error(error)
      }

      await Orders.updateMany({ _id: { $in: resOrderIds } }, { $set: { synced: true } });
      await PutResponses.updateMany({ _id: { $in: putResponseIds } }, { $set: { synced: true } });
    } catch (e) {
      throw new Error(e.message);
    }

    return {
      kind,
      sumCount,
      syncedCount: orders.length,
    }
  }
};

export default configMutations;
