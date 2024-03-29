const fullOrders = `
  query fullOrders($searchValue: String, $statuses: [String], $customerId: String, $customerType: String, $page: Int, $perPage: Int, $sortField: String, $sortDirection: Int) {
    fullOrders(searchValue: $searchValue, statuses: $statuses, customerId: $customerId, customerType: $customerType, page: $page, perPage: $perPage, sortField: $sortField, sortDirection: $sortDirection) {
      _id
      number
      status
      paidDate
      origin
      modifiedAt
      createdAt
    }
  }`;

const queries = { fullOrders };
export default queries;
