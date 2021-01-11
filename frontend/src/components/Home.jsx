import React from "react";
import Sidebar from "./Sidebar";
import Homeright from "./Homeright";
import "./Home.css";
export default function Home() {
  return (
    <div style={{ height: "100%" }}>
      <table>
        <tr>
          <td style={{width:"275px"}}>
            <Sidebar tobe="home" />
          </td>
          <td colspan="15">
            <Homeright />
          </td>
        </tr>
      </table>
    </div>
  );
}
