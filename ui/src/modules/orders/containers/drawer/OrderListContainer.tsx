import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import * as compose from "lodash.flowright";
import React from "react";

import Spinner from "modules/common/components/Spinner";
import { IRouterProps } from "../../../../types";
import { withProps } from "../../../utils";
import { queries } from "../../graphql/index";
import OrderList from "../../components/drawer/OrderList";

type Props = {
  options: any;
};

type FinalProps = {
  ordersQuery: any;
} & IRouterProps &
  Props;

class OrderListContainer extends React.Component<FinalProps> {
  render() {
    const { ordersQuery, options } = this.props;

    if (ordersQuery.loading) {
      return <Spinner />;
    }

    return <OrderList orders={ordersQuery.orders || []} options={options} />;
  }
}

export default withProps<Props>(
  compose(
    graphql<Props>(gql(queries.orders), {
      name: "ordersQuery",
    })
  )(withRouter(OrderListContainer))
);
