import React from "react";
import { IOrderItemInput, IProduct, IProductCategory } from "../types";
import CategoryItem from "./CategoryItem";
import ProductItem from "./ProductItem";
import { ProductCategories, ProductsWrapper } from "../styles";
import { IConfig } from "types";

type Props = {
  productCategories: IProductCategory[];
  products: IProduct[];
  setItems: (items: IOrderItemInput[]) => void;
  items: IOrderItemInput[];
  currentConfig: IConfig;
};

export default class Products extends React.Component<
  Props,
  { activeCategoryId: string }
> {
  constructor(props) {
    super(props);

    this.state = {
      activeCategoryId: ((props.productCategories || [])[0] || {})._id,
    };
  }

  onClickCategory = (activeCategoryId: string) => {
    this.setState({ activeCategoryId });
  };

  renderCategories() {
    const { productCategories, currentConfig } = this.props;

    return (
      <ProductCategories>
        {productCategories.map((cat) => (
          <CategoryItem
            category={cat}
            key={cat._id}
            activeCategoryId={this.state.activeCategoryId}
            onClickCategory={this.onClickCategory}
            options={currentConfig ? currentConfig.uiOptions : {}}
          />
        ))}
      </ProductCategories>
    );
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

      currentItems.push({ ...doc, count: exists.count + count, _id: exists._id });
    }

    setItems(currentItems);
  }

  renderProducts() {
    const { products } = this.props;

    return products.map((product) => {
      if (product.categoryId !== this.state.activeCategoryId) {
        return null;
      }

      return (
        <ProductItem
          product={product}
          key={product._id}
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
