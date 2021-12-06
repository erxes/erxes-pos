import { model } from 'mongoose';
import { IQPayInvoice, qpayInvoiceSchema } from './definitions/qpayInvoices';

class QPayInvoice {
  public static async getInvoice(_id: string) {
    const invoice = await QPayInvoices.findOne({ _id });

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
      throw new Error('senderInvoiceNo duplicated');
    }

    return QPayInvoices.create({ ...doc });
  }

  public static async updateInvoice(_id, invoiceData) {
    const qpayInvoiceId = invoiceData.invoice_id;
    const qrText = invoiceData.qr_text;

    await QPayInvoices.updateOne(
      { _id },
      { $set: { qpayInvoiceId, qrText } }
    );
  }
}

qpayInvoiceSchema.loadClass(QPayInvoice);

export const QPayInvoices = model('qpay_invoices', qpayInvoiceSchema);
