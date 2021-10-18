const commonFields = `
  _id: String!
  createdAt: Date
`;

const orderFields = `
  status: String
  customerId: String
  number: String
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
  }

  type Order {
    ${commonFields}
    ${orderFields}
    paidDate: Date
    cardAmount: Float
    cashAmount: Float
    mobileAmount: Float
    totalAmount: Float
    finalAmount: Float
    shouldPrintEbarimt: Boolean
    printedEbarimt: Boolean
    billType: String
    billId: String
    registerNumber: String
    oldBillId: String
  }

  input OrderItemInput {
    productId: String!
    count: Int!
  }
`;

export const mutations = `
  ordersAdd(items: [OrderItemInput]): Order
`;

export const queries = `
  orders: [Order]
`;
