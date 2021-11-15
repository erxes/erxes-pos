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
  }

  input OrderItemInput {
    productId: String!
    count: Int!
    unitPrice: Float!
  }

  input OrderPaymentInput {
    ${paymentInputDefs}
  }
`;

export const mutations = `
  ordersAdd(items: [OrderItemInput], totalAmount: Float!, type: String!, customerId: String): Order
  ordersMakePayment(_id: String!, doc: OrderPaymentInput): Order
`;

export const queries = `
  orders(searchValue: String, page: Int, perPage: Int): [Order]
  orderDetail(_id: String): Order
`;
