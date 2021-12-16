import { ProductCategories, Products } from '../../../db/models/Products';
import { PRODUCT_STATUSES } from '../../../db/models/definitions/constants';
import { escapeRegExp, paginate } from '../../utils/commonUtils';

interface IProductParams {
  type: string;
  categoryId: string;
  searchValue: string;
  page: number;
  perPage: number;
}

const productQueries = {
  async products(
    _root,
    {
      type,
      categoryId,
      searchValue,
      ...paginationArgs
    }: IProductParams
  ) {
    const filter: any = { status: { $ne: PRODUCT_STATUSES.DELETED } };

    if (type) {
      filter.type = type;
    }

    if (categoryId) {
      const category = await ProductCategories.getProductCategory({
        _id: categoryId,
      });

      const relatedCategoryIds = await ProductCategories.find(
        { order: { $regex: new RegExp(category.order) } },
        { _id: 1 }
      );

      filter.categoryId = { $in: relatedCategoryIds };
    }

    // search =========
    if (searchValue) {
      const regex = new RegExp(`.*${escapeRegExp(searchValue)}.*`, 'i');

      filter.$or = [{ name: { $in: [regex] } }, { code: { $in: [regex] } } ];
    }

    return paginate(Products.find(filter).sort('code').lean(), paginationArgs);
  },

  /**
   * Get all products count. We will use it in pager
   */
  productsTotalCount(_root, { type }: { type: string }) {
    const filter: any = {
      status: { $ne: PRODUCT_STATUSES.DELETED },
    };

    if (type) {
      filter.type = type;
    }

    return Products.find(filter).countDocuments();
  },

  productCategories(
    _root,
    { parentId, searchValue }: { parentId: string; searchValue: string }
  ) {
    const filter: any = {};

    if (parentId) {
      filter.parentId = parentId;
    }

    if (searchValue) {
      filter.name = new RegExp(`.*${searchValue}.*`, 'i');
    }

    return ProductCategories.find(filter).sort({ order: 1 }).lean();
  },

  productCategoriesTotalCount(_root) {
    return ProductCategories.find().countDocuments();
  },

  productDetail(_root, { _id }: { _id: string }) {
    return Products.findOne({ _id }).lean();
  },

  productCategoryDetail(_root, { _id }: { _id: string }) {
    return ProductCategories.findOne({ _id }).lean();
  },
};

export default productQueries;
