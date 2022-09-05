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

const customerFields = `
  _id
  primaryPhone
  firstName
  primaryEmail
  lastName
`;

const productCategories = `
  query poscProductCategories($excludeEmpty: Boolean) {
    poscProductCategories(excludeEmpty: $excludeEmpty) {
      ${commonFields}
      attachment {
        duration
        name
        size
        type
        url
      }
      description
      parentId
      order

    }
  }
`;

const products = `
  query poscProducts($searchValue: String, $type: String, $categoryId: String, $page: Int, $perPage: Int) {
    poscProducts(searchValue: $searchValue, categoryId: $categoryId, type: $type, page: $page, perPage: $perPage) {
      ${commonFields}
      categoryId
      unitPrice
      type
      description
      attachment {
        duration
        name
        size
        type
        url
      }
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

const orders = `
  query orders($searchValue: String, $page: Int, $perPage: Int) {
    orders(searchValue: $searchValue, page: $page, perPage: $perPage) {
      ${orderFields}
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
      }
    }
  }
`;

const customers = `
  query poscCustomers($searchValue: String) {
    poscCustomers(searchValue: $searchValue) {
      ${customerFields}
    }
  }
`;

const customerDetail = `
  query poscCustomerDetail($_id: String!) {
    poscCustomerDetail(_id: $_id) {
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
  query poscFetchRemoteInvoice($orderId: String!) {
    poscFetchRemoteInvoice(orderId: $orderId)
  }
`;
const slots = `
  query poscSlots {
    poscSlots{
      _id
      code
      name
    }
  }
`;

export default {
  productCategories,
  products,
  orderDetail,
  orders,
  fullOrders,
  customers,
  customerDetail,
  ordersCheckCompany,
  fetchRemoteInvoice,
  slots
};
