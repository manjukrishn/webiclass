import React from "react";

export default function Loading(){
    return(
        <div style={{width:"100vw",height:"100vh",zIndex:"2",backgroundColor:"white",display:"flex",alignItems:"center",justifyContent:"center",position:"absolute",marginTop:"-5%"}}>
           <img src="Loading.gif" alt="this slowpoke moves"  width="100"/>
        </div>
    )
}