import React from "react";
import Sidebar from "./Sidebar";
import Sectionright from "./Sectionright";
export default function Sec() {
  return (
    <div style={{ height: "100%" }}>
      <table>
        <tr>
          <td style={{ width: "275px" }}>
            <Sidebar tobe="home" />
          </td>
          <td colspan="15">
            <Sectionright />
          </td>
        </tr>
      </table>
    </div>
  );
}
