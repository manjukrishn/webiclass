import React from "react";
import Table from "./DescTable";
import Tooltip from "@material-ui/core/Tooltip";
import AddMaterial from "./AddMaterial";
import Loading from "./LoadingContent";
import {isHod,isFaculty,dept} from "./Util";
import AddClass from "./AddClassLink";

export default function Secright(props) {
  const [materials,setMaterials]=React.useState([]);
  const [a,ab]=React.useState([]);
  const [flag,setFla]=React.useState(false);
  const [loading,setLoading]=React.useState(true);

  function setLoad(){
    setLoading(false);
  }

  React.useEffect(()=>{
    fetch("/getSectionTable",{
      method:"POST",
      cache:"no-cache",
      headers:{
        "content_type":"application/json",
      },
      body:JSON.stringify(props.secId)
     }).then(response=>response.json()).then(data=>{
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
     ab(arr);
});
setTimeout(setLoad,2000)
},[]);

function getDept() {
  let str = window.location.pathname.split("/");
  let res = "";
  let fres = "";
  for (let i = 0; i < str.length; i++) res += str[i];
  res = res.split("%20");
  for (let i = 0; i < res.length; i++) fres += res[i] + " ";
  return fres.trim();
}

function setFlag(e){
  setFla(e);
}
  let paddingLeft = "5%";
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (width < 1700) paddingLeft = "3.5%";
  return (
    <div>
  { !loading ?
    <div
      style={{
        width: "calc(100vw - 275px)",
        position: "fixed",
        height: "100vh",
        overflow: "hidden"
      }}
    >
   <div>
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
          </td>{
             isFaculty() && dept()==getDept() &&
          <td>
            <AddMaterial secId={props.secId} flag={setFlag}/>
          </td>}
          {
            isFaculty() && dept()==getDept() &&
            <td>
            <AddClass section={props.secId}/>
          </td>
          }
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
        <Table caption="Recently Added Materials" type="home" contents={a} />
      </div>
      </div>
    </div>
    :
      <Loading/>
      }
    </div>
    
  );
}
