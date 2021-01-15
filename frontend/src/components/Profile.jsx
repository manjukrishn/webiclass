import React from "react";
import Profileright from "./Profileright";
import Loading from "./LoadingContent";

export default function Profile() {  
  const [materials,setMaterial]=React.useState([]);
  const [flag,setFla]=React.useState(false);
  const [details,setDetails]=React.useState({name:null,dept:null,role:null});
  const [loading,setLoading]=React.useState(true);
  
  function setLoad(){
    setLoading(false);
  }

  React.useEffect(()=>{
    fetch("/getProfile").then(response=>response.json()).then
     (data=>{
       const arr=[];
       setDetails({name:data.details[0][0],dept:data.details[0][1],email:data.details[0][2]})
        data.material.map((item,index)=>arr.push(
        {
          link:item[0],
          desc:item[1],
          type:item[2],
          faculty:item[3],
          subject:item[4],
          dept:item[5],
          date_added:item[6]
        }));
        setMaterial(arr);
        setTimeout(setLoad,2000);
  });
  },[flag]);
  function setFlag(e){
      setFla(e);
  }
  return (
    <div style={{ height: "100%" }}>
    { !loading ? <Profileright setFlag={setFlag} materials={materials} details={details}/> :<Loading/>}
    </div>
  );
}
