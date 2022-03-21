import { orderFields, orderItemsFields } from './queries';

const addEditParamDefs = `$items: [OrderItemInput], $totalAmount: Float!, $type: String!, $customerId: String`;
const addEditParams = `items: $items, totalAmount: $totalAmount, type: $type, customerId: $customerId`;

const paymentParamDefs = `$_id: String!, $doc: OrderPaymentInput`;
const paymentParams = `_id: $_id, doc: $doc`;

const ordersAdd = `
  mutation ordersAdd(${addEditParamDefs}) {
    ordersAdd(${addEditParams}) {
      ${orderFields}
      ${orderItemsFields}
    }
  }
`;

const ordersMakePayment = `
  mutation ordersMakePayment(${paymentParamDefs}) {
    ordersMakePayment(${paymentParams}) {
      success
      lotteryWarningMsg
      errorCode
      message
      getInformation
    }
  }
`;

const ordersEdit = `
  mutation ordersEdit($_id: String!, ${addEditParamDefs}) {
    ordersEdit(_id: $_id, ${addEditParams}) {
      ${orderFields}
      ${orderItemsFields}
    }
  }
`;

const orderChangeStatus = `
  mutation orderChangeStatus($_id: String!, $status: String) {
    orderChangeStatus(_id: $_id, status: $status) {
      _id
    }
  }
`;

const invoiceFields = `
  qrText
  senderInvoiceNo
  status
  paymentDate
  qpayPaymentId
  status
`;

const createQpaySimpleInvoice = `
  mutation createQpaySimpleInvoice($orderId: String!, $amount: Float) {
    createQpaySimpleInvoice(orderId: $orderId, amount: $amount) {
      ${invoiceFields}
    }
  }
`;

const qpayCheckPayment = `
  mutation qpayCheckPayment($orderId: String!, $_id: String) {
    qpayCheckPayment(orderId: $orderId, _id: $_id) {
      ${invoiceFields}
    }
  }
`;

const customersAdd = `
  mutation customersAdd($firstName: String, $lastName: String, $email: String, $phone: String) {
    customersAdd(firstName: $firstName, lastName: $lastName, email: $email, phone: $phone) {
      _id
    }
  }
`;

const ordersAddCardPayment = `
  mutation ordersAddCardPayment($_id: String!, $amount: Float!, $cardInfo: JSON) {
    ordersAddCardPayment(_id: $_id, amount: $amount, cardInfo: $cardInfo) {
      ${orderFields}
      ${orderItemsFields}
    }
  }
`;

const qpayCancelInvoice = `
  mutation qpayCancelInvoice($_id: String!) {
    qpayCancelInvoice(_id: $_id)
  }
`;

export default {
  ordersAdd,
  ordersMakePayment,
  ordersEdit,
  orderChangeStatus,
  createQpaySimpleInvoice,
  qpayCheckPayment,
  customersAdd,
  ordersAddCardPayment,
  qpayCancelInvoice
};
