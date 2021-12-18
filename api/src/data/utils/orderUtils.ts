import * as dayjs from 'dayjs';
import { IOrder, IOrderDocument } from '../../db/models/definitions/orders';

import { Orders } from '../../db/models/Orders';
import { OrderItems } from '../../db/models/OrderItems';
import { Products } from '../../db/models/Products';
import { IPayment } from '../resolvers/mutations/orders';
import { IOrderInput, IOrderItemInput } from '../types';
import { BILL_TYPES } from '../../db/models/definitions/constants';
import { IEbarimtConfig } from '../../db/models/definitions/configs';
import { IOrderItemDocument } from '../../db/models/definitions/orderItems';
import Customers from '../../db/models/Customers';
import { sendRequest } from './commonUtils'
import { DISTRICTS } from '../../db/models/definitions/constants';

interface IDetailItem {
  count: number;
  amount: number;
  inventoryCode: string;
  productId: string;
}

export const generateOrderNumber = async (): Promise<string> => {
  const today = dayjs().hour(0).minute(0).second(0);
  const tomorrow = today.add(1, 'day');

  const orderCountToday = await Orders.countDocuments({
    createdAt: { $gte: today.toDate(), $lt: tomorrow.toDate() },
  });

  const dateString = today.format('YYYYMMDD').toString();
  let number = String(orderCountToday + 1).padStart(4, '0');

  let order = await Orders.findOne({ number: `${dateString}_${number}` });

  if (!order) {
    return `${dateString}_${number}`;
  }

  do {
    number = String(orderCountToday + 2).padStart(4, '0');

    order = await Orders.findOne({ number: `${dateString}_${number}` })
  } while (!order)

  return `${dateString}_${number}`;
};

export const validateOrder = async (doc: IOrderInput) => {
  const { items = [] } = doc;

  if (items.length < 1) {
    throw new Error('Products missing in order. Please add products');
  }

  for (const item of items) {
    // will throw error if product is not found
    await Products.getProduct({ _id: item.productId });
  }
};

export const validateOrderPayment = (order: IOrder, doc: IPayment) => {
  if (order.paidDate) {
    throw new Error(`Ebarimt has already been given to order "${order.number}"`);
  }

  const { cardAmount = 0, cashAmount = 0, mobileAmount = 0 } = doc;

  const total = cardAmount + cashAmount + mobileAmount;

  if (total !== order.totalAmount) {
    throw new Error(`Paid amount does not match order's total amount`);
  }
};

export const updateOrderItems = async (
  orderId: string,
  items: IOrderItemInput[]
) => {
  const itemIds = items.map((item) => item._id);

  await OrderItems.deleteMany({ orderId, _id: { $nin: itemIds } });

  for (const item of items) {
    const found = await OrderItems.findOne({ _id: item._id });

    if (found) {
      await OrderItems.updateOrderItem(found._id, { count: item.count });
    } else {
      await OrderItems.createOrderItem({
        productId: item.productId,
        count: item.count,
        orderId,
        unitPrice: item.unitPrice
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

  return ''
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
