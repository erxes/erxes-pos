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

const mutations = {
  ordersAdd,
  ordersEdit,
  createQpaySimpleInvoice,
};

export default mutations;
