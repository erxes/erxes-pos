const commonUser = `
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
  }
`

const posUsers = `
  query posUsers($searchValue: String) {
    posUsers(searchValue: $searchValue) {
      ${commonUser}
    }
  }
`;

const dailyReport = `
  query dailyReport($posUserIds: [String]) {
    dailyReport(posUserIds: $posUserIds) {
      report
    }
  }
`;

export default {
  posUsers,
  dailyReport,
};
