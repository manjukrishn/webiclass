import React from "react";
import "./AdminMain.css";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
export default function AdminMain() {
  const history = useHistory();
  const [tableItems,setTableItems]=React.useState([]);
  const [flag,setFlag]=React.useState(true);
  React.useEffect(()=>{
    fetch("/admin-main", {
      method:"GET",
      cache: "no-cache",
      headers:{
          "content_type":"application/json",
      }
    }
    ).then(response => {
    return response.json()
   })
   .then(json => {
      console.log(json.college_url);
      const arr=[];
      json.college_url.map((item,index)=>{
        arr.push(item[0]);
      })
      setTableItems(arr);
   })
  },[flag]);
  const handleClick = (value,approve) => {
    const val={college_url:value,approve:approve}
    setFlag(!flag)
    fetch("/admin-main", {
      method:"POST",
      cache: "no-cache",
      headers:{
          "content_type":"application/json",
      },
       body:JSON.stringify(val)
      }
    ).then(response => {
    return response.json()
   })
   .then(json => {
      console.log(json.status);  
   })
  }
  return (
    <div className="admin-main-body">
      <div className="admin-main-container">
        <div className="admin-main-logo">W</div>
        <h1 className="admin-main-signUp">Admin Main</h1>
        <div
          style={{ height: "200px", overflowY: "scroll", width: "510px" }}
          className="container-div"
        >
          <table className="list-table">
            {tableItems.map((item, index) => {
              return (
                <tr>
                  <td style={{ width: "60%" }}>
                    <TextField
                      style={{ width: "100%" }}
                      disabled
                      label="College Url"
                      defaultValue={item}
                      variant="filled"
                    />
                  </td>
                  <td style={{ width: "20%", paddingLeft: "25px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ width: "100%", boxShadow: "none" }}
                      onClick={()=>handleClick(item,1)}
                    >
                      Approve
                    </Button>
                  </td>
                  <td style={{ width: "20%", paddingLeft: "25px" }}>
                    <Button
                      onClick={()=>handleClick(item,0)}
                      variant="contained"
                      style={{ width: "100%", boxShadow: "none" }}
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        <div
          onClick={() => {
            history.push("/");
          }}
          className="admin-main-go-home"
          style={{ marginTop: "20px",cursor:"pointer" }}
        >
          Go to home
        </div>
      </div>
    </div>
  );
}
