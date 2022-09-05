import * as compose from 'lodash.flowright';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import Screen from '../components/Screen';
import Spinner from 'modules/common/components/Spinner';
import withCurrentUser from 'modules/auth/containers/withCurrentUser';
import { FullOrderItemsQueryResponse, FullOrderQueryResponse, OrderChangeStatusMutationResponse } from '../../orders/types';
import { graphql } from 'react-apollo';
import { IConfig, IRouterProps } from '../../../types';
import { IUser } from 'modules/auth/types';
import { mutations, queries, subscriptions } from '../../orders/graphql';
import { withProps } from '../../utils';
import { withRouter } from 'react-router-dom';

type Props = {
  orderQuery: FullOrderQueryResponse;
  orderConfirmQuery: FullOrderQueryResponse;
  orderItemQuery: FullOrderItemsQueryResponse;
  posCurrentUser: IUser;
  currentConfig: IConfig;
  orderChangeStatusMutation: OrderChangeStatusMutationResponse;
} & IRouterProps;

function WaitingScreenContainer(props: Props) {
  const { orderQuery, orderConfirmQuery, orderItemQuery, orderChangeStatusMutation } = props;

  useEffect(() => {
    return orderQuery.subscribeToMore({
      document: gql(subscriptions.ordersOrdered),
      variables: { statuses: ["paid", "new", "doing", "confirm", "done", "complete"] },
      updateQuery: () => {
        orderQuery.refetch();
      },
    });
  });

  useEffect(() => {
    return orderItemQuery.subscribeToMore({
      document: gql(subscriptions.orderItemsOrdered),
      variables: { statuses: ["paid", "confirm", "done", "complete"] },
      updateQuery: () => {
        orderItemQuery.refetch();
      },
    });
  });

  if (orderQuery.loading || orderItemQuery.loading || orderConfirmQuery.loading ) {
    return <Spinner />;
  }

  const editOrder = (doc) => {
    orderChangeStatusMutation({ variables: { ...doc } })
  };

  const orders = orderQuery.fullOrders || [];
  const orderItems = orderItemQuery.fullOrderItems || [];
  const ordersConfirm = orderConfirmQuery.fullOrders || [];
  const updatedProps = {
    ...props,
    orders,
    orderItems,
    ordersConfirm,
    editOrder,
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
    }),
    graphql<Props, FullOrderQueryResponse>(gql(queries.fullOrders), {
      name: 'orderConfirmQuery',
      options: () => ({
        variables: { statuses: ['done', 'confirm', 'doing'] },
        fetchPolicy: 'network-only'
      }),
    }),
    graphql<Props, FullOrderItemsQueryResponse>(gql(queries.fullOrderItems), {
      name: "orderItemQuery",
      options: () => ({
        variables: { statuses: ["done"] },
        fetchPolicy: "network-only",
      }),
    }),
    graphql<Props, OrderChangeStatusMutationResponse>(gql(mutations.orderChangeStatus), {
      name: "orderChangeStatusMutation",
    }),
  )(withCurrentUser(withRouter<Props>(WaitingScreenContainer)))
);
