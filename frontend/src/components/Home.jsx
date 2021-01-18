import React from "react";
import Homeright from "./Homeright";
import Loading from "./LoadingContent";
import "./Home.css";

export default function Home(props) {
  const [materials,setMaterials]=React.useState([]); 
  const [loading,setLoading]=React.useState(true);

  function setLoad(){
    setLoading(false);
  }

  React.useEffect(()=>{
    fetch("/home").then(response=>response.json()).then(data=>{
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

   setTimeout(setLoad,2000)
  },[]);
  
  return (
    <div style={{ height: "100%" }}>
    { !loading ? <Homeright materials={materials}/> :<Loading/>}
    </div>
  );
}
