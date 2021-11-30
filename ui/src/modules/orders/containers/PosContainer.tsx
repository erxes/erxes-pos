import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import * as compose from "lodash.flowright";
import React from "react";
import { Alert } from "modules/common/utils";
import { IRouterProps, IConfig } from "../../../types";
import { withProps } from "../../utils";
import { mutations, queries } from "../graphql/index";
import Pos from "../components/Pos";
import { OrdersAddMutationResponse, OrdersEditMutationResponse, OrderDetailQueryResponse } from "../types";
import withCurrentUser from "modules/auth/containers/withCurrentUser";
import { IUser } from "modules/auth/types";
import Spinner from "modules/common/components/Spinner";

type Props = {
  ordersAddMutation: OrdersAddMutationResponse;
  ordersEditMutation: OrdersEditMutationResponse;
  currentUser: IUser;
  currentConfig: IConfig;
  qp: any;
  orderDetailQuery: OrderDetailQueryResponse;
  makePaymentMutation: any;
} & IRouterProps;

class PosContainer extends React.Component<Props> {
  render() {
    const { ordersAddMutation, ordersEditMutation, makePaymentMutation, orderDetailQuery, qp } = this.props;

    if (qp && qp.id && orderDetailQuery.loading) {
      return <Spinner />;
    }

    const createOrder = (params: any) => {
      ordersAddMutation({ variables: params }).then(({ data }) => {
        if (data && data.ordersAdd && data.ordersAdd.number) {
          return Alert.success(`Order ${data.ordersAdd.number} has been created successfully.`);
        }
      }).catch(e => {
        return Alert.error(e.message);
      });
    };

    const updateOrder = (params: any) => {
      ordersEditMutation({ variables: params }).then(({ data }) => {
        if (data && data.ordersEdit && data.ordersEdit._id) {
          return Alert.success(`Order has been updated successfully.`);
        }
      }).catch(e => {
        return Alert.error(e.message);
      });
    };

    const makePayment = (params: any) => {
      makePaymentMutation({ variables: params }).then(({ data }) => {
        console.log(data, 'mmmmm')
      }).catch(e => {
        console.log(e, 'eeeee')
      });
    };

    const updatedProps = {
      ...this.props,
      createOrder,
      updateOrder,
      makePayment,
      order: qp && qp.id ? orderDetailQuery.orderDetail : null
    };

    return <Pos {...updatedProps} />;
  }
}

export default withProps<Props>(
  compose(
    graphql<Props, OrdersAddMutationResponse>(gql(mutations.ordersAdd), {
      name: "ordersAddMutation",
    }),
    graphql<Props, OrdersEditMutationResponse>(gql(mutations.ordersEdit), {
      name: 'ordersEditMutation'
    }),
    graphql<Props>(gql(queries.orderDetail), {
      name: 'orderDetailQuery',
      options: ({ qp }) => ({ variables: { _id: qp && qp.id }, fetchPolicy: 'network-only' })
    }),
    graphql<Props>(gql(mutations.ordersMakePayment), {
      name: 'makePaymentMutation'
    })
  )(withCurrentUser(withRouter<Props>(PosContainer)))
);
