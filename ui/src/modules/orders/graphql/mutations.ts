const ordersAdd = `
  mutation ordersAdd($items: [OrderItemInput], $totalAmount: Float!, $type: String!, $customerId: String) {
    ordersAdd(items: $items, totalAmount: $totalAmount, type: $type, customerId: $customerId) {
      _id
    }
  }
`;

export default { ordersAdd };
