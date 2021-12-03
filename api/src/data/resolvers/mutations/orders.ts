import { debugError } from '../../../debuggers';
import { Orders } from '../../../db/models/Orders';
import { OrderItems } from '../../../db/models/OrderItems';
import { PutResponses } from '../../../db/models/PutResponses';
import { IOrderInput } from '../../types';
import {
  generateOrderNumber,
  validateOrderPayment,
  validateOrder,
  updateOrderItems,
  getTotalAmount,
  prepareEbarimtData,
  getDistrictName
} from '../../utils/orderUtils';
import { IContext } from '../../types';

export interface IPayment {
  cardAmount?: number;
  cashAmount?: number;
  mobileAmount?: number;
  billType: string;
  registerNumber?: string;
}

export interface IPaymentParams {
  _id: string;
  doc: IPayment;
}

interface IOrderEditParams extends IOrderInput {
  _id: string;
}

const orderMutations = {
  async ordersAdd(_root, doc: IOrderInput, { user }: IContext) {
    const { items = [], totalAmount, type, customerId } = doc;

    await validateOrder(doc);

    const order = await Orders.createOrder({
      number: await generateOrderNumber(),
      totalAmount,
      type,
      customerId,
      userId: user._id,
    });

    for (const item of items) {
      await OrderItems.createOrderItem({
        count: item.count,
        productId: item.productId,
        unitPrice: item.unitPrice,
        orderId: order._id
      });
    }

    return order;
  },
  async ordersEdit(_root, doc: IOrderEditParams) {
    await Orders.getOrder(doc._id);

    await validateOrder(doc);

    await updateOrderItems(doc._id, doc.items);

    const updatedOrder = await Orders.updateOrder(doc._id, {
      customerId: doc.customerId,
      type: doc.type,
      totalAmount: getTotalAmount(doc.items),
    });

    return updatedOrder;
  },
  async ordersMakePayment(_root, { _id, doc }: IPaymentParams, { config }: IContext) {
    const order = await Orders.getOrder(_id);
    const items = await OrderItems.find({ orderId: order._id }).lean();

    await validateOrderPayment(order, doc);

    const data = await prepareEbarimtData(order, config.ebarimtConfig, items, doc.billType, doc.registerNumber);

    const ebarimtConfig = {
      ...config.ebarimtConfig,
      districtName: getDistrictName(config.ebarimtConfig.districtCode),
    };

    try {
      const response = await PutResponses.putData(data, ebarimtConfig);

      if (response && response.success === 'true') {
        await Orders.updateOne(
          { _id: order._id },
          { $set: { ...doc, paidDate: new Date() } }
        );
      }

      return response;
    } catch (e) {
      debugError(e);

      return e;
    }
  },
};

export default orderMutations;
