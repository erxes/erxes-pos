const commonFields = `
  _id
  name
  code
`;

const orderFields = `
  number
  status
  cardAmount
  cashAmount
  finalAmount
  registerNumber
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
    }
  }
`;

const orderDetail = `
  query orderDetail($_id: String) {
    orderDetail(_id: $_id) {
      _id
      ${orderFields}
    }
  }
`;

const orders = `
  query orders {
    orders {
      _id
      ${orderFields}
    }
  }
`;

const customers = `
  query customers($searchValue: String) {
    customers(searchValue: $searchValue) {
      _id
      primaryPhone
      firstName
      primaryEmail
      code
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
