import { ProductCategories, Products } from '../../../db/models/Products';
import { PRODUCT_STATUSES } from '../../../db/models/definitions/constants';
import { escapeRegExp, paginate } from '../../utils';

const productQueries = {
  async products(
    _root,
    {
      type,
      categoryId,
      searchValue,
      tag,
      ids,
      excludeIds,
      ...paginationArgs
    }: {
      ids: string[];
      excludeIds: boolean;
      type: string;
      categoryId: string;
      searchValue: string;
      tag: string;
      page: number;
      perPage: number;
    }
  ) {
    const filter: any = { status: { $ne: PRODUCT_STATUSES.DELETED } };

    if (type) {
      filter.type = type;
    }

    if (categoryId) {
      const category = await ProductCategories.getProductCatogery({
        _id: categoryId
      });
      const product_category_ids = await ProductCategories.find(
        { order: { $regex: new RegExp(category.order) } },
        { _id: 1 }
      );
      filter.categoryId = { $in: product_category_ids };
    }

    if (ids && ids.length > 0) {
      filter._id = { [excludeIds ? '$nin' : '$in']: ids };
    }

    if (tag) {
      filter.tagIds = { $in: [tag] };
    }

    // search =========
    if (searchValue) {
      const fields = [
        {
          name: { $in: [new RegExp(`.*${escapeRegExp(searchValue)}.*`, 'i')] }
        },
        { code: { $in: [new RegExp(`.*${escapeRegExp(searchValue)}.*`, 'i')] } }
      ];

      filter.$or = fields;
    }

    return paginate(
      Products.find(filter)
        .sort('code')
        .lean(),
      paginationArgs
    );
  },

  /**
   * Get all products count. We will use it in pager
   */
  productsTotalCount(_root, { type }: { type: string }) {
    const filter: any = {
      status: { $ne: PRODUCT_STATUSES.DELETED }
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

    return ProductCategories.find(filter)
      .sort({ order: 1 })
      .lean();
  },

  productCategoriesTotalCount(_root) {
    return ProductCategories.find().countDocuments();
  },

  productDetail(_root, { _id }: { _id: string }) {
    return Products.findOne({ _id }).lean();
  },

  productCategoryDetail(_root, { _id }: { _id: string }) {
    return ProductCategories.findOne({ _id }).lean();
  }
};

export default productQueries;
