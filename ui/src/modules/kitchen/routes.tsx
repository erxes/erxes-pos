import { Route } from "react-router-dom";
import queryString from 'query-string';

import asyncComponent from "modules/common/components/AsyncComponent";
import React from "react";

const KitchenScreenContainer = asyncComponent(
  () => import(/* webpackChunkName: "KitchenScreen" */ "modules/kitchen/containers/Screen")
);

const KitchenScreen = ({ location }) => {
  const qp = queryString.parse(location.search);

  return <KitchenScreenContainer qp={qp} />;
};

const routes = () => {
  return (
    <React.Fragment>
      <Route
        key="/kitchen-screen"
        exact={true}
        path="/kitchen-screen"
        component={KitchenScreen}
      />
    </React.Fragment>
  );
};

export default routes;
