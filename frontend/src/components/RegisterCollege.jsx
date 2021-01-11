import React from "react";
import Submit from "./SubmitRegisterCollege";
import "./Regsiter.css";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
export default function Register() {
  const history = useHistory();
  const str = "admin.webiclass@";
  const [credentials, setCredentials] = React.useState({
    collegeUrl: "",
    admin: ""
  });
  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    const res = () => {
      var urlFormat = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})+/gi;

      if (credentials.collegeUrl.match(urlFormat)) return false;
      return true;
    };
    const fans = res();
    setDisabled(fans);
  }, [credentials]);

  const validate = () => {
    setDisabled(false);
    const name = "admin";
    const removed = credentials.collegeUrl.split("www.").pop();
    const final = removed.replace(/\//g, "");
    setCredentials((prev) => {
      return {
        ...prev,
        [name]: final
      };
    });
  };
  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }
  return (
    <div className="register-body">
      <div className="register-container">
        <div className="register-logo">W</div>
        <h1 className="register-signUp">Register College</h1>
        <TextField
          name="collegeUrl"
          value={credentials.collegeUrl}
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>
              College url
            </span>
          }
          placeholder="Eg. www.abc.com"
          onChange={handleChange}
          className="register-email"
          inputProps={{
            min: 0,
            style: { fontFamily: '"Nunito", sans-serif' }
          }}
        />
        {!!credentials.admin && (
          <TextField
            value={str + credentials.admin}
            label={
              <span style={{ fontFamily: '"Nunito", sans-serif' }}>
                College admin
              </span>
            }
            inputProps={{
              min: 0,
              style: { fontFamily: '"Nunito", sans-serif' }
            }}
            style={{ marginTop: "20px" }}
          />
        )}
        <div style={{ width: "85%", marginLeft: "7.5%", marginTop: "50px" }}>
          <Submit disabled={disabled} validate={validate} />
        </div>
        <div
          style={{ marginTop: "40px", fontSize: "14px", cursor: "pointer" }}
          className="register-login"
          onClick={() => {
            history.push("/login");
          }}
        >
          Click here to login.
        </div>
      </div>
    </div>
  );
}
