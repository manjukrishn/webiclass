import React from "react";
import Table from "./DescTable";
export default function Sem() {
  function getDept() {
    let str = window.location.pathname.split("/");
    let res = "";
    let fres = "";
    for (let i = 0; i < str.length; i++) res += " " + str[i];
    res = res.split("%20");
    for (let i = 0; i < res.length; i++) fres += " " + res[i];
    return fres;
  }
  return (
    <div
      style={{
        width: "calc(100vw - 275px)",
        position: "fixed",
        height: "100vh",
        overflow: "hidden"
      }}
    >
      <table style={{ marginTop: "3%", width: "calc(100vw - 275px)" }}>
        <tr>
          <td
            style={{
              paddingLeft: "5.5%",
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
              {getDept()}
            </h1>
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
        <Table caption="Recently Added Materials" type="home" />
      </div>
    </div>
  );
}
