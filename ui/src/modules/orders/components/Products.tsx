import React from "react";
import styled from "styled-components";
import { IOrderItemInput, IProduct } from "../types";
import CategoryItem from "./CategoryItem";
import ProductItem from "./ProductItem";

const ProductsWrapper = styled.div`
  overflow: scroll;
`;

type Props = {
  productCategories: any;
  products: any;
  setItems: (items: IOrderItemInput[]) => void;
  items: IOrderItemInput[];
};

export default class Products extends React.Component<Props> {
  renderCategories() {
    const { productCategories } = this.props;

    return productCategories.map((cat) => (
      <CategoryItem name={cat.name} key={cat._id} />
    ));
  }

  addItem(item: IProduct, count: number) {
    const { items, setItems } = this.props;
    let currentItems = items.slice();
    const exists = items.find((i) => i.productId === item._id);

    const doc = {
      productId: item._id,
      productName: item.name,
      unitPrice: item.unitPrice || 0,
    };

    if (!exists) {
      currentItems.push({ count: 1, ...doc });
    } else {
      currentItems = items.filter((i) => i.productId !== item._id);

      currentItems.push({ count: exists.count + count, ...doc });
    }

    setItems(currentItems);
  }

  renderProducts() {
    const { products } = this.props;

    return products.map((product) => (
      <ProductItem
        product={product}
        key={product._id}
        addItem={this.addItem.bind(this, product, 1)}
      />
    ));
  }

  render() {
    console.log(this.props);
    return (
      <>
        {this.renderCategories()}
        <ProductsWrapper>{this.renderProducts()}</ProductsWrapper>
      </>
    );
  }
}
