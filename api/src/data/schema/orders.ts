const commonFields = `
  _id: String!
  createdAt: Date
`;

const orderFields = `
  status: String
  customerId: String
  number: String
`;

const paymentInputDefs = `
  cardAmount: Float
  cashAmount: Float
  mobileAmount: Float
  billType: String
  registerNumber: String
`;

const addEditParams = `
  items: [OrderItemInput],
  totalAmount: Float!,
  type: String!,
  customerId: String
`;

export const types = `
  type OrderItem {
    ${commonFields}
    productId: String!
    count: Int!
    orderId: String!
    unitPrice: Float
    discountAmount: Float
    discountPercent: Float

    productName: String
  }

  type PutResponse {
    createdAt: Date
    date: String
    contentType: String
    contentId: String
    amount: String
    billType: String
    cashAmount: String
    nonCashAmount: String
    customerNo: String
    cityTax: String
    vat: String
    taxType: String
    registerNo: String
    billId: String
    macAddress: String
    lottery: String
    qrData: String
    success: String
    customerName: String
    modifiedAt: Date
    sendInfo: JSON
    internalCode: String
    lotteryWarningMsg: String
    errorCode: String
    message: String
    getInformation: String
    returnBillId: String
  }

  type Order {
    ${commonFields}
    ${orderFields}
    ${paymentInputDefs}

    paidDate: Date
    totalAmount: Float
    finalAmount: Float
    shouldPrintEbarimt: Boolean
    printedEbarimt: Boolean
    billId: String
    oldBillId: String
    type: String

    items: [OrderItem]
    customer: Customer
    user: User
    putResponses: [PutResponse]
    qpayInvoice: QPayInvoice
  }

  input OrderItemInput {
    _id: String
    productId: String!
    count: Int!
    unitPrice: Float!
  }

  input OrderPaymentInput {
    ${paymentInputDefs}
  }
`;

export const mutations = `
  ordersAdd(${addEditParams}): Order
  ordersEdit(_id: String!, ${addEditParams}): Order
  ordersMakePayment(_id: String!, doc: OrderPaymentInput): PutResponse
`;

export const queries = `
  orders(searchValue: String, page: Int, perPage: Int): [Order]
  fullOrders(searchValue: String, statuses: [String], page: Int, perPage: Int): [Order]
  orderDetail(_id: String): Order
  ordersCheckCompany(registerNumber: String!): JSON
`;
