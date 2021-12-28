import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import * as compose from "lodash.flowright";
import React from "react";
import { Alert, __ } from "modules/common/utils";
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
import Spinner from "modules/common/components/Spinner";

type Props = {
  ordersAddMutation: OrdersAddMutationResponse;
  ordersEditMutation: OrdersEditMutationResponse;
  currentUser: IUser;
  currentConfig: IConfig;
  qp: any;
  orientation: string;
  orderDetailQuery: OrderDetailQueryResponse;
  makePaymentMutation: any;
  productCategoriesQuery: any;
  productsQuery: any;
  customersAddMutation: any;
  setPaymentInfoMutation: any;
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
      makePaymentMutation,
      orderDetailQuery,
      qp,
      customersAddMutation,
      setPaymentInfoMutation
    } = this.props;

    if (qp && qp.id && orderDetailQuery.loading) {
      return <Spinner />;
    }

    const order = qp && qp.id ? orderDetailQuery.orderDetail : null;

    const createOrder = (params: any) => {
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
            window.location.href = `/pos?id=${order._id}`;
          }
        })
        .catch((e) => {
          return Alert.error(__(e.message));
        });
    };

    const updateOrder = (params: any) => {
      ordersEditMutation({ variables: params })
        .then(({ data }) => {
          if (data && data.ordersEdit && data.ordersEdit._id) {
            Alert.success(`Order has been updated successfully.`);
            window.location.href = `/pos?id=${qp.id}`;
          }
        })
        .catch((e) => {
          return Alert.error(__(e.message));
        });
    };

    const makePayment = (_id: string, params: IPaymentParams) => {
      makePaymentMutation({ variables: { doc: params, _id } })
        .then(({ data }) => {
          if (data.ordersMakePayment) {
            const resp = data.ordersMakePayment;

            if (resp.success === "true") {
              return Alert.success(__("Payment successful"));
            }
            if (resp.message) {
              return Alert.warning(resp.message);
            }
            if (resp.lotteryWarningMsg) {
              return Alert.warning(resp.lotteryWarningMsg);
            }
            if (resp.getInformation) {
              return Alert.warning(resp.getInformation);
            }
          }
        })
        .then(() => {
          window.open(`/order-receipt/${_id}`, "_blank");
          window.location.href = "/pos";
        })
        .catch((e) => {
          Alert.error(__(e.message));
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

    const setCardPaymentInfo = (params: any) => {
      setPaymentInfoMutation({ variables: params }).then(({ data }) => {
        if (data && data.ordersSetPaymentInfo && data.ordersSetPaymentInfo._id) {
          Alert.success('Card payment info saved');
        }
      }).catch(e => {
        Alert.error(__(e.message))
      });
    };

    const updatedProps = {
      ...this.props,
      createOrder,
      updateOrder,
      makePayment,
      addCustomer,
      order,
      setCardPaymentInfo
    };

    return <Pos {...updatedProps} />;
  }
}

export const getRefetchQueries = (_id) => {
  return [
    {
      query: gql(queries.orderDetail),
      variables: { _id },
      // fetchPolicy: "network-only",
    }
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
        refetchQueries: getRefetchQueries(qp.id)
      })
    }),
    graphql<Props>(gql(queries.orderDetail), {
      name: "orderDetailQuery",
      options: ({ qp }) => ({
        variables: { _id: qp && qp.id },
        fetchPolicy: "network-only",
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
    graphql<Props>(gql(mutations.ordersSetPaymentInfo), {
      name: 'setPaymentInfoMutation'
    })
  )(withCurrentUser(withRouter<Props>(PosContainer)))
);
