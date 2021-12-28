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
  getDistrictName,
  prepareOrderDoc,
  cleanOrderItems
} from '../../utils/orderUtils';
import { IContext } from '../../types';
import messageBroker from '../../../messageBroker';
import { ORDER_STATUSES } from '../../../db/models/definitions/constants';
import { graphqlPubsub } from '../../../pubsub';

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

interface IInfoParams {
  _id: string;
  info: string;
}

const orderMutations = {
  async ordersAdd(_root, doc: IOrderInput, { user, config }: IContext) {
    const { totalAmount, type, customerId } = doc;

    await validateOrder(doc);

    const orderDoc = {
      number: await generateOrderNumber(),
      totalAmount,
      type,
      customerId,
      userId: user._id,
    };

    const exists = await Orders.findOne({ number: orderDoc.number });

    if (exists) {
      const parts = orderDoc.number.split('_');
      const number = Number(
        orderDoc.number.substring(
          orderDoc.number.indexOf('_') + 1,
          orderDoc.number.length
        )
      );

      orderDoc.number = `${parts[0]}_${String(number + 1).padStart(4, '0')}`;
    }

    try {
      const preparedDoc = await prepareOrderDoc(doc, config);

      const order = await Orders.createOrder({
        ...orderDoc,
        totalAmount: preparedDoc.totalAmount
      });

      for (const item of preparedDoc.items) {
        await OrderItems.createOrderItem({
          count: item.count,
          productId: item.productId,
          unitPrice: item.unitPrice,
          orderId: order._id,
          isPackage: item.isPackage,
        });
      }

      return order;
    } catch (e) {
      debugError(
        `Error occurred when creating order: ${JSON.stringify(orderDoc)}`
      );

      return e;
    }
  },
  async ordersEdit(_root, doc: IOrderEditParams, { config }: IContext) {
    await Orders.getOrder(doc._id);

    await validateOrder({ ...doc });

    await cleanOrderItems(doc._id, doc.items);

    const preparedDoc = await prepareOrderDoc({ ...doc }, config);

    await updateOrderItems(doc._id, preparedDoc.items);

    const updatedOrder = await Orders.updateOrder(doc._id, {
      customerId: doc.customerId,
      type: doc.type,
      totalAmount: getTotalAmount(preparedDoc.items),
    });

    return updatedOrder;
  },

  async ordersMakePayment(
    _root,
    { _id, doc }: IPaymentParams,
    { config }: IContext
  ) {
    const order = await Orders.getOrder(_id);
    const items = await OrderItems.find({ orderId: order._id }).lean();

    await validateOrderPayment(order, doc);

    const data = await prepareEbarimtData(
      order,
      config.ebarimtConfig,
      items,
      doc.billType,
      doc.registerNumber
    );

    await Orders.updateOne({ _id }, { $set: { status: ORDER_STATUSES.PAID } });

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

      graphqlPubsub.publish('ordersOrdered', {
        ordersOrdered: {
          _id,
          status: order.status
        }
      });

      try {
        messageBroker().sendMessage('vrpc_queue:erxes-pos-to-api', {
          posToken: config.token,
          syncId: config.syncInfo.id,
          response,
          order,
          items,
        });
      } catch (e) { }

      return response;
    } catch (e) {
      debugError(e);

      return e;
    }
  }, // end payment mutation
  async ordersSetPaymentInfo(_root, { _id, info }: IInfoParams) {
    const order = await Orders.getOrder(_id);

    await Orders.updateOne({ _id }, { $set: { cardPaymentInfo: info } });

    return Orders.findOne({ _id: order._id });
  }
};

export default orderMutations;
