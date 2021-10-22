const ordersAdd = `
  mutation ordersAdd($items: [OrderItemInput], $totalAmount: Float!) {
    ordersAdd(items: $items, totalAmount: $totalAmount) {
      _id
    }
  }
`;

export default { ordersAdd };
