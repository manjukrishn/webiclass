import Sidebar from "./Sidebar";
import CollegeRight from "./Collegeright";
import React from "react";
export default function College() {
  const [collegeList,setCollegeList]=React.useState([]);
  React.useEffect(()=>{
    fetch("/college").then(response=>response.json()).then
    (data=>{
      const arr=[]
      data.colleges.map((item,index)=>arr.push(
      {
        link:item[0],
        college_name:item[1],
        logo:item[2]
      }))
      console.log(arr);
      setCollegeList(arr);
  });    
  },[]);
  return (
    <div style={{ height: "100%" }}>
      <table>
        <tr>
          <td style={{ width: "275px" }}>
            <Sidebar tobe="colleges"/>
          </td>
          <td colspan="15" style={{width:"calc(100vw - 275px)"}}>
            <CollegeRight colleges={collegeList} />
          </td>
        </tr>
      </table>
    </div>
  );
}
