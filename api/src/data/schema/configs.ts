export const types = `
  type UIOptions {
    colors: JSON
    logo: String
    bgImage: String
    favIcon: String
  }

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

  type QPayConfig {
    url: String
    callbackUrl: String
    username: String
    password: String
    invoiceCode: String
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
    uiOptions: UIOptions
    ebarimtConfig: EbarimtConfig
    qpayConfig: QPayConfig
  }
`;

export const mutations = `
  configsFetch(token: String!): Config
`;

export const queries = `
  currentConfig: Config
`;
