import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Home from "./Home";
import College from "./College";
import Login from "./Login";

export default function Linker() {
  return (
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path={"/home"|| "/"} compsonent={Home} />
        <Route path="/colleges" component={College} />
      </Switch>
    </div>
  );
}
