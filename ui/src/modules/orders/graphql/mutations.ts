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

const createQpaySimpleInvoice = `
  mutation createQpaySimpleInvoice($orderId: String!) {
    createQpaySimpleInvoice(orderId: $orderId)
  }
`;

export default { ordersAdd, ordersMakePayment, ordersEdit, createQpaySimpleInvoice };
