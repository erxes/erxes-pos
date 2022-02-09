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

const SplitPaymentContainer = asyncComponent(
  () =>
    import(
      /* webpackChunkName: "SplitPayment" */ "modules/orders/containers/SplitPaymentContainer"
    )
);

const Receipt = ({ match, location }) => {
  const id = match.params.id;
  const qp = queryString.parse(location.search);

  return <ReceiptContainer id={id} kitchen={qp && qp.kitchen} />;
};

const Pos = ({ location }) => {
  const qp = queryString.parse(location.search);

  return <PosContainer qp={qp} />;
};

const SplitPayment = ({ match }) => {
  return <SplitPaymentContainer id={match.params.id} />;
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

      <Route
        key="/order-payment/:id"
        exact={true}
        path="/order-payment/:id"
        component={SplitPayment}
      />

      <Route key="/" exact={true} path="/" component={Pos} />
    </React.Fragment>
  );
};

export default routes;
