const posCurrentUser = `
  query posCurrentUser {
    posCurrentUser {
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
    }
  }
`;

const userChanged = `
	subscription posUserChanged($userId: String) {
		posUserChanged(userId: $userId)
  }
`;

const configFields = `
  _id
  name
  description
  userId
  createdAt
  productDetails
  adminIds
  cashierIds
  paymentIds
  beginNumber
  maxSkipNumber
  waitingScreen
  kioskMachine
  kitchenScreen
  token
  erxesAppToken
  paymentTypes

  uiOptions {
    colors
    bgImage
    logo
    favIcon
    receiptIcon
    texts
    kioskHeaderImage
    mobileAppImage
    qrCodeImage
  }

  ebarimtConfig {
    companyRD
    hasVat
    hasCitytax
    vatPercent
    cityTaxPercent
    companyName
    ebarimtUrl
    footerText
  }
  catProdMappings {
    _id
    categoryId
    productId
  }
  permissionConfig
  initialCategoryIds
  kioskExcludeProductIds
`;

const currentConfig = `
  query currentConfig {
    currentConfig {
      ${configFields}
    }
  }
`;

const configs = `
  query posclientConfigs {
    posclientConfigs {
      ${configFields}
    }
  }
`;

const queries = { posCurrentUser, userChanged, currentConfig, configs };

export default queries;
