import { Route } from "react-router-dom";

import asyncComponent from "modules/common/components/AsyncComponent";
import React from "react";

const Pos = asyncComponent(
  () =>
    import(
      /* webpackChunkName: "Pos" */ "modules/orders/containers/PosContainer"
    )
);

const ReceiptContainer = asyncComponent(
  () => import(/* webpackChunkName: "Receipt" */ "modules/orders/containers/ReceiptContainer")
);

const detail = ({ match }) => {
  const id = match.params.id;

  return <ReceiptContainer id={id} />;
};

const routes = () => {
  return (
    <React.Fragment>
      <Route
        key="/orders/:id"
        exact={true}
        path="/orders/:id"
        component={detail}
      />

      <Route key="/" exact={true} path="/" component={Pos} />
    </React.Fragment>
  );
};

export default routes;
