const addEditParamDefs = `$items: [OrderItemInput], $totalAmount: Float!, $type: String!, $customerId: String, $slotCode: String, $registerNumber: String, $billType: String, $origin: String, $deliveryInfo: JSON`;
const addEditParams = `items: $items, totalAmount: $totalAmount, type: $type, customerId: $customerId, slotCode: $slotCode, registerNumber: $registerNumber, billType: $billType, origin: $origin, deliveryInfo: $deliveryInfo`;

const ordersAdd = `
  mutation ordersAdd(${addEditParamDefs}) {
    ordersAdd(${addEditParams}) {
     _id
    }
  }
`;

const ordersEdit = `
  mutation ordersEdit($_id: String!, ${addEditParamDefs}) {
    ordersEdit(_id: $_id, ${addEditParams}) {
      _id,
      status
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
    qpayPaymentId
    paymentDate
  }
}
`;

const qpayCancelInvoice = `
mutation QpayCancelInvoice($id: String!) {
  qpayCancelInvoice(_id: $id)
}
`;

const ordersAddPayment = `
  mutation ordersAddPayment(
    $_id: String!
    $cashAmount: Float
    $cardAmount: Float
    $cardInfo: JSON
    $receivableAmount: Float
    $mobileAmount: Float
  ) {
    ordersAddPayment(
      _id: $_id
      cashAmount: $cashAmount
      cardAmount: $cardAmount
      cardInfo: $cardInfo
      receivableAmount: $receivableAmount
      mobileAmount: $mobileAmount
    ) {
      _id
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

const orderChangeStatus = `
  mutation orderChangeStatus($_id: String!, $status: String) {
    orderChangeStatus(_id: $_id, status: $status) {
      _id
    }
  }
`;

const orderItemChangeStatus = `
  mutation orderItemChangeStatus($_id: String!, $status: String) {
    orderItemChangeStatus(_id: $_id, status: $status) {
      _id
      status
    }
  }
`;

const generateInvoiceUrl = `
  mutation GenerateInvoiceUrl(
    $amount: Float!
    $companyId: String
    $contentType: String
    $contentTypeId: String
    $customerId: String
    $description: String
    $email: String
    $paymentIds: [String]
    $phone: String
  ) {
    generateInvoiceUrl(
      amount: $amount
      companyId: $companyId
      contentType: $contentType
      contentTypeId: $contentTypeId
      customerId: $customerId
      description: $description
      email: $email
      paymentIds: $paymentIds
      phone: $phone
    )
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
  orderChangeStatus,
  orderItemChangeStatus,
  generateInvoiceUrl,
};

export default mutations;
