import { Route } from "react-router-dom";
import queryString from "query-string";

import asyncComponent from "modules/common/components/AsyncComponent";
import React from "react";

const PosContainer = asyncComponent(
  () =>
    import(
      /* webpackChunkName: "Pos" */ "modules/orders/containers/PosContainer"
    )
);

const ReceiptContainer = asyncComponent(
  () =>
    import(
      /* webpackChunkName: "Receipt" */ "modules/orders/containers/ReceiptContainer"
    )
);

const Receipt = ({ match }) => {
  const id = match.params.id;

  return <ReceiptContainer id={id} />;
};

const Pos = ({ location }) => {
  const qp = queryString.parse(location.search);

  return <PosContainer qp={qp} />;
};

const routes = () => {
  return (
    <React.Fragment>
      <Route key="/pos" exact={true} path="/pos" component={Pos} />

      <Route
        key="/order-receipt/:id"
        exact={true}
        path="/order-receipt/:id"
        component={Receipt}
      />

      <Route key="/" exact={true} path="/" component={Pos} />
    </React.Fragment>
  );
};

export default routes;
