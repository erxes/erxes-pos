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
  cashAmount
  totalAmount
  mobileAmount
  slotCode
  registerNumber
  customerId
  customerType
  printedEbarimt
  billType
  billId
  origin
  type
  deliveryInfo
  paidAmounts {
    _id
    amount
    info
    type
  }
  dueDate
`;

export const orderItemFields = `
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
    manufacturedDate

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
  taxType
  stocks
  amount
`;

const orderDetail = `
  query orderDetail($_id: String) {
    orderDetail(_id: $_id) {
      ${orderFields}
      items {
        ${orderItemFields}
      }
      customer {
        firstName
        lastName
        primaryEmail
        primaryPhone
        code
      }
      customerType
      user {
        ${customerFields}
      }
      putResponses {
        ${putResponseFields}
      }
    }
  }
`;
export const ordersCheckCompany = `
  query ordersCheckCompany($registerNumber: String!) {
    ordersCheckCompany(registerNumber: $registerNumber)
  }
`;

export const queryParamsDefs = `
  $searchValue: String,
  $statuses: [String],
  $customerId: String,
  $customerType: String,
  $startDate: Date,
  $endDate: Date,
  $dateType: String,
  $isPaid: Boolean,
  $page: Int,
  $perPage: Int,
  $sortField: String,
  $sortDirection: Int
`;

export const queryParamsValues = `
  searchValue: $searchValue,
  statuses: $statuses,
  customerId: $customerId,
  customerType: $customerType,
  startDate: $startDate,
  endDate: $endDate,
  dateType: $dateType,
  isPaid: $isPaid,
  page: $page,
  perPage: $perPage,
  sortField: $sortField,
  sortDirection: $sortDirection,
`;

const fullOrders = `
  query fullOrders(${queryParamsDefs}) {
    fullOrders(${queryParamsValues}) {
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

const slots = `
  query poscSlots {
    poscSlots{
      _id
      code
      name
    }
  }
`;

const ordersTotalCount = `
  query OrdersTotalCount(
    ${queryParamsDefs}
  ) {
    ordersTotalCount(
      ${queryParamsValues}
    )
  }
`;

const invoices = `
  query invoices($contentType: String, $contentTypeId: String) {
    invoices(contentType: $contentType, contentTypeId: $contentTypeId) {
      _id
      amount
      status
      apiResponse
      pluginData
    }
  }
`;

const queries = {
  commonFields,
  orderFields,
  orderItemFields,
  orderDetail,
  ordersCheckCompany,
  fullOrders,
  slots,
  ordersTotalCount,
  invoices,
};

export default queries;
