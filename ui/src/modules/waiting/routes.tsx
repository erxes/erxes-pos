import { Route } from "react-router-dom";
import queryString from 'query-string';

import asyncComponent from "modules/common/components/AsyncComponent";
import React from "react";

const WaitingScreenContainer = asyncComponent(
  () => import(/* webpackChunkName: "WaitingScreen" */ "modules/waiting/containers/Screen")
);

const WaitingScreen = ({ location }) => {
  const qp = queryString.parse(location.search);

  return <WaitingScreenContainer qp={qp} />;
};

const routes = () => {
  if (!['', 'waiting'].includes(localStorage.getItem('erxesPosMode') || '')) {
    return (<></>);
  }

  return (
    <React.Fragment>
      <Route
        key="/waiting-screen"
        exact={true}
        path="/waiting-screen"
        component={WaitingScreen}
      />
    </React.Fragment>
  );
};

export default routes;
