const ordersOrdered = `
  subscription ordersOrdered($statuses: [String], $customerId: String) {
    ordersOrdered(statuses: $statuses, customerId: $customerId) {
      _id
    }
  }
`;

export default {
  ordersOrdered
};
