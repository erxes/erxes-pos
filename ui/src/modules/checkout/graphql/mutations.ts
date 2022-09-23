import { orderFields, orderItemsFields } from './queries';

const addEditParamDefs = `$items: [OrderItemInput], $totalAmount: Float!, $type: String!, $customerId: String, $slotCode: String, $registerNumber: String`;
const addEditParams = `items: $items, totalAmount: $totalAmount, type: $type, customerId: $customerId, slotCode: $slotCode, registerNumber: $registerNumber`;

const ordersAdd = `
  mutation ordersAdd(${addEditParamDefs}, $origin: String) {
    ordersAdd(${addEditParams}, origin: $origin) {
     _id
    }
  }
`;

const ordersEdit = `
  mutation ordersEdit($_id: String!, ${addEditParamDefs}) {
    ordersEdit(_id: $_id, ${addEditParams}) {
      _id
    }
  }
`;

const invoiceFields = `
  _id
  amount
  qrText
  senderInvoiceNo
  status
  paymentDate
  qpayPaymentId
  status
`;

const createQpaySimpleInvoice = `
  mutation poscCreateQpaySimpleInvoice($orderId: String!, $amount: Float) {
    poscCreateQpaySimpleInvoice(orderId: $orderId, amount: $amount) {
      ${invoiceFields}
    }
  }
`;

const qpayCheckPayment = `
mutation QpayCheckPayment($orderId: String!, $id: String) {
  qpayCheckPayment(orderId: $orderId, _id: $id) {
    _id
    status
  }
}
`;

const qpayCancelInvoice = `
mutation QpayCancelInvoice($id: String!) {
  qpayCancelInvoice(_id: $id)
}
`;

const ordersAddPayment = `
  mutation ordersAddPayment($_id: String!, $cashAmount: Float, $cardAmount: Float, $cardInfo: JSON) {
    ordersAddPayment(_id: $_id, cashAmount: $cashAmount, cardAmount: $cardAmount, cardInfo: $cardInfo) {
      ${orderFields}
      ${orderItemsFields}
    }
  }
`;

const ordersSettlePayment = `
  mutation ordersSettlePayment($_id: String!, $billType: String!, $registerNumber: String) {
    ordersSettlePayment(_id: $_id, billType: $billType, registerNumber: $registerNumber) {
      success
      lotteryWarningMsg
      errorCode
      message
      getInformation
    }
  }
`;

const mutations = {
  ordersAdd,
  ordersEdit,
  createQpaySimpleInvoice,
  ordersAddPayment,
  qpayCheckPayment,
  qpayCancelInvoice,
  ordersSettlePayment,
};

export default mutations;
