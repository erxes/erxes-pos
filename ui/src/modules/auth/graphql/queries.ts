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
	subscription userChanged($userId: String) {
		userChanged(userId: $userId)
  }
`;

const currentConfig = `
  query currentConfig {
    currentConfig {
      _id
      name
      description
      userId
      createdAt
      integrationId
      productDetails
      adminIds
      cashierIds
      waitingScreen
      kioskMachine
      kitchenScreen
      formSectionTitle
      formIntegrationIds
      brandId
      token
      uiOptions {
        colors
        bgImage
        logo
        favIcon
        receiptIcon
      }

      ebarimtConfig {
        companyRD
        hasVat
        hasCitytax
        vatPercent
        cityTaxPercent
        companyName
        ebarimtUrl
      }

      qpayConfig {
        url
        callbackUrl
        username
        password
        invoiceCode
      }
      syncInfo
      catProdMappings {
        _id
        categoryId
        productId
      }
    }
  }
`;

export default { posCurrentUser, userChanged, currentConfig };
