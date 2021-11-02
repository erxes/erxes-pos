import { Route } from 'react-router-dom';

import asyncComponent from 'modules/common/components/AsyncComponent';
import React from 'react';

const Pos = asyncComponent(() =>
  import(
    /* webpackChunkName: "Pos" */ 'modules/orders/containers/PosContainer'
  )
);

const OrderDetail = asyncComponent(() =>
  import(/* webpackChunkName: "OrderDetail" */ 'modules/orders/containers/ReceiptContainer')
);

const detail = ({ match }) => {
  const id = match.params.id;

  return <OrderDetail id={id} />;
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

      <Route
        key="/pos"
        exact={true}
        path="/pos"
        component={Pos}
      />
    </React.Fragment>
  );
};

export default routes;
