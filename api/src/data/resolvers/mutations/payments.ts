import { Orders } from '../../../db/models/Orders';
import { QPayInvoices } from '../../../db/models/QPayInvoices';
import { IContext } from '../../types';
import {
  fetchQPayToken,
  requestQPayInvoice,
  fetchInvoicePayment,
} from '../../utils/qpayUtils';

interface IInvoiceParams {
  orderId: string;
}

const paymentMutations = {
  async createQpaySimpleInvoice(
    _root,
    params: IInvoiceParams,
    { config }: IContext
  ) {
    if (!config.qpayConfig) {
      throw new Error('QPay config missing');
    }

    const { orderId } = params;

    const order = await Orders.getOrder(orderId);

    const tokenInfo = await fetchQPayToken(config.qpayConfig);

    const invoice = await QPayInvoices.createInvoice({
      senderInvoiceNo: order._id,
      amount: order.totalAmount.toString(),
    });

    const invoiceData = await requestQPayInvoice(
      {
        invoice_code: config.qpayConfig.invoiceCode,
        sender_invoice_no: order._id,
        invoice_receiver_code: 'terminal',
        invoice_description: order.number,
        amount: order.totalAmount,
        callback_url: `${config.qpayConfig.callbackUrl}?payment_id=${order._id}`,
      },
      tokenInfo.access_token,
      config.qpayConfig
    );

    if (invoiceData) {
      await QPayInvoices.updateInvoice(invoice._id, invoiceData);
    }

    return invoiceData;
  },
  async qpayCheckPayment(
    _root,
    { orderId }: IInvoiceParams,
    { config }: IContext
  ) {
    let invoice = await QPayInvoices.getInvoice(orderId);
    const tokenInfo = await fetchQPayToken(config.qpayConfig);
    const response = await fetchInvoicePayment(
      invoice.qpayInvoiceId,
      tokenInfo.access_token,
      config.qpayConfig
    );

    // check payment info
    const { rows = [], count = 0 } = response;

    if (count && rows.length > 0) {
      const row = rows.find(
        (r) => r.payment_status === 'PAID' && r.payment_date && r.payment_id
      );

      if (row) {
        invoice = await QPayInvoices.updateOne(
          { _id: invoice._id },
          {
            $set: {
              qpayPaymentId: row.payment_id,
              paymentDate: row.payment_date,
              status: row.payment_status,
            },
          }
        );
      }
    }

    return invoice;
  },
};

export default paymentMutations;
