import React from "react";
import Table from "./DescTable";
import Collegelogo from "./Collegelogo";
export default function Homeright() {
const [logged,setLogged]=React.useState();
const [materials,setMaterials]=React.useState([]); 
   React.useEffect(()=>{
       fetch("/home").then(response=>response.json()).then(data=>{
      setLogged(data.college_name)
      const arr=[]
      data.material.map((item,index)=>arr.push(
      {
        link:item[0],
        desc:item[1],
        type:item[2],
        faculty:item[3],
        subject:item[4],
        dept:item[5],
        date_added:item[6]
      }))
      console.log(arr);
      setMaterials(arr);
  });
 },[]); 
 return (
    <div
      style={{
        width: "calc(100vw - 275px)",
        position: "fixed",
        height: "100vh",
        overflow: "hidden"
      }}
    >
      <table style={{ marginTop: "3%" }}>
        <tr>
          <td>
            <Collegelogo />
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
            >{logged}
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
        <Table caption="Recently Added Materials" type="home" contents={materials} />
      </div>
    </div>
  );
}
