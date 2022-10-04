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
  receivableAmount
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
export const ordersCheckCompany = `
  query ordersCheckCompany($registerNumber: String!) {
    ordersCheckCompany(registerNumber: $registerNumber)
  }
`;

const fullOrderItems = `
  query fullOrderItems($searchValue: String, $statuses: [String], $page: Int, $perPage: Int, $sortField: String, $sortDirection: Int) {
    fullOrderItems(searchValue: $searchValue, statuses: $statuses, page: $page, perPage: $perPage, sortField: $sortField, sortDirection: $sortDirection) {
      _id
      unitPrice
      orderId
      productName
      count
      productId
      isPackage
      isTake
      productImgUrl
      status
    }
  }
`;

const fullOrders = `
  query fullOrders($searchValue: String, $statuses: [String], $customerId: String, $page: Int, $perPage: Int, $sortField: String, $sortDirection: Int) {
    fullOrders(searchValue: $searchValue, statuses: $statuses, customerId: $customerId, page: $page, perPage: $perPage, sortField: $sortField, sortDirection: $sortDirection) {
      ${orderFields}

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
      }
    }
  }
`;

const queries = {
  commonFields,
  orderFields,
  orderItemsFields,
  orderDetail,
  ordersCheckCompany,
  fullOrderItems,
  fullOrders,
};

export default queries;
