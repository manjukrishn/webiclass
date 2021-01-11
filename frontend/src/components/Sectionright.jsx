import React from "react";
import Table from "./DescTable";
import Tooltip from "@material-ui/core/Tooltip";

import AddMaterial from "./AddMaterial";
export default function Secright(props) {
  let paddingLeft = "5%";
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (width < 1700) paddingLeft = "3.5%";
  return (
    <div
      style={{
        width: "calc(100vw - 275px)",
        position: "fixed",
        height: "100vh",
        overflow: "hidden"
      }}
    >
      <table
        style={{
          paddingTop: "2%",
          width: "calc(100vw - 320px)"
        }}
      >
        <tr>
          <td
            style={{
              paddingLeft: paddingLeft,
              color: "#bc6ff1",
              width: "100%",
              textAlign: "left"
            }}
          >
            <h1
              style={{
                color: "#474f85"
              }}
            >
              {"Section " + props.heading}
            </h1>
          </td>
          <td>
            <AddMaterial />
          </td>
        </tr>
      </table>
      <div
        style={{
          marginLeft: "-5.5%",
          zIndex: "1",
          marginTop: "3.5%",
          marginBottom: "50px"
        }}
      >
        <Table caption="Recently Added Materials" type="section" />
      </div>
    </div>
  );
}
