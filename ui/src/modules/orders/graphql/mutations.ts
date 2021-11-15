const ordersAdd = `
  mutation ordersAdd($items: [OrderItemInput], $totalAmount: Float!, $type: String!, $customerId: String) {
    ordersAdd(items: $items, totalAmount: $totalAmount, type: $type, customerId: $customerId) {
      number
    }
  }
`;

const ordersMakePayment = `
  mutation ordersMakePayment($_id: String!, $doc: OrderPaymentInput) {
    ordersMakePayment(_id: $_id, doc: $doc) {
      _id
    }
  }
`;

export default { ordersAdd, ordersMakePayment };
