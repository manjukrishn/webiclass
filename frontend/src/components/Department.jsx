import React from "react";
import Sidebar from "./Sidebar";
import Deptright from "./Departmentright";
import RouteWithSubRoutes from "./RouteWithSubroutes";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default function Dept({ routes }) {
  return (
    <div style={{ height: "100%" }}>
      <table>
        <tr>
          <td style={{ width: "275px" }}>
            <Sidebar tobe="home" />
          </td>
          <td colspan="15">
            <Deptright />
          </td>
        </tr>
      </table>
    </div>
  );
}
