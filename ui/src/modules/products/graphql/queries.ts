const commonFields = `
  _id
  name
  code

`;

const productCategories = `
  query poscProductCategories($excludeEmpty: Boolean) {
    poscProductCategories(excludeEmpty: $excludeEmpty) {
      ${commonFields}
      order
      parentId
      isRoot
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
      isCheckRem
      description
      remainder
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
  query productsCount($categoryId: String, $type: String, $searchValue: String) {
    poscProductsTotalCount(categoryId: $categoryId, type: $type, searchValue: $searchValue)
  }
`;


const getPriceInfo = `
  query getPriceInfo($productId: String!) {
    getPriceInfo(productId: $productId)
  }
`;

const queries = { productCategories, products, productsCount, getPriceInfo };
export default queries;
