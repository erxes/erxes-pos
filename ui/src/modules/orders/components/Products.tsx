import React from "react";

import { router } from "modules/common/utils";
import { IOrderItemInput, IProduct, IProductCategory } from "../types";
import CategoryItem from "./CategoryItem";
import ProductItem from "./ProductItem";
import { ProductCategories, ProductsWrapper } from "../styles";
import { IConfig, IRouterProps } from "types";

type Props = {
  productCategories: IProductCategory[];
  products: IProduct[];
  setItems: (items: IOrderItemInput[]) => void;
  items: IOrderItemInput[];
  currentConfig: IConfig;
  qp: any;
  productsQuery: any;
  orientation: string;
} & IRouterProps;

export default class Products extends React.Component<Props> {
  onClickCategory = (activeCategoryId: string) => {
    const { qp, history, productsQuery } = this.props;
    const variables = { ...qp, categoryId: activeCategoryId };

    router.setParams(history, variables);
    productsQuery.refetch({ variables });
  };

  renderCategories() {
    const { productCategories, qp, orientation } = this.props;
    const catId = qp && qp.categoryId ? qp.categoryId : "";

    const categories = productCategories.map((cat) => (
      <CategoryItem
        category={cat}
        key={cat._id}
        activeCategoryId={catId}
        orientation={orientation}
        onClickCategory={this.onClickCategory}
      />
    ));

    return <ProductCategories>{categories}</ProductCategories>;
  }

  addItem(item: IProduct, count: number) {
    const { items, setItems } = this.props;
    let currentItems = items.slice();
    const exists = items.find((i) => i.productId === item._id);

    const doc = {
      _id: Math.random().toString(),
      productId: item._id,
      productName: item.name,
      unitPrice: item.unitPrice || 0,
    };

    if (!exists) {
      currentItems.push({ count: 1, ...doc });
    } else {
      currentItems = items.filter((i) => i.productId !== item._id);

      currentItems.push({
        ...doc,
        count: exists.count + count,
        _id: exists._id,
      });
    }

    setItems(currentItems);
  }

  renderProducts() {
    const { products = [], orientation } = this.props;

    return products.map((product) => {
      return (
        <ProductItem
          product={product}
          key={product._id}
          orientation={orientation}
          addItem={this.addItem.bind(this, product, 1)}
        />
      );
    });
  }

  render() {
    return (
      <>
        {this.renderCategories()}
        <ProductsWrapper>{this.renderProducts()}</ProductsWrapper>
      </>
    );
  }
}
