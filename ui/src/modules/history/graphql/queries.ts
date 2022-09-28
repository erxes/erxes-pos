export const fullOrders = `
query FullOrders($statuses: [String], $customerId: String, $page: Int, $perPage: Int, $searchValue: String, $sortDirection: Int, $sortField: String) {
  fullOrders(statuses: $statuses, customerId: $customerId, page: $page, perPage: $perPage, searchValue: $searchValue, sortDirection: $sortDirection, sortField: $sortField) {
    _id
    number
    totalAmount
    paidDate
    type
    items {
      _id
      count
      unitPrice
      productName
    }
  }
}
`;

const queries = { fullOrders };

export default queries;
