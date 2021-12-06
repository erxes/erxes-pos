import { Orders } from "../../../db/models/Orders";
import { QPayInvoices } from "../../../db/models/QPayInvoices";
import { IContext } from '../../types';
import { fetchQPayToken, requestQPayInvoice } from '../../utils/qpayUtils';

interface IInvoiceParams {
  description: string;
  amount: string;
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
      amount: order.totalAmount.toString()
    });

    const invoiceData = await requestQPayInvoice(
      {
        invoice_code: config.qpayConfig.invoiceCode,
        sender_invoice_no: order._id,
        invoice_receiver_code: 'terminal',
        invoice_description: order.number,
        amount: order.totalAmount,
        callback_url: `${config.qpayConfig.callbackUrl}?payment_id=${order._id}`
      },
      tokenInfo.access_token,
      config.qpayConfig
    );

    if (invoiceData) {
      await QPayInvoices.updateInvoice(invoice._id, invoiceData);
    }

    return invoiceData;
  },
};

export default paymentMutations;
