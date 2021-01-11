import React from "react";
import Sidebar from "./Sidebar";
import Profileright from "./Profileright";
export default function Profile() {
  return (
    <div style={{ height: "100%" }}>
      <table>
        <tr>
          <td style={{ width: "275px" }}>
            <Sidebar tobe="home" />
          </td>
          <td colspan="15">
            <Profileright />
          </td>
        </tr>
      </table>
    </div>
  );
}
