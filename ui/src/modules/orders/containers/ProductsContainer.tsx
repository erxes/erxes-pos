import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import * as compose from "lodash.flowright";
import React from "react";
import queryString from "query-string";
import { withProps } from "../../utils";
import {
  IRouterProps,
  IConfig,
  ProductCategoriesQueryResponse,
  ProductsQueryResponse,
} from "../../../types";
import { IOrderItemInput } from "../types";
import { queries } from "../graphql/index";
import Products from "../components/Products";
import Spinner from "modules/common/components/Spinner";
import withCurrentUser from "modules/auth/containers/withCurrentUser";

type WithProps = {
  history: any;
  queryParams: any;
};

type Props = {
  productCategoriesQuery: ProductCategoriesQueryResponse;
  productsQuery: ProductsQueryResponse;
  setItems: (items: IOrderItemInput[]) => void;
  items: IOrderItemInput[];
  currentConfig: IConfig;
} & IRouterProps &
  WithProps;

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

const WithSearchContainer = withProps<WithProps>(
  compose(
    graphql<WithProps>(gql(queries.productCategories), {
      name: "productCategoriesQuery",
    }),
    graphql<WithProps, {}>(gql(queries.products), {
      name: "productsQuery",
      options: ({ queryParams }: { queryParams: any }) => ({
        variables: { searchValue: queryParams.productSearch },
      }),
    })
  )(withCurrentUser(withRouter<Props>(ProductsContainer)))
);

const WithQueryParams = (props: IRouterProps & Props) => {
  const { location } = props;
  const queryParams = queryString.parse(location.search);

  const extendedProps = { ...props, queryParams };

  return <WithSearchContainer {...extendedProps} />;
};

export default withRouter<IRouterProps & Props>(WithQueryParams);
