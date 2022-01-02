const login = `
  mutation posLogin($email: String!, $password: String!) {
    posLogin(email: $email, password: $password)
  }
`;

const forgotPassword = `
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

const resetPassword = `
  mutation resetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

const configsFetch = `
  mutation configsFetch($token: String!) {
    configsFetch(token: $token) {
      _id
    }
  }
`;

export default {
  login,
  forgotPassword,
  resetPassword,
  configsFetch
};
