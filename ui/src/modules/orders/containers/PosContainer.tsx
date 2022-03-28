import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import client from "apolloClient";
import React from "react";
import * as compose from "lodash.flowright";

import Spinner from "modules/common/components/Spinner";
import { Alert, __, router } from "modules/common/utils";
import { IRouterProps, IConfig } from "../../../types";
import { withProps } from "../../utils";
import { mutations, queries } from "../graphql/index";
import Pos from "../components/Pos";
import {
  OrdersAddMutationResponse,
  OrdersEditMutationResponse,
  OrderDetailQueryResponse,
} from "../types";
import withCurrentUser from "modules/auth/containers/withCurrentUser";
import { IUser } from "modules/auth/types";

type Props = {
  ordersAddMutation: OrdersAddMutationResponse;
  ordersEditMutation: OrdersEditMutationResponse;
  orderDetailQuery: OrderDetailQueryResponse;
  posCurrentUser: IUser;
  currentConfig: IConfig;
  qp: any;
  orientation: string;
  productCategoriesQuery: any;
  productsQuery: any;
  customersAddMutation: any;
} & IRouterProps;

export interface IPaymentParams {
  cardAmount?: number;
  cashAmount?: number;
  mobileAmount?: number;
  billType: string;
  registerNumber?: string;
}

class PosContainer extends React.Component<Props> {
  render() {
    const {
      ordersAddMutation,
      ordersEditMutation,
      customersAddMutation,
      orderDetailQuery,
    } = this.props;

    if (orderDetailQuery.loading) {
      return <Spinner />;
    }

    const logout = () => {
      client
        .mutate({
          mutation: gql`
            mutation {
              posLogout
            }
          `,
        })

        .then(() => {
          window.location.href = "/";
        })
        .catch((error) => {
          Alert.error(error.message);
        });
    };

    const createOrder = (params: any, callback?) => {
      ordersAddMutation({ variables: params })
        .then(({ data }) => {
          if (data && data.ordersAdd && data.ordersAdd.number) {
            Alert.success(
              `Order ${data.ordersAdd.number} has been created successfully.`
            );
          }

          return data.ordersAdd;
        })
        .then((order) => {
          if (order && order._id) {
            Alert.success(`Order has been created successfully.`);

            router.setParams(this.props.history, { id: order._id, home: null });

            if (callback) {
              callback();
            }
          }
        })
        .catch((e) => {
          return Alert.error(__(e.message));
        });
    };

    const updateOrder = (params: any, callback?) => {
      return ordersEditMutation({ variables: params })
        .then(({ data }) => {
          if (data && data.ordersEdit && data.ordersEdit._id) {
            Alert.success(`Order has been updated successfully.`);

            if (callback) {
              callback();
            }

            return data.ordersEdit;
          }
        })
        .catch((e) => {
          return Alert.error(__(e.message));
        });
    };

    const addCustomer = (params: any) => {
      customersAddMutation({ variables: params })
        .then(({ data }) => {
          if (data && data.customersAdd && data.customersAdd._id) {
            Alert.success("Customer successfully created.");
          }
        })
        .catch((e) => {
          Alert.error(__(e.message));
        });
    };

    const updatedProps = {
      ...this.props,
      createOrder,
      updateOrder,
      addCustomer,
      logout,
      order: orderDetailQuery.orderDetail,
    };

    return <Pos {...updatedProps} />;
  }
}

const getRefetchQueries = (_id) => {
  return [
    {
      query: gql(queries.orderDetail),
      variables: { _id },
      fetchPolicy: "network-only",
    },
  ];
};

export default withProps<Props>(
  compose(
    graphql<Props, OrdersAddMutationResponse>(gql(mutations.ordersAdd), {
      name: "ordersAddMutation",
    }),
    graphql<Props, OrdersEditMutationResponse>(gql(mutations.ordersEdit), {
      name: "ordersEditMutation",
      options: ({ qp }) => ({
        refetchQueries: getRefetchQueries(qp.id),
      }),
    }),
    graphql<Props>(gql(mutations.ordersMakePayment), {
      name: "makePaymentMutation",
    }),
    graphql<Props>(gql(queries.productCategories), {
      name: "productCategoriesQuery",
    }),
    graphql<Props>(gql(queries.products), {
      name: "productsQuery",
      options: ({ qp }) => ({
        variables: {
          searchValue: qp && qp.searchValue ? qp.searchValue : "",
          categoryId: qp && qp.categoryId ? qp.categoryId : "",
        },
      }),
    }),
    graphql<Props>(gql(mutations.customersAdd), {
      name: "customersAddMutation",
    }),
    graphql<Props>(gql(queries.orderDetail), {
      name: "orderDetailQuery",
      options: ({ qp }) => ({
        variables: { _id: qp && qp.id },
      }),
    })
  )(withCurrentUser(withRouter<Props>(PosContainer)))
);
