export const currentUser = `
  query currentUser {
    currentUser {
      _id
      createdAt
      username
      email
      isOwner
    }
  }
`;

export const userChanged = `
	subscription userChanged($userId: String) {
		userChanged(userId: $userId)
  }
`;

export default { currentUser, userChanged };
