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
  beginNumber
  maxSkipNumber
  waitingScreen
  kioskMachine
  kitchenScreen
  token

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

  qpayConfig {
    url
    callbackUrl
    username
    password
    invoiceCode
  }
  catProdMappings {
    _id
    categoryId
    productId
  }
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
