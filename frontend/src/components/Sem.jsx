import React from "react";
import Sidebar from "./Sidebar";

export default function Sem() {
  return (
    <div style={{ height: "100%" }}>
      <table>
        <tr>
          <td style={{ width: "275px" }}>
            <Sidebar tobe="home" />
          </td>
          <td colspan="15">
          </td>
        </tr>
      </table>
    </div>
  );
}
