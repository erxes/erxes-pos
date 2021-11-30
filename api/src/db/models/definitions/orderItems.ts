import { Document, Schema } from 'mongoose';
import { field, getDateFieldDefinition, getNumberFieldDefinition } from './utils';

export interface IOrderItem {
  createdAt?: Date;
  productId: string;
  count: number;
  unitPrice: number;
  discountAmount?: number;
  discountPercent?: number;
  orderId: string;
}

export interface IOrderItemDocument extends Document, IOrderItem {
  _id: string;
  productName: string;
}

export const orderItemSchema = new Schema({
  _id: field({ pkey: true }),
  createdAt: getDateFieldDefinition('Created at'),
  productId: { type: String, label: 'Product' },
  count: getNumberFieldDefinition({ label: 'Count', positive: true }),
  unitPrice: getNumberFieldDefinition({ label: 'Unit price', positive: true }),
  discountAmount: getNumberFieldDefinition({ label: 'Discount price amount', discount: true }),
  discountPercent: getNumberFieldDefinition({ label: 'Discount percent', discount: true, default: 0 }),
  orderId: { type: String, label: 'Order id' }
});
