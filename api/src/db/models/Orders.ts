import { Model, model } from 'mongoose';
import { IOrder, IOrderDocument, orderSchema } from './definitions/orders';

interface IOrderModel extends Model {
  getOrder(_id: string): Promise<IOrderDocument>;
  createOrder(doc: IOrder): Promise<IOrderDocument>;
  updateOrder(_id: string, doc: IOrder): Promise<IOrderDocument>;
  deleteOrder(_id: string): Promise<{ n: number; ok: number }>;
}

class Order {
  public static async getOrder(_id: string) {
    const order = await Orders.findOne({ _id });

    if (!order) {
      throw new Error(`Order not found with id: ${_id}`);
    }

    return order;
  }

  public static createOrder(doc: IOrder) {
    return Orders.create(doc);
  }

  public static updateOrder(_id: string, doc: IOrder) {
    return Orders.updateOne({ _id }, { $set: doc });
  }

  public static async deleteOrder(_id: string) {
    await Orders.getOrder(_id);

    return Orders.deleteOne({ _id });
  }
}

orderSchema.loadClass(Order);

export const Orders = model<IOrderModel, IOrderDocument>('orders', orderSchema);
