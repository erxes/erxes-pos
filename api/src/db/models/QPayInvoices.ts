import { model } from 'mongoose';
import { IQPayInvoice, qpayInvoiceSchema } from './definitions/qpayInvoices';

class QPayInvoice {
  public static async getInvoice(orderId: string, _id?: string) {
    const invoice = await QPayInvoices.findOne({
      $or: [{ _id }, { senderInvoiceNo: orderId }],
    });

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    return invoice;
  }

  public static async createInvoice(doc: IQPayInvoice) {
    const invoice = await QPayInvoices.findOne({
      senderInvoiceNo: doc.senderInvoiceNo,
    });

    if (invoice) {
      throw new Error('An invoice is already created for this order');
    }

    return QPayInvoices.create({ ...doc });
  }

  public static async updateInvoice(_id, invoiceData) {
    const qpayInvoiceId = invoiceData.invoice_id;
    const qrText = invoiceData.qr_text;

    await QPayInvoices.updateOne({ _id }, { $set: { qpayInvoiceId, qrText } });
  }
}

qpayInvoiceSchema.loadClass(QPayInvoice);

export const QPayInvoices = model('qpay_invoices', qpayInvoiceSchema);
