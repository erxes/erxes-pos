import { debugError, debugExternalApi } from '../../../debuggers';
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
} from '../../utils/orderUtils';
import { checkConnection, sendTransaction } from '../../utils/cardUtils';
import { IContext } from '../../types';
import messageBroker from '../../../messageBroker';
import { ORDER_STATUSES } from '../../../db/models/definitions/constants';

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
      const order = await Orders.createOrder(orderDoc);

      for (const item of items) {
        await OrderItems.createOrderItem({
          count: item.count,
          productId: item.productId,
          unitPrice: item.unitPrice,
          orderId: order._id,
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

  async ordersMakePayment(
    _root,
    { _id, doc }: IPaymentParams,
    { config }: IContext
  ) {
    const order = await Orders.getOrder(_id);
    const items = await OrderItems.find({ orderId: order._id }).lean();

    await validateOrderPayment(order, doc);

    // databank section
    if (doc.cardAmount) {
      const connected = await checkConnection();

      if (connected) {
        const trResponse = await sendTransaction({
          orderNumber: order.number,
          amount: doc.cardAmount,
          billType: doc.billType,
        });

        debugExternalApi(`Transaction response: ${JSON.stringify(trResponse)}`);
      }
    }

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

      try {
        messageBroker().sendMessage('vrpc_queue:erxes-pos-to-api', {
          posToken: config.token,
          syncId: config.syncInfo.id,
          response,
          order,
          items,
        });
      } catch (e) {}

      return response;
    } catch (e) {
      debugError(e);

      return e;
    }
  },
};

export default orderMutations;
