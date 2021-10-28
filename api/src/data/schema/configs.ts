export const types = `
  type Config {
    _id: String
    name: String
    description: String
    userId: String
    createdAt: Date
    integrationId: String
    productDetails: [String]
    adminIds: [String]
    cashierIds: [String]
    waitingScreen: JSON
    kioskMachine: JSON
    kitchenScreen: JSON
    formSectionTitle: String
    formIntegrationIds: [String]
    brandId: String
    token: String
  }
`;

export const mutations = `
  configsFetch(token: String!): Config
`;
