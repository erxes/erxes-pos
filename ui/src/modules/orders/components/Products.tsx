import React from 'react';

import { router } from 'modules/common/utils';
import { IOrderItemInput, IProduct, IProductCategory } from '../types';
import CategoryItem from './CategoryItem';
import ProductItem from './ProductItem';
import { ProductCategories, ProductsWrapper } from '../styles';
import { IConfig, IRouterProps } from 'types';

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

type State = {
  categoriesHeight: number;
};

export default class Products extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      categoriesHeight: 0
    };
  }

  componentDidMount() {
    const height = document.getElementById('product-categories');

    this.setState({ categoriesHeight: height ? height.clientHeight : 0 });
  }

  onClickCategory = (activeCategoryId: string) => {
    const { qp, history, productsQuery } = this.props;
    const variables = { ...qp, categoryId: activeCategoryId };

    router.setParams(history, variables);
    productsQuery.refetch({ variables });
  };

  renderCategories() {
    const { productCategories, qp, orientation } = this.props;
    const catId = qp && qp.categoryId ? qp.categoryId : '';

    const categories = productCategories.map(cat => (
      <CategoryItem
        category={cat}
        key={cat._id}
        activeCategoryId={catId}
        orientation={orientation}
        onClickCategory={this.onClickCategory}
      />
    ));

    return (
      <ProductCategories id='product-categories'>
        {categories}
      </ProductCategories>
    );
  }

  addItem(item: IProduct, count: number) {
    const { items, setItems } = this.props;

    const currentItems = items.slice();

    currentItems.push({
      _id: Math.random().toString(),
      productId: item._id,
      productName: item.name,
      unitPrice: item.unitPrice || 0,
      productImgUrl:
        item.attachment && item.attachment.url ? item.attachment.url : '',
      count
    });

    setItems(currentItems);
  }

  renderProducts() {
    const { products = [], orientation, currentConfig } = this.props;
    const mode = localStorage.getItem('erxesPosMode');
    let filteredProducts = products;

    if (mode === 'kiosk') {
      const excludeIds = currentConfig.kioskExcludeProductIds || [];
      filteredProducts = products.filter(p => !excludeIds.includes(p._id));
    }

    return filteredProducts.map(product => {
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
    const { uiOptions } = this.props.currentConfig;
    return (
      <>
        {this.renderCategories()}
        <ProductsWrapper
          height={this.state.categoriesHeight}
          color={uiOptions.colors.secondary}
          innerWidth={window.innerWidth}
        >
          {this.renderProducts()}
        </ProductsWrapper>
      </>
    );
  }
}
