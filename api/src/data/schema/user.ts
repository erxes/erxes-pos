export const types = `
  type User {
    _id: String!
    createdAt: Date
    username: String
    email: String
    isActive: Boolean
    isOwner: Boolean
  }
`;

const commonSelector = `
  searchValue: String,
  isActive: Boolean,
`;

export const queries = `
  users(page: Int, perPage: Int, status: String, ${commonSelector}): [User]
  allUsers(isActive: Boolean): [User]
  userDetail(_id: String): User
  usersTotalCount(${commonSelector}): Int
  currentUser: User
`;

export const mutations = `
  usersCreateOwner(email: String!, password: String!, firstName: String!, lastName: String): String 
  login(email: String!, password: String! deviceToken: String): String 
  logout: String
 `;
