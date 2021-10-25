const ordersAdd = `
  mutation ordersAdd($items: [OrderItemInput], $totalAmount: Float!, $type: String!) {
    ordersAdd(items: $items, totalAmount: $totalAmount, type: $type) {
      _id
    }
  }
`;

export default { ordersAdd };
