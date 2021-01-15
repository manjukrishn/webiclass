import CollegeRight from "./Collegeright";
import React from "react";
import Loading from "./LoadingContent";

export default function College() {
  const [collegeList,setCollegeList]=React.useState([]);
  const [loading,setLoading]=React.useState(true);

  function setLoad(){
    setLoading(false);
  }
  
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
      setTimeout(setLoad,2000)
  }); 
  },[]);

  return (
    <div style={{ height: "100%" }}>
    {!loading ? <CollegeRight colleges={collegeList} /> : <Loading/>}
    </div>
  );
}
