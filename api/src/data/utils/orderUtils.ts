import * as dayjs from 'dayjs';
import { IOrder, IOrderDocument } from '../../db/models/definitions/orders';

import { Orders } from '../../db/models/Orders';
import { OrderItems } from '../../db/models/OrderItems';
import { Products } from '../../db/models/Products';
import { IPayment } from '../resolvers/mutations/orders';
import { IOrderInput, IOrderItemInput } from '../types';
import {
  BILL_TYPES,
  ORDER_TYPES,
} from '../../db/models/definitions/constants';
import {
  IConfigDocument,
  IEbarimtConfig,
} from '../../db/models/definitions/configs';
import { IOrderItemDocument } from '../../db/models/definitions/orderItems';
import Customers from '../../db/models/Customers';
import { sendRequest } from './commonUtils';
import { DISTRICTS } from '../../db/models/definitions/constants';

interface IDetailItem {
  count: number;
  amount: number;
  inventoryCode: string;
  productId: string;
}

export const generateOrderNumber = async (): Promise<string> => {
  const today = new Date();
  const tomorrow = new Date();
  const todayStr = dayjs().format('YYYYMMDD').toString();

  today.setHours(0, 0, 0);
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0);

  const orderCountToday = await Orders.countDocuments({
    createdAt: { $gte: today, $lt: tomorrow },
  });

  let suffix = String(orderCountToday + 1).padStart(4, '0');
  let number = `${todayStr}_${suffix}`;

  const exists = await Orders.findOne({ number });

  if (!exists) {
    return number;
  }

  const latestOrders = await Orders.find({})
    .sort({ createdAt: -1, number: -1 })
    .limit(2);

  if (latestOrders && latestOrders.length > 0) {
    const parts = latestOrders[0].number.split('_');

    // number generation gone wrong due to timezone
    if (parts[0] === todayStr && parts[1] >= suffix) {
      suffix = String(parseInt(parts[1]) + 1).padStart(4, '0');
      number = `${todayStr}_${suffix}`;
    }
  }

  return number;
};

export const validateOrder = async (doc: IOrderInput) => {
  const { items = [] } = doc;

  if (items.filter(i => !i.isPackage).length < 1) {
    throw new Error('Products missing in order. Please add products');
  }

  for (const item of items) {
    // will throw error if product is not found
    await Products.getProduct({ _id: item.productId });
  }
};

export const validateOrderPayment = (order: IOrder, doc: IPayment) => {
  if (order.paidDate) {
    throw new Error('Order has already been paid');
  }

  const { cardAmount = 0, cashAmount = 0, mobileAmount = 0 } = doc;

  const total = cardAmount + cashAmount + mobileAmount;

  if (total !== order.totalAmount) {
    throw new Error(`Paid amount does not match order's total amount`);
  }
};

export const cleanOrderItems = async (
  orderId: string,
  items: IOrderItemInput[]
) => {
  const itemIds = items.map((item) => item._id);

  await OrderItems.deleteMany({ orderId, isPackage: true });
  await OrderItems.deleteMany({ orderId, _id: { $nin: itemIds } });
};

export const updateOrderItems = async (
  orderId: string,
  items: IOrderItemInput[]
) => {
  const oldItems = await OrderItems.find({ _id: { $in: items.map((item) => item._id) } }).lean();

  const itemIds = oldItems.map(i => i._id);

  for (const item of items) {
    if (itemIds.includes(item._id)) {
      await OrderItems.updateOrderItem(item._id, { count: item.count });
    } else {
      await OrderItems.createOrderItem({
        productId: item.productId,
        count: item.count,
        orderId,
        unitPrice: item.unitPrice,
        isPackage: item.isPackage,
      });
    }
  }
};

export const getTotalAmount = (items: IOrderItemInput[] = []): number => {
  let total = 0;

  for (const item of items) {
    total += (item.count || 0) * (item.unitPrice || 0);
  }

  return total;
};

