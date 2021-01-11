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

  function errorLogging(value,role){
       if(value==="Success"){
        if(role==="ADMIN")
          history.push('/admin-college');
        else if(role==="ADMIN MAIN")
          history.push('/admin-main');
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
          invalidPassword:true
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
