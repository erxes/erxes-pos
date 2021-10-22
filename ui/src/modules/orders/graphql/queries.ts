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

export default {
  productCategories,
  products
};
