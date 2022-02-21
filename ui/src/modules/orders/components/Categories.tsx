import React from 'react';

import { router } from 'modules/common/utils';
import { IProduct, IProductCategory } from '../types';
import CategoryItem from './CategoryItem';
// import { ProductCategories } from '../styles';
import { IConfig, IRouterProps } from 'types';

type Props = {
  productCategories: IProductCategory[];
  products: IProduct[];
  currentConfig: IConfig;
  qp: any;
  productsQuery: any;
  orientation: string;
} & IRouterProps;

type State = {
  categoriesHeight: number;
};

export default class Categories extends React.Component<Props, State> {
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

  render() {
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

    return <div>{categories}</div>;
  }
}
