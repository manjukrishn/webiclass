import Sidebar from "./Sidebar";
import CollegeRight from "./Collegeright";
import React from "react";
export default function College() {
  return (
    <div style={{ height: "100%" }}>
      <table>
        <tr>
          <td style={{ width: "275px" }}>
            <Sidebar tobe="colleges"/>
          </td>
          <td colspan="15" style={{width:"calc(100vw - 275px)"}}>
            <CollegeRight />
          </td>
        </tr>
      </table>
    </div>
  );
}
