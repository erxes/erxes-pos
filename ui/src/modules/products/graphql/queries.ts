const commonFields = `
  _id
  name
  code

`;

const productCategories = `
  query poscProductCategories($excludeEmpty: Boolean) {
    poscProductCategories(excludeEmpty: $excludeEmpty) {
      ${commonFields}
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

const productsCount = `
  query productsCount($categoryId: String, $type: String, $searchValue:   String) {
    poscProductsTotalCount(categoryId: $categoryId, type: $type, searchValue: $searchValue)
  }
`;

const queries = { productCategories, products, productsCount };
export default queries;
