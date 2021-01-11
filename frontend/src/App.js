import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import RegisterCollege from "./components/RegisterCollege";
import Home from "./components/Home";
import College from "./components/College";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Dept from "./components/Department";
import PageNotFound from "./components/PageNotFound";
import { Route } from "react-router-dom";
import AdminCollege from "./components/AdminCollege";
import AdminMain from "./components/AdminMain";
import {
  isAdminMain,
  isAdminCollege,
  isTeacher,
  isHod
} from "./components/Util";
export default function App() {

  const subRoutes = [
    "/Basic Science",
    "/Computer Science",
    "/Civil Engineering",
    "/Information Science",
    "/Electronics and Communication",
    "/Mechanical Engineering"
  ];
  return (
    <div style={{ height: "100%" }}>
      <Router>
        <Switch>
          <Route path={"/login"} component={Login} />
          <Route path={"/register"} component={Register} />
          <Route path={"/register-college"} component={RegisterCollege} />
          <PrivateRoute path={"/"} exact={true} component={Home} />
          <PrivateRoute path={"/home"} component={Home} />
          <PrivateRoute path={"/colleges"} component={College} />
          {isTeacher() && (
            <PrivateRoute path={"/profile"} component={Profile} />
          )}
          {isAdminMain() && (
            <PrivateRoute path={"/admin-main"} component={AdminMain} />
          )}
          {isAdminCollege() && (
            <PrivateRoute path={"/admin-college"} component={AdminCollege} />
          )}
          {subRoutes.map((item, index) => {
            return <PrivateRoute path={item} component={Dept} />;
          })}
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}
