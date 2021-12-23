const addEditParamDefs = `$items: [OrderItemInput], $totalAmount: Float!, $type: String!, $customerId: String`;
const addEditParams = `items: $items, totalAmount: $totalAmount, type: $type, customerId: $customerId`;

const ordersAdd = `
  mutation ordersAdd(${addEditParamDefs}) {
    ordersAdd(${addEditParams}) {
      _id
      number
    }
  }
`;

const ordersMakePayment = `
  mutation ordersMakePayment($_id: String!, $doc: OrderPaymentInput) {
    ordersMakePayment(_id: $_id, doc: $doc) {
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
  mutation createQpaySimpleInvoice($orderId: String!) {
    createQpaySimpleInvoice(orderId: $orderId) {
      ${invoiceFields}
    }
  }
`;

const qpayCheckPayment = `
  mutation qpayCheckPayment($orderId: String!) {
    qpayCheckPayment(orderId: $orderId) {
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

const ordersSetPaymentInfo = `
  mutation ordersSetPaymentInfo($_id: String, $info: String) {
    ordersSetPaymentInfo(_id: $_id, info: $info) {
      _id
    }
  }
`;

export default {
  ordersAdd,
  ordersMakePayment,
  ordersEdit,
  createQpaySimpleInvoice,
  qpayCheckPayment,
  customersAdd,
  ordersSetPaymentInfo
};
