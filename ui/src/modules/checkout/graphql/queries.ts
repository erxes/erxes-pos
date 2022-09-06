const commonFields = `
  _id
  name
  code

`;

export const orderFields = `
  _id
  createdAt
  modifiedAt
  number
  status
  paidDate
  cardAmount
  mobileAmount
  cashAmount
  totalAmount

  slotCode

  registerNumber
  customerId
  printedEbarimt
  billType
  billId
  origin

  type
`;

export const orderItemsFields = `
  items {
    _id
    unitPrice
    orderId
    productName
    count
    productId
    isPackage
    isTake
    productImgUrl
    discountAmount
    discountPercent
    bonusCount
  }
`;

const queries = {
  commonFields,
  orderFields,
  orderItemsFields,
};

export default queries;
