import { Document, Schema } from 'mongoose';
import { field, getDateFieldDefinition } from './utils';

export interface IQPayInvoice {
  senderInvoiceNo: string;
  amount: string;
  qpayInvoiceId: string;
  qrText: string;
  qpayPaymentId: string;
  paymentDate: Date;
  createdAt: Date;
  status: string;
}

export interface IQpayInvoiceDocument extends IQPayInvoice, Document {
  _id: string;
}

export const qpayInvoiceSchema = new Schema({
  _id: field({ pkey: true }),
  senderInvoiceNo: { type: String, optional: true, unique: true, label: 'Order id' },
  amount: { type: String, optional: true, label: 'Amount' },  
  qpayInvoiceId: { type: String, optional: true, label: 'QPay invoice id' },
  qrText: { type: String, optional: true, label: 'QR text' },
  qpayPaymentId: { type: String, optional: true, label: 'QPay payment id' },
  status: { type: String, default: "open", label: 'Invoice status' },
  paymentDate: {
    type: Date,
    label: 'Updated Date for Qpay payment'
  },
  createdAt: getDateFieldDefinition('Created at')
});
