import { withRouter } from "react-router-dom";
import React from "react";
import {
  IRouterProps,
  IConfig,
  ProductCategoriesQueryResponse,
  ProductsQueryResponse,
} from "../../../types";
import { IOrderItemInput } from "../types";
import Products from "../components/Products";
import Spinner from "modules/common/components/Spinner";
import withCurrentUser from "modules/auth/containers/withCurrentUser";

type Props = {
  productCategoriesQuery: ProductCategoriesQueryResponse;
  productsQuery: ProductsQueryResponse;
  setItems: (items: IOrderItemInput[]) => void;
  items: IOrderItemInput[];
  currentConfig: IConfig;
} & IRouterProps;

class ProductsContainer extends React.Component<Props> {
  render() {
    const { productCategoriesQuery, productsQuery } = this.props;

    if (productCategoriesQuery.loading || productsQuery.loading) {
      return <Spinner />;
    }

    const updatedProps = {
      ...this.props,
      productCategories: productCategoriesQuery.productCategories || [],
      products: productsQuery.products || [],
    };

    return <Products {...updatedProps} />;
  }
}

export default withCurrentUser(withRouter<IRouterProps & Props>(ProductsContainer));
