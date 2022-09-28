export const posUsers = `
query posUsers($searchValue: String) {
  posUsers(searchValue: $searchValue) {
    _id
    createdAt
    username
    email
    isOwner
    details {
      avatar
      fullName
      shortName
      position
      description
      operatorPhone
      __typename
    }
    __typename
  }
}
`;

const dailyReport = `
  query dailyReport($posUserIds: [String], $posNumber: String) {
    dailyReport(posUserIds: $posUserIds, posNumber: $posNumber) {
      report
    }
  }
`;
const queries = { posUsers, dailyReport };

export default queries;
