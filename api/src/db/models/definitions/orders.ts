import { Document, Schema } from 'mongoose';
import { field, schemaCreatedAt, getNumberFieldDefinition } from './utils';
import { ORDER_TYPES } from './constants';

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
}

export const orderSchema = new Schema({
  _id: field({ pkey: true }),
  createdAt: schemaCreatedAt,
  status: { type: String, label: 'Status of the order' },
  paidDate: { type: Date, label: 'Paid date' },
  number: { type: String, label: 'Order number', unique: true },
  customerId: { type: String, label: 'Customer' },
  cardAmount: getNumberFieldDefinition({ positive: true, label: 'Card amount' }),
  cashAmount: getNumberFieldDefinition({ positive: true, label: 'Cash amount' }),
  mobileAmount: getNumberFieldDefinition({ positive: true, label: 'Mobile amount' }),
  totalAmount: getNumberFieldDefinition({ positive: true, label: 'Total amount before tax' }),
  finalAmount: getNumberFieldDefinition({ positive: true, label: 'Final amount after tax' }),
  shouldPrintEbarimt: { type: Boolean, label: 'Should print ebarimt for this order' },
  printedEbarimt: { type: Boolean, label: 'Printed ebarimt' },
  billType: { type: String, label: 'Ebarimt receiver entity type' },
  billId: { type: String, label: 'Bill id' },
  registerNumber: { type: String, label: 'Register number of the entity' },
  oldBillId: { type: String, label: 'Previous bill id if it is changed' },
  type: {
    type: String,
    label: 'Choice to take, eat or save the order',
    enum: ORDER_TYPES.ALL,
    default: ORDER_TYPES.EAT
  }
});
