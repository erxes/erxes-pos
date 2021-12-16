const commonFieldDefs = `
  _id: String!
  name: String
  description: String
  attachment: JSON
  code: String
`;

export const types = `
  type ProductCategory {
    ${commonFieldDefs}
    parentId: String
    order: String!

    isRoot: Boolean
    productCount: Int
  }

  type Product {
    ${commonFieldDefs}
    type: String
    sku: String
    unitPrice: Float
    categoryId: String
    customFieldsData: JSON
    createdAt: Date
    tagIds: [String]
    vendorId: String

    category: ProductCategory
    vendor: Company
  }
`;

export const queries = `
  productCategories(parentId: String, searchValue: String): [ProductCategory]
  productCategoriesTotalCount: Int
  productCategoryDetail(_id: String): ProductCategory

  products(
    type: String,
    categoryId: String,
    searchValue: String,
    page: Int,
    perPage: Int,
  ): [Product]
  productsTotalCount(type: String): Int
  productDetail(_id: String): Product
`;
