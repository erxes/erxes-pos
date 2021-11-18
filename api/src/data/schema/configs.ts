export const types = `
  type EbarimtConfig {
    companyName: String
    ebarimtUrl: String
    checkCompanyUrl: String
    hasVat: Boolean
    hasCitytax: Boolean
    districtCode: String
    companyRD: String
    defaultGSCode: String
    vatPercent: Int
    cityTaxPercent: Int
  }

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
    uiOptions: JSON
    ebarimtConfig: EbarimtConfig
  }
`;

export const mutations = `
  configsFetch(token: String!): Config
`;

export const queries = `
  currentConfig: Config
`;
