const commonFields = `
  _id
  name
  code
  attachment
`;

export const orderFields = `
  _id
  createdAt
  number
  status
  paidDate
  cardAmount
  mobileAmount
  cashAmount
  totalAmount
  finalAmount
  registerNumber
  customerId
  printedEbarimt
  billType
  billId
  registerNumber
  oldBillId
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
  }
`;

const customerFields = `
  _id
  primaryPhone
  firstName
  primaryEmail
  lastName
`;

const productCategories = `
  query productCategories {
    productCategories {
      ${commonFields}
    }
  }
`;

const products = `
  query products($searchValue: String, $type: String, $categoryId: String, $page: Int, $perPage: Int) {
    products(searchValue: $searchValue, categoryId: $categoryId, type: $type, page: $page, perPage: $perPage) {
      ${commonFields}
      categoryId
      unitPrice
      type
      description
      attachment
    }
  }
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
`;

const orderDetail = `
  query orderDetail($_id: String) {
    orderDetail(_id: $_id) {
      ${orderFields}

      ${orderItemsFields}

      user {
        details {
          fullName
          shortName
        }
      }

      customer {
        ${customerFields}
      }

      putResponses {
        ${putResponseFields}
      }

      qpayInvoice {
        qrText
        senderInvoiceNo
        amount
        qpayInvoiceId
        qpayPaymentId
        status
        paymentDate
        createdAt
      }

      cardPaymentInfo
    }
  }
`;

const orders = `
  query orders($searchValue: String, $page: Int, $perPage: Int) {
    orders(searchValue: $searchValue, page: $page, perPage: $perPage) {
      ${orderFields}
    }
  }
`;

const fullOrders = `
  query fullOrders($searchValue: String, $statuses: [String], $page: Int, $perPage: Int, $sortField: String, $sortDirection: Int) {
    fullOrders(searchValue: $searchValue, statuses: $statuses, page: $page, perPage: $perPage, sortField: $sortField, sortDirection: $sortDirection) {
      ${orderFields}

      items {
        _id
        unitPrice
        orderId
        productName
        count
        productId
      }
    }
  }
`;

const customers = `
  query customers($searchValue: String) {
    customers(searchValue: $searchValue) {
      ${customerFields}
    }
  }
`;

const ordersCheckCompany = `
  query ordersCheckCompany($registerNumber: String!) {
    ordersCheckCompany(registerNumber: $registerNumber)
  }
`;

const fetchRemoteInvoice = `
  query fetchRemoteInvoice($orderId: String!) {
    fetchRemoteInvoice(orderId: $orderId)
  }
`;

export default {
  productCategories,
  products,
  orderDetail,
  orders,
  fullOrders,
  customers,
  ordersCheckCompany,
  fetchRemoteInvoice
};
