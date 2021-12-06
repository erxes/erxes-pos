import { Orders } from '../../../db/models/Orders';
import { QPayInvoices } from '../../../db/models/QPayInvoices';
import { IContext } from '../../types';
import { fetchQPayInvoice, fetchQPayToken } from '../../utils/qpayUtils';

interface IInvoiceParams {
  orderId: string;
}

const paymentQueries = {
  async fetchRemoteInvoice(
    _root,
    { orderId }: IInvoiceParams,
    { config }: IContext
  ) {
    const order = await Orders.getOrder(orderId);
    const invoice = await QPayInvoices.findOne({ senderInvoiceNo: order._id });

    if (!invoice) {
      throw new Error(`Invoice not found for order: ${order._id}`);
    }

    const tokenInfo = await fetchQPayToken(config.qpayConfig);
    const data = await fetchQPayInvoice(
      invoice.qpayInvoiceId,
      tokenInfo.access_token,
      config.qpayConfig
    );

    if (!data) {
      throw new Error('Failed to fetch QPay invoice');
    }

    const { invoice_status = '', payments = [] } = data;
    const payment = payments.find((p) => p.payment_status === 'PAID');

    if (!invoice.qpayPaymentId && invoice_status === 'CLOSED' && payment) {
      await QPayInvoices.updateOne(
        { _id: invoice._id },
        {
          $set: {
            qpayPaymentId: payment.payment_id,
            paymentDate: new Date(),
            status: 'PAID',
          },
        }
      );
    }

    return QPayInvoices.findOne({ _id: invoice._id });
  },
};

export default paymentQueries;
