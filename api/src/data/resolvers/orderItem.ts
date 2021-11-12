import { IOrderItemDocument } from "../../db/models/definitions/orderItems";
import { Products } from "../../db/models/Products";

export default {
  async productName(orderItem: IOrderItemDocument) {
    const product = await Products.findOne({ _id: orderItem.productId });

    return product ? product.name : 'product not found';
  }
};
