export const types = `
  type ProductCategory {
    _id: String!
    name: String
    description: String
    parentId: String
    code: String!
    order: String!

    isRoot: Boolean
    productCount: Int
  }

  type Product {
    _id: String!
    name: String
    code: String
    type: String
    description: String
    sku: String
    unitPrice: Float
    categoryId: String
    customFieldsData: JSON
    createdAt: Date
    tagIds: [String]
    vendorId: String
    attachment: JSON

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
    tag: String,
    page: Int,
    perPage: Int ids: [String],
    excludeIds: Boolean,
    pipelineId: String,
    boardId: String
  ): [Product]
  productsTotalCount(type: String): Int
  productDetail(_id: String): Product
`;
