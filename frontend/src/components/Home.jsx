import React from "react";
import Homeright from "./Homeright";
import Loading from "./LoadingContent";
import "./Home.css";

export default function Home(props) {
  const [materials,setMaterials]=React.useState([]); 
  const [logged,setLogged]=React.useState();
  const [loading,setLoading]=React.useState(true);
  const [image,setImage]=React.useState("");
  function setLoad(){
    setLoading(false);
  }

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
      setImage(data.image);
     console.log(arr);
     setMaterials(arr);
   });

   setTimeout(setLoad,2000)
  },[]);
  
  return (
    <div style={{ height: "100%" }}>
    { !loading ? <Homeright materials={materials} logged={logged} logo={image}/> :<Loading/>}
    </div>
  );
}
