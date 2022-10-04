const poscCustomerDetail = `
query poscCustomerDetail($_id: String!) {
  poscCustomerDetail(_id: $_id) {
    _id
    primaryPhone
    firstName
    primaryEmail
    lastName
    __typename
  }
}`;

const queries = { poscCustomerDetail };
export default queries;
