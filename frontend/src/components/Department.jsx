import React from "react";
import Deptright from "./Departmentright";
import Loading from "./LoadingContent";

export default function Dept({ routes }) {
  function getDept() {
    let str = window.location.pathname.split("/");
    let res = "";
    let fres = "";
    for (let i = 0; i < str.length; i++) res += str[i];
    res = res.split("%20");
    for (let i = 0; i < res.length; i++) fres += res[i] + " ";
    console.log(fres.trim())
    return fres.trim();
  }
  const [sections,setSection] = React.useState([]);
  const [loading,setLoading]=React.useState(true);

  function setLoad(){
    setLoading(false);
  }

  React.useEffect(()=>{
    fetch("/getSection",{
      method:"POST",
      cache:"no-cache",
      headers:{
        "content_type":"application/json",
      },
      body:JSON.stringify({dept:getDept()})
     }).then(res=>{
       return res.json()
    }).then(json=>{
      console.log(json.sections);
      const arr=[]
      json.sections.map((item,index)=>{
        arr.push({section_id:item[0],section_name:item[1],no_of_subjects:item[2],no_of_students:item[3]})
      });
      console.log(arr);
      setSection(arr);      
    })
   setTimeout(setLoad,2000)
  },[getDept()]);

  return (
    <div style={{ height: "100%" }}>
      {!loading ? <Deptright section={sections}/> : <Loading/>}    
   </div>
  );
}
