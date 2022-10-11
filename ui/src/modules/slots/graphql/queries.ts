const fullOrders = `
  query fullOrders($searchValue: String, $statuses: [String], $customerId: String, $page: Int, $perPage: Int, $sortField: String, $sortDirection: Int) {
    fullOrders(searchValue: $searchValue, statuses: $statuses, customerId: $customerId, page: $page, perPage: $perPage, sortField: $sortField, sortDirection: $sortDirection) {
      _id
      number
      status
      paidDate
      origin
    }
  }`;

const queries = { fullOrders };
export default queries;
