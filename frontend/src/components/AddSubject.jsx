import React from "react";
import Submit from "./SubmitAddSubject";
import "./Login.css";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
export default function Login() {
  const history = useHistory();
  const [credentials, setCredentials] = React.useState({
    subjectcode: "",
    subjectname: ""
  });
  const [disabled, setDisabled] = React.useState(true);
  const [error,setError]=React.useState({
    invalidSubject:false
  });

  React.useEffect(()=>{
    if(credentials.subjectcode && credentials.subjectname)
    setDisabled(false);
    else
    setDisabled(true);
  },[credentials]);
  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }
  function errorLogging(value,role,dept){
    if(value==="Success"){
       setError({
         invalidSubject:false
       })
    }
    else{
      setError({
        invalidSubject:true
      })
    }
}
  
  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-logo">W</div>
        <h1 className="login-signIn">Add Subject</h1>
        {error.invalidSubject ?
        <TextField
          error
          value={credentials.subjectcode}
          name="subjectcode"
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>Subject already present</span>
          }
          onChange={handleChange}
          className="login-email"
          inputProps={{
            min: 0,
            style: { fontFamily: '"Nunito", sans-serif' }
          }}
        />:
        <TextField
          name="subjectcode"
          value={credentials.subjectcode}
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>Subject code</span>
          }
          onChange={handleChange}
          className="login-email"
          inputProps={{
            min: 0,
            style: { fontFamily: '"Nunito", sans-serif' }
          }}
        />}
        
         
        <TextField
        style={{marginTop:"5%"}}
          name="subjectname"
          value={credentials.subjectname}
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>Subject name</span>
          }
          onChange={handleChange}
          className="login-email"
          inputProps={{
            min: 0,
            style: { fontFamily: '"Nunito", sans-serif' }
          }}
        />
        
        <div style={{ width: "85%", marginLeft: "7.5%", marginTop: "50px" }}>
          <Submit disabled={disabled} credentials={credentials} errorLogging={errorLogging} />
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
        <div
          onClick={() => {
            history.push("/admin-main-dpt");
          }}
          className="admin-main-go-home"
          style={{ marginTop: "20px",cursor:"pointer" }}
        >
          Add Department
        </div>
      </div>
    </div>
  );
}

