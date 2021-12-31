import * as compose from "lodash.flowright";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import Screen from "../components/Screen";
import Spinner from "modules/common/components/Spinner";
import withCurrentUser from "modules/auth/containers/withCurrentUser";
import { graphql } from "react-apollo";
import { IConfig, IRouterProps } from "../../../types";
import { IUser } from "modules/auth/types";
import { queries, subscriptions } from "../../orders/graphql";
import { FullOrderQueryResponse } from "../../orders/types";
import { withProps } from "../../utils";
import { withRouter } from "react-router-dom";

type Props = {
  orderQuery: FullOrderQueryResponse;
  currentUser: IUser;
  currentConfig: IConfig;
  qp: any;
} & IRouterProps;

function KitchenScreenContainer(props: Props) {
  const { orderQuery } = props;

  useEffect(() => {
    return orderQuery.subscribeToMore({
      document: gql(subscriptions.ordersOrdered),
      variables: { statuses: ["paid", "new", "doing", "done", "complete"] },
      updateQuery: () => {
        orderQuery.refetch();
      },
    });
  });

  if (orderQuery.loading) {
    return <Spinner />;
  }

  const orders = orderQuery.fullOrders || [];

  const updatedProps = {
    ...props,
    orders,
  };

  return <Screen {...updatedProps} />;
}

export default withProps<Props>(
  compose(
    graphql<Props, FullOrderQueryResponse>(gql(queries.fullOrders), {
      name: "orderQuery",
      options: () => ({
        variables: { statuses: ["done"] },
        fetchPolicy: "network-only",
      }),
    })
  )(withCurrentUser(withRouter<Props>(KitchenScreenContainer)))
);
