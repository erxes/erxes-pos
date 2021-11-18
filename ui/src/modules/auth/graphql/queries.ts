const currentUser = `
  query currentUser {
    currentUser {
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
      uiOptions

      ebarimtConfig {
        companyRD
        hasVat
        hasCitytax
        vatPercent
        cityTaxPercent
        companyName
      }
    }
  }
`;

export default { currentUser, userChanged, currentConfig };
