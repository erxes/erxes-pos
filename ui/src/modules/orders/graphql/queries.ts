const commonFields = `
  _id
  name
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
    }
  }
`;

const orderDetail = `
  query orderDetail($_id: String) {
    orderDetail(_id: $_id) {
      _id
    }
  }
`;

export default {
  productCategories,
  products,
  orderDetail
};
