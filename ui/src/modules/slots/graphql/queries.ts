export const fullOrders = `
query FullOrders($statuses: [String], $customerId: String, $page: Int, $perPage: Int, $searchValue: String, $sortDirection: Int, $sortField: String) {
  fullOrders(statuses: $statuses, customerId: $customerId, page: $page, perPage: $perPage, searchValue: $searchValue, sortDirection: $sortDirection, sortField: $sortField) {
    _id
    slotCode
    customerId
    billId
    status
    number
  }
}
`;

const queries = {
  fullOrders,
};

export default queries;
