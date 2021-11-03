import { Products, ProductCategories } from '../db/models/Products';
import Users from '../db/models/Users';
import { IUserDocument } from '../db/models/definitions/users';

export const importUsers = async (users: IUserDocument[], isAdmin: boolean = false) => {
  for (const user of users) {
    await Users.createOrUpdateUser({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      isOwner: user.isOwner || isAdmin,
      isActive: user.isActive,
      details: user.details
    });
  }
};

export const importProducts = async (groups: any = []) => {
  for (const group of groups) {
    const categories = group.categories || [];

    for (const category of categories) {
      const products = category.products || [];

      await ProductCategories.createProductCategory({
        _id: category._id,
        name: category.name,
        code: category.code,
        order: category.order,
        description: category.description,
        parentId: category.parentId,
      });

      for (const product of products) {
        await Products.createProduct({
          _id: product._id,
          name: product.name,
          categoryId: product.categoryId,
          type: product.type,
          description: product.description,
          unitPrice: product.unitPrice,
          code: product.code,
        });
      }
    }
  } // end group loop
};
