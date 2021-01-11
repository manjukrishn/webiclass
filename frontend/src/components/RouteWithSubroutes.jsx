import React from "react";
import { Route, Switch } from "react-router-dom";

export default function Routes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}