export const getDistrictName = (districtCode: string): string => {
  if (DISTRICTS[districtCode]) {
    return DISTRICTS[districtCode];
  }

  return '';
};

export const prepareEbarimtData = async (
  order: IOrderDocument,
  config: IEbarimtConfig,
  items: IOrderItemDocument[] = [],
  orderBillType: string,
  registerNumber?: string
) => {
  if (!order) {
    throw new Error('Order must be specified');
  }

  let billType = orderBillType || order.billType || BILL_TYPES.CITIZEN;
  let customerCode = '';
  let customerName = '';

  if (registerNumber) {
    const response = await sendRequest({
      url: config.checkCompanyUrl,
      method: 'GET',
      params: { regno: registerNumber },
    });

    if (response.found) {
      billType = '3';
      customerCode = registerNumber;
      customerName = response.name;
    }
  }

  if (billType === BILL_TYPES.CITIZEN) {
    const customer = await Customers.findOne({ _id: order.customerId });

    if (customer && customer.code) {
      customerCode = customer.code;
    }
  }

  const productIds = items.map((item) => item.productId);
  const products = await Products.find({ _id: { $in: productIds } });
  const productsById = {};

  for (const product of products) {
    productsById[product._id] = product;
  }

  const details: IDetailItem[] = [];

  for (const item of items) {
    // if wrong productId then not sent
    if (!productsById[item.productId]) {
      continue;
    }

    const amount = (item.count || 0) * (item.unitPrice || 0);

    details.push({
      count: item.count,
      amount,
      inventoryCode: productsById[item.productId].code,
      productId: item.productId,
    });
  }

  const cashAmount = order.totalAmount || 0;

  const orderInfo = {
    date: new Date().toISOString().slice(0, 10),
    orderId: order._id,
    hasVat: config.hasVat || false,
    hasCitytax: config.hasCitytax || false,
    billType,
    customerCode,
    customerName,
    description: order.number,
    details,
    cashAmount,
    nonCashAmount: '0.00',
    ebarimtResponse: {},
  };

  return {
    ...orderInfo,
    productsById,
    contentType: 'pos',
    contentId: order._id,
  };
};

export const prepareOrderDoc = async (
  doc: IOrderInput,
  config: IConfigDocument
) => {
  const { catProdMappings = [] } = config;

  const items = doc.items.filter(i => !i.isPackage) || [];

  if (doc.type === ORDER_TYPES.TAKE && catProdMappings.length > 0) {
    const packOfCategoryId = {}
    for (const rel of catProdMappings) {
      packOfCategoryId[rel.categoryId] = rel.productId
    }

    const products = await Products.find({ _id: { $in: items.map(i => (i.productId)) } }).lean();

    const productsOfId = {};
    for (const prod of products) {
      productsOfId[prod._id] = prod;
    }

    const toAddProducts = {}
    for (const item of items) {
      const product = productsOfId[item.productId]

      if (Object.keys(packOfCategoryId).includes(product.categoryId)) {
        const packProductId = packOfCategoryId[product.categoryId]

        if (!Object.keys(toAddProducts).includes(packProductId)) {
          toAddProducts[packProductId] = { count: 0 }
        }

        toAddProducts[packProductId]['count'] += item.count;
      }
    } // end items loop

    const addProductIds = Object.keys(toAddProducts);
    if (addProductIds.length) {
      const takingProducts = await Products.find({
        _id: { $in: addProductIds }
      });

      for (const addProduct of takingProducts) {
        const toAddItem = toAddProducts[addProduct._id]
        items.push({
          _id: Math.random().toString(),
          productId: addProduct._id,
          count: toAddItem.count,
          unitPrice: addProduct.unitPrice,
          isPackage: true
        });
        doc.totalAmount += toAddItem.count || 0 * addProduct.unitPrice || 0;
      }
    }
  }

  return { ...doc, items };
};
