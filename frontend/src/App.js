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
import Loading from "./components/Loading";
import AdminMain from "./components/AdminMain";
import Sidebar from "./components/Sidebar";
import {
  isAdminMain,
  isAdminCollege,
  isTeacher,
  isHod
} from "./components/Util";

export default function App() {
  const [loading,setLoading]=React.useState(true);
  const [dept,setDeptList]=React.useState([]); 
  function setLoad(){
    setLoading(false);
  }

  React.useEffect(()=>{
    function getList(){
    fetch("/getDepartment").then(response=>response.json()).
    then(data=>{
      const arr=[]
      console.log(data.dept);
      data.dept.map((item,index)=>
      arr.push(item[0])
      )
      setDeptList(arr);
      setLoad()
    });
  }
  setTimeout(getList,2000);
  },[]);

  return (
    <div style={{ height: "100%" }}>
      <Router>
        <Switch>
          <Route path={"/login"} component={Login} />
          <Route path={"/register"} component={Register} />
          <Route path={"/register-college"} component={RegisterCollege} />
          {isAdminMain() && (
            <PrivateRoute path={"/admin-main"} component={AdminMain} />
          )}
          {isAdminCollege() && (
            <PrivateRoute path={"/admin-college"} component={AdminCollege} />
          )}
          {!loading ?
            <table>
              <tr>
                <td style={{width:"275px"}}>
                  <Sidebar dept={dept}/>
                </td>
                <td colspan="15">
                  <PrivateRoute path={"/"} exact={true} component={Home} />
                  <PrivateRoute path={"/home"} component={Home}/>
                  <PrivateRoute path={"/colleges"} component={College} />
                  {dept.map((item, index) => {
                     return <PrivateRoute path={"/"+item} component={Dept} />;
                  })}
                  
                  {isTeacher() && (
                    <PrivateRoute path={"/profile"} component={Profile} />
                  )}
                </td>
              </tr>
            </table>:<Loading/>}
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}
