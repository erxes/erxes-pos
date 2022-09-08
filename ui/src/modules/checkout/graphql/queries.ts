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
    status
    productImgUrl
    discountAmount
    discountPercent
    bonusCount
  }
`;

const customerFields = `
  _id
  primaryPhone
  firstName
  primaryEmail
  lastName
`;

const putResponseFields = `
  date
  vat
  cityTax
  registerNo
  billId
  lottery
  qrData
  success
  lotteryWarningMsg
  errorCode
  message
  getInformation
  returnBillId
  billType
`;

const qpayInvoiceFields = `
  _id
  qrText
  senderInvoiceNo
  amount
  qpayInvoiceId
  qpayPaymentId
  status
  paymentDate
  createdAt
`;

const orderDetail = `
  query orderDetail($_id: String) {
    orderDetail(_id: $_id) {
      ${orderFields}

      ${orderItemsFields}

      customer {
        firstName
        lastName
        middleName
        primaryEmail
        primaryPhone
        code
      }

      user {
        ${customerFields}
      }

      putResponses {
        ${putResponseFields}
      }

      qpayInvoices {
        ${qpayInvoiceFields}
      }

      cardPayments {
        _id
        amount
        cardInfo
      }
    }
  }
`;

const queries = {
  commonFields,
  orderFields,
  orderItemsFields,
  orderDetail,
};

export default queries;
