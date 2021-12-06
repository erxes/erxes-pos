export const types = `
  type QPayInvoice {
    _id: String
    senderInvoiceNo: String
    amount: String
    qpayInvoiceId: String
    qrText: String
    qpayPaymentId: String
    paymentDate: Date
    status: String
    createdAt: Date
  }
`;

export const mutations = `
  createQpaySimpleInvoice(orderId: String!): JSON
`;

export const queries = `
  fetchRemoteInvoice(orderId: String!): JSON
`;
