import React from "react";
import Submit from "./SubmitRegister";
import "./Regsiter.css";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
export default function Register() {
  const history = useHistory();
  const [credentials, setCredentials] = React.useState({
    email: "",
    college:"",
    password: "",
    confirmPassword: ""
  });
  const [disabled, setDisabled] = React.useState(true);
  const [error,setError]=React.useState({invalidEmail:false});
  const [invalidPassword,setInvalidPassword]=React.useState(false);

  React.useEffect(() => {
    const res = () => {
      const mailFormat = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]{2,4})+)*$/;
      if (
        credentials.email.match(mailFormat) &&
        credentials.password.length > 1 &&
        credentials.confirmPassword.length === credentials.password.length
      )
        return false;
      return true;
    };
    const fans = res();
    setDisabled(fans);
    if(credentials.password.length === credentials.confirmPassword.length  && credentials.confirmPassword !== credentials.password){
      setInvalidPassword(true);
    }
    else{
      setInvalidPassword(false);
    }
  }, [credentials]);
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
         invalidEmail:false
       });
     
     history.push('/login');
    }
    else if(value==="Email Already exist"){
       setError({
         invalidEmail:true
       })
    }
  }

  return (
    <div className="register-body">
      <div className="register-container">
        <div className="register-logo">W</div>
        <h1 className="register-signUp">Sign Up</h1>
        {error.invalidEmail ?
           <TextField
            error
             name="email"
             value={credentials.email}
             label={
               <span style={{ fontFamily: '"Nunito", sans-serif' }}>Email already registered</span>
             }
             onChange={handleChange}
             className="register-email"
             inputProps={{
               min: 0,
               style: { fontFamily: '"Nunito", sans-serif' }
             }}
        />
        :
        <TextField
          name="email"
          value={credentials.email}
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>Email</span>
          }
          onChange={handleChange}
          className="register-email"
          inputProps={{
            min: 0,
            style: { fontFamily: '"Nunito", sans-serif' }
          }}
        />}
        <TextField
          name="college"
          value={credentials.college}
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>College Name</span>
          }
          onChange={handleChange}
          className="register-password"
          style={{marginTop:"20px"}}
          inputProps={{
            min: 0,
            style: { fontFamily: '"Nunito", sans-serif' }
          }}
        />
        <TextField
          name="password"
          value={credentials.password}
          onChange={handleChange}
          style={{ marginTop: "20px" }}
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>Password</span>
          }
          type="password"
          className="register-password"
          inputProps={{
            min: 0,
            style: { fontFamily: '"Nunito", sans-serif' }
          }}
        />
        { invalidPassword ?
        <TextField
          error
          name="confirmPassword"
          value={credentials.confirmPassword}
          onChange={handleChange}
          style={{ marginTop: "20px" }}
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>
              Passwords don't match
            </span>
          }
          type="password"
          className="register-password"
          inputProps={{
            min: 0,
            style: { fontFamily: '"Nunito", sans-serif' }
          }}
        />
        :
        <TextField
          name="confirmPassword"
          value={credentials.confirmPassword}
          onChange={handleChange}
          style={{ marginTop: "20px" }}
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>
              Confirm password
            </span>
          }
          type="password"
          className="register-password"
          inputProps={{
            min: 0,
            style: { fontFamily: '"Nunito", sans-serif' }
          }}
        />}
        <div style={{ width: "85%", marginLeft: "7.5%", marginTop: "40px" }}>
          <Submit disabled={disabled} credentials={credentials}  errorLogging={errorLogging}/>
        </div>
        <div
          style={{ marginTop: "35px", fontSize: "14px", cursor: "pointer" }}
          className="register-login"
          onClick={() => {
            history.push("/login");
          }}
        >
          Already a member? Click here.
        </div>
        <div
          style={{ marginTop: "20px", fontSize: "14px", cursor: "pointer" }}
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
