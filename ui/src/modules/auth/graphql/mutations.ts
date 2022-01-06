const login = `
  mutation posLogin($email: String!, $password: String!) {
    posLogin(email: $email, password: $password)
  }
`;

const forgotPassword = `
  mutation posForgotPassword($email: String!) {
    posForgotPassword(email: $email)
  }
`;

const resetPassword = `
  mutation posResetPassword($token: String!, $newPassword: String!) {
    posResetPassword(token: $token, newPassword: $newPassword)
  }
`;

const configsFetch = `
  mutation posConfigsFetch($token: String!) {
    posConfigsFetch(token: $token) {
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
