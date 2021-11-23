import { Document, Schema } from 'mongoose';
import { field, getDateFieldDefinition, getNumberFieldDefinition } from './utils';
import { ORDER_TYPES } from './constants';
import { IOrderItemDocument } from './orderItems';
import { ICustomerDocument } from './customers';

export interface IOrder {
  status: string;
  createdAt: Date;
  paidDate: Date;
  number: string;
  customerId?: string;
  cardAmount: number;
  cashAmount: number;
  mobileAmount: number;
  totalAmount: number;
  finalAmount: number;
  shouldPrintEbarimt: boolean;
  printedEbarimt: boolean;
  billType: string;
  billId: string;
  registerNumber: string;
  oldBillId: string;
  type: string;
}

export interface IOrderDocument extends Document, IOrder {
  _id: string;
  items: IOrderItemDocument[];
  customer?: ICustomerDocument;
  userId: string;
}

const commonAttributes = { positive: true, default: 0 };

export const orderSchema = new Schema({
  _id: field({ pkey: true }),
  createdAt: getDateFieldDefinition('Created at'),
  status: { type: String, label: 'Status of the order' },
  paidDate: { type: Date, label: 'Paid date' },
  number: { type: String, label: 'Order number', unique: true },
  customerId: { type: String, label: 'Customer' },
  cardAmount: getNumberFieldDefinition({ ...commonAttributes, label: 'Card amount' }),
  cashAmount: getNumberFieldDefinition({ ...commonAttributes, label: 'Cash amount' }),
  mobileAmount: getNumberFieldDefinition({ ...commonAttributes, label: 'Mobile amount' }),
  totalAmount: getNumberFieldDefinition({ ...commonAttributes, label: 'Total amount before tax' }),
  finalAmount: getNumberFieldDefinition({ ...commonAttributes, label: 'Final amount after tax' }),
  shouldPrintEbarimt: { type: Boolean, label: 'Should print ebarimt for this order' },
  printedEbarimt: { type: Boolean, label: 'Printed ebarimt', default: false },
  billType: { type: String, label: 'Ebarimt receiver entity type' },
  billId: { type: String, label: 'Bill id' },
  registerNumber: { type: String, label: 'Register number of the entity' },
  oldBillId: { type: String, label: 'Previous bill id if it is changed' },
  type: {
    type: String,
    label: 'Choice to take, eat or save the order',
    enum: ORDER_TYPES.ALL,
    default: ORDER_TYPES.EAT
  },
  userId: { type: String, label: 'Created user id' }
});
