import React from "react";
import Table from "./DescTable";
import Tooltip from "@material-ui/core/Tooltip";
import AddMaterial from "./AddMaterial";

export default function Secright(props) {
  const [materials,setMaterials]=React.useState([]);
  React.useEffect(()=>{
    console.log(props.sec_id)
    fetch("/getSectionTable",{
      method:"POST",
      cache:"no-cache",
      headers:{
        "content_type":"application/json",
      },
      body:JSON.stringify({secId:props.secId,dept:props.dept})
     }).then(response=>response.json()).then(
    data=>{
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
},[props.secId]);
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
            <AddMaterial secId={props.secId}/>
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
        <Table caption="Recently Added Materials" type="section" contents={materials} />
      </div>
    </div>
  );
}
