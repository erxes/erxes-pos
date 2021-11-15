const commonFields = `
  _id
  name
  code
  attachment
`;

const orderFields = `
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

const customerFields = `
  _id
  primaryPhone
  firstName
  primaryEmail
  code
`;

const productCategories = `
  query productCategories {
    productCategories {
      ${commonFields}
    }
  }
`;

const products = `
  query products {
    products {
      ${commonFields}
      categoryId
      unitPrice
      type
      description
      attachment
    }
  }
`;

const orderDetail = `
  query orderDetail($_id: String) {
    orderDetail(_id: $_id) {
      ${orderFields}

      items {
        _id
        unitPrice
        orderId
        productName
        count
      }

      user {
        details {
          fullName
          shortName
        }
      }

      customer {
        ${customerFields}
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

const customers = `
  query customers($searchValue: String) {
    customers(searchValue: $searchValue) {
      ${customerFields}
    }
  }
`;

export default {
  productCategories,
  products,
  orderDetail,
  orders,
  customers
};
