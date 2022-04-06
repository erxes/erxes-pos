import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import client from "apolloClient";
import React from "react";
import * as compose from "lodash.flowright";

import Spinner from "modules/common/components/Spinner";
import { Alert, __, router, confirm } from "modules/common/utils";
import { IRouterProps, IConfig } from "../../../types";
import { trimGraphqlError, withProps } from "../../utils";
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
  addPaymentMutation: any;
  orderDetailQuery: OrderDetailQueryResponse;
  posCurrentUser: IUser;
  currentConfig: IConfig;
  qp: any;
  orientation: string;
  productCategoriesQuery: any;
  productsQuery: any;
  customersAddMutation: any;
  makePaymentMutation: any;
  ordersCancelMutation: any;
} & IRouterProps;

type States = {
  productBodyType: string;
  showMenu: boolean;
  modalContentType: string;
};

export interface IPaymentParams {
  cardAmount?: number;
  cashAmount?: number;
  mobileAmount?: number;
  billType: string;
  registerNumber?: string;
}

class PosContainer extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);

    this.state = {
      productBodyType: "product",
      showMenu: false,
      modalContentType: "",
    };
  }

  render() {
    const {
      ordersAddMutation,
      ordersEditMutation,
      customersAddMutation,
      orderDetailQuery,
      ordersCancelMutation,
      addPaymentMutation,
      makePaymentMutation,
    } = this.props;
    const { showMenu, modalContentType, productBodyType } = this.state;

    if (orderDetailQuery.loading) {
      return <Spinner />;
    }

    const onChangeProductBodyType = (productBodyType: string) => {
      this.setState({ productBodyType });
    };

    const toggleModal = (modalContentType: string) => {
      this.setState({ showMenu: !this.state.showMenu, modalContentType });
    };

    const handleModal = () => {
      this.setState({
        showMenu: !this.state.showMenu,
      });
    };

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
          Alert.error(__(trimGraphqlError(error.message)));
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
            Alert.success(__("Order has been created successfully"));

            router.setParams(this.props.history, { id: order._id, home: null });
            console.log("in container");
            if (callback) {
              callback();
            }
          }
        })
        .catch((e) => {
          return Alert.error(__(trimGraphqlError(e.message)));
        });
    };

    const updateOrder = (params: any, callback?) => {
      return ordersEditMutation({ variables: params })
        .then(({ data }) => {
          if (data && data.ordersEdit && data.ordersEdit._id) {
            Alert.success(__("Order has been updated successfully"));

            if (callback) {
              callback();
            }

            return data.ordersEdit;
          }
        })
        .catch((e) => {
          return Alert.error(__(trimGraphqlError(e.message)));
        });
    };

    const addCustomer = (params: any) => {
      customersAddMutation({ variables: params })
        .then(({ data }) => {
          if (data && data.customersAdd && data.customersAdd._id) {
            Alert.success(__("Customer successfully created"));
          }
        })
        .catch((e) => {
          Alert.error(__(trimGraphqlError(e.message)));
        });
    };

    const cancelOrder = (_id: string) => {
      confirm(
        `${__("All order items will be deleted")}. ${__("Are you sure")}?`
      ).then(() => {
        ordersCancelMutation({ variables: { _id } })
          .then(() => {
            Alert.success("Order successfully cancelled");
            window.location.href = "/";
          })
          .catch((e) => {
            return Alert.error(__(trimGraphqlError(e.message)));
          });
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
          window.location.href = "/";
        })
        .catch((e) => {
          Alert.error(__(e.message));
        });
    };

    const setCardPaymentInfo = (params: any, callback?: any) => {
      addPaymentMutation({ variables: params })
        .then(({ data }) => {
          if (
            data &&
            data.ordersSetPaymentInfo &&
            data.ordersSetPaymentInfo._id
          ) {
            Alert.success("Card payment info saved");
          }

          if (callback) {
            callback();
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
      cancelOrder,
      toggleModal,
      onChangeProductBodyType,
      handleModal,
      productBodyType,
      setCardPaymentInfo,
      makePayment,
      showMenu,
      modalContentType,
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
    graphql<Props>(gql(mutations.ordersAddPayment), {
      name: "addPaymentMutation",
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
    }),
    graphql<Props>(gql(mutations.ordersCancel), {
      name: "ordersCancelMutation",
    })
  )(withCurrentUser(withRouter<Props>(PosContainer)))
);
