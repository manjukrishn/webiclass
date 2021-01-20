import React from "react";
import Submit from "./SubmitLogin";
import "./Login.css";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
export default function Login() {
  const history = useHistory();
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: ""
  });
  const [disabled, setDisabled] = React.useState(true);
  const [error,setError]=React.useState({
    invalidEmail:false,
    invalidPassword:false
  });

 

  React.useEffect(() => {
    const res = () => {
      const mailFormat = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]{2,4})+)*$/;
      if (
        credentials.email.match(mailFormat) &&
        credentials.password.length > 0
      )
        return false;
      return true;
    };
    const fans = res();
    setDisabled(fans);
  }, [credentials]);

  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }
  React.useEffect(()=>{
    sessionStorage.setItem("isLoggedin", false);
    sessionStorage.setItem("isFaculty", false);
    sessionStorage.setItem("isHOD", false);
    sessionStorage.setItem("isAdminMain", false);
    sessionStorage.setItem("isAdminDept", false);
    sessionStorage.setItem("isStudent", false);
  },[]);

  function errorLogging(value,role,dept){
       if(value==="Success"){
         sessionStorage.setItem("isLoggedin", true);
         if(role==="1"){
         sessionStorage.setItem("isFaculty", true);
         sessionStorage.setItem("isHOD", true);
         }
         else if(role==="0")
         sessionStorage.setItem("isAdminMain", true);
         else if(role==="3")
         sessionStorage.setItem("isFaculty", true);
         else if (role==="2")
         sessionStorage.setItem("isAdminDept", true);
         else
         sessionStorage.setItem("isStudent", true);
         
         sessionStorage.setItem("Department",dept);
         if(role==="0")
          history.push('/admin-main');
         else if (role==="2")
          history.push('/admin-dpt')
         else
          history.push('/home');
        setError({
          invalidEmail:false,
          invalidPassword:false
        });
       }
       else if(value==="Invalid Password"){
         setError({
          invalidEmail:false,
          invalidPassword:true
        })
      }
       else{
        setError({
          invalidEmail:true,
          invalidPassword:false
        }) 
       }
  }
  
  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-logo">W</div>
        <h1 className="login-signIn">Sign In</h1>
        {error.invalidEmail ?
        <TextField
          error
          name="email"
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>Unregistered email</span>
          }
          onChange={handleChange}
          className="login-email"
          inputProps={{
            min: 0,
            style: { fontFamily: '"Nunito", sans-serif' }
          }}
        />:
        <TextField
          name="email"
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>Email</span>
          }
          onChange={handleChange}
          className="login-email"
          inputProps={{
            min: 0,
            style: { fontFamily: '"Nunito", sans-serif' }
          }}
        />}
        {error.invalidPassword ?
        <TextField
          error
          name="password"
          onChange={handleChange}
          style={{ marginTop: "20px" }}
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>Invalid password</span>
          }
          type="password"
          className="login-password"
          inputProps={{
            min: 0,
            style: { fontFamily: '"Nunito", sans-serif' }
          }}
        />:
        <TextField
          name="password"
          onChange={handleChange}
          style={{ marginTop: "20px" }}
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>Password</span>
          }
          type="password"
          className="login-password"
          inputProps={{
            min: 0,
            style: { fontFamily: '"Nunito", sans-serif' }
          }}
        />}
        <div style={{ width: "85%", marginLeft: "7.5%", marginTop: "50px" }}>
          <Submit disabled={disabled} credentials={credentials} errorLogging={errorLogging} />
        </div>
        <div
          style={{ marginTop: "20px", fontSize: "14px" }}
          className="login-register"
          onClick={() => {
            history.push("/register");
          }}
        >
          New Here? Register Now.
        </div>
        <div
          style={{ marginTop: "20px", fontSize: "14px" }}
          className="register-login"
          onClick={() => {
            history.push("/register-college");
          }}
        >
          Add new college? Register here.
        </div>
      </div>
    </div>
  );
}
