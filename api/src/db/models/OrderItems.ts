import { Model, model } from 'mongoose';
import { orderItemSchema, IOrderItemDocument, IOrderItem } from './definitions/orderItems';

interface IOrderItemModel extends Model<IOrderItemDocument> {
  getOrderItem(_id: string): Promise<IOrderItemDocument>;
  createOrderItem(doc: IOrderItem): Promise<IOrderItemDocument>;
  updateOrderItem(_id: string, doc: IOrderItem): Promise<IOrderItemDocument>;
  deleteOrderItem(_id: string): Promise<{ n: number; ok: number }>;
}

class OrderItem {
  public static async getOrderItem(_id: string) {
    const item = await OrderItems.findOne({ _id });

    if (!item) {
      throw new Error(`Order item not found with id: ${_id}`);
    }

    return item;
  }

  public static createOrderItem(doc: IOrderItem) {
    return OrderItems.create(doc);
  }

  public static updateOrderItem(_id: string, doc: IOrderItem) {
    return OrderItems.updateOne({ _id }, { $set: doc });
  }

  public static async deleteOrderItem(_id: string) {
    await OrderItems.getOrderItem(_id);

    return OrderItems.deleteOne({ _id });
  }
}

orderItemSchema.loadClass(OrderItem);

export const OrderItems = model<IOrderItemModel, IOrderItemDocument>('order_items', orderItemSchema);
