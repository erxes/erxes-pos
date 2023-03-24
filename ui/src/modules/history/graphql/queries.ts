export const fullOrders = `
query FullOrders($statuses: [String], $customerId: String, customerType: String, $page: Int, $perPage: Int, $searchValue: String, $sortDirection: Int, $sortField: String, $startDate: Date, $endDate: Date) {
  fullOrders(statuses: $statuses, customerId: $customerId, customerType: $customerType, page: $page, perPage: $perPage, searchValue: $searchValue, sortDirection: $sortDirection, sortField: $sortField, startDate: $startDate, endDate: $endDate) {
    _id
    number
    totalAmount
    paidDate
    type
    status
    items {
      _id
      count
      unitPrice
      productName
      status
    }
  }
}
`;

const queries = { fullOrders };

export default queries;
