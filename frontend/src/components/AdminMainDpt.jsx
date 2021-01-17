import React from "react";
import "./AdminMain.css";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import Submit from "./SubmitAdminMainDpt";
export default function AdminMain() {
  const history = useHistory();
  const [credentials, setCredentials] = React.useState({
    dptname:""
  });
  const [disabled, setDisabled] = React.useState(true);
  const [error,setError]=React.useState({invalidEmail:false});

  React.useEffect(()=>{
    if(credentials.dptname)
    setDisabled(false)
    else
    setDisabled(true);
  },[credentials]);

  function handleChange(e) {
    const { name, value } = e.target;
    if(error.invalidEmail){
      setError({
        invalidEmail:false
      })
    }

    setCredentials((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }
  
  function errorLogging(value){
    if(value==="Success"){
       setError({
        invalidDepartment:false
       });
       alert("Department Added Successfully")
    }
    else if(value==="Department already exists"){
       setError({
         invalidDepartment:true
       })
    }
  }

  return (
    <div className="admin-main-body">
      <div className="admin-main-container">
        <div className="admin-main-logo">W</div>
        <h1 className="admin-main-signUp">Add Department</h1>
        {error.invalidDepartment ?
        <TextField
          error
          name="dptname"
          value={credentials.dptname}
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>Department already exists</span>
          }
          onChange={handleChange}
          className="register-password"
          style={{marginTop:"20px"}}
          inputProps={{
            min: 0,
            style: { fontFamily: '"Nunito", sans-serif' }
          }}
        />:
        <TextField
          name="dptname"
          value={credentials.dptname}
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>Department Name</span>
          }
          onChange={handleChange}
          className="register-password"
          style={{marginTop:"20px"}}
          inputProps={{
            min: 0,
            style: { fontFamily: '"Nunito", sans-serif' }
          }}
        />}
        <div style={{ width: "85%", marginLeft: "7.5%", marginTop: "40px" }}>
          <Submit disabled={disabled} credentials={credentials}  errorLogging={errorLogging}/>
        </div>
        <div
          onClick={() => {
            history.push("/admin-main");
          }}
          className="admin-main-go-home"
          style={{ marginTop: "20px",cursor:"pointer" }}
        >
          Add HOD
        </div>
        <div
          onClick={() => {
            history.push("/admin-main-admin-dpt");
          }}
          className="admin-main-go-home"
          style={{ marginTop: "20px",cursor:"pointer" }}
        >
          Add Admin Department
        </div>
      </div>
    </div>
  );
}

