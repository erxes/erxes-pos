const login = `
  mutation posLogin($email: String!, $password: String!) {
    posLogin(email: $email, password: $password)
  }
`;

const configsFetch = `
  mutation posConfigsFetch($token: String!) {
    posConfigsFetch(token: $token) {
      _id
    }
  }
`;

const chooseConfig = `
  mutation posChooseConfig($token: String!) {
    posChooseConfig(token: $token)
  }
`;

const mutations = {
  login,
  configsFetch,
  chooseConfig,
};

export default mutations;
