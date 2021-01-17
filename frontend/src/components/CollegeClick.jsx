import React from "react";
import Table from "./DescTable";
import Collegelogo from "./Collegelogo";
export default function Homeright(props) {
 return (
    <div
      style={{
        width: "calc(100vw - 275px)",
        position: "fixed",
        height: "100vh",
        overflow: "hidden",
        transition:"linear 2s"
      }}
    >
      <table style={{ marginTop: "3%" }}>
        <tr>
          <td>
            <Collegelogo image={props.image}/>
          </td>
          <td style={{ paddingLeft: "35px", color: "#bc6ff1" }}>
            <h1
              style={{
                marginLeft: "-3%",
                display: "flex",
                justifyContent: "center",
                alignItem: "center",
                color: "#474f85"
              }}
            >{props.logged}
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
        <Table caption="Recently Added Materials" type="home" contents={props.materials} />
      </div>
    </div>
  );
}

