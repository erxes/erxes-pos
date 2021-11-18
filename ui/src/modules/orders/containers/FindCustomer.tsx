// import { graphql } from "react-apollo";
// import gql from "graphql-tag";
// import * as compose from "lodash.flowright";
import React from "react";
// import { withProps } from "../../utils";
// import { mutations } from "../graphql/index";
import FindCustomer from "../components/drawer/FindCustomer";

type Props = {
  options: any;
  totalAmount: number;
  closeDrawer: any;
};

class FindCustomerContainer extends React.Component<Props> {
  render() {
    return <FindCustomer {...this.props} />;
  }
}

export default FindCustomerContainer;
