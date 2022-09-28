const ordersOrdered = `
  subscription ordersOrdered($statuses: [String], $customerId: String) {
    ordersOrdered(statuses: $statuses, customerId: $customerId) {
      _id
    }
  }
`;
const orderItemsOrdered = `
  subscription orderItemsOrdered($statuses: [String]) {
    orderItemsOrdered(statuses: $statuses) {
      _id
    }
  }
`;

const subscriptions = {
  ordersOrdered,
  orderItemsOrdered,
};

export default subscriptions;
