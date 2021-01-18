import React from "react";
import "./AdminMain.css";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import Submit from "./SubmitAdminMain";
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button"
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import RemoveStudent from "./RemoveStudent";

export default function AdminMain() {
  const history = useHistory();

  const [department, setDepartment] = React.useState('');

  const handleChangeList = (event) => {
    setDepartment(event.target.value);
  };
  const [credentials, setCredentials] = React.useState({
    studentemail: "",
    studentname:"",
    studentdept:"",
    studentusn:"",
    section:""
  });
  const [disabled, setDisabled] = React.useState(true);
  const [error,setError]=React.useState({invalidEmail:false});
  const [dept,setDept]=React.useState([]);

  React.useEffect(()=>{
    fetch('/getDepartmentListAdminMain').then(res=>{
      return res.json()
   }).then(json=>{
     setDept(json.dept);
   })
  },[]);
  
  React.useEffect(() => {
    const res = () => {
      const mailFormat = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]{2,4})+)*$/;
      if (credentials.studentemail.match(mailFormat))
        return false;
      return true;
    };
    const fans = res();
    setDisabled(true);
    if(credentials.hodname && credentials.dept && credentials.hodemail && !fans)
    setDisabled(false);
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
    <div className="admin-main-body">
      <div className="admin-main-container" style={{marginTop:"2%"}}>
        <div className="admin-main-logo">W</div>
        <h1 className="admin-main-signUp">Add Student</h1>
        <RemoveStudent/>
        {error.invalidEmail ?
           <TextField
            error
             name="studentemail"
             value={credentials.studentemail}
             label={
               <span style={{ fontFamily: '"Nunito", sans-serif' }}>Student already present</span>
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
          name="studentemail"
          value={credentials.studentemail}
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>Student USN</span>
          }
          onChange={handleChange}
          className="register-email"
          inputProps={{
            min: 0,
            style: { fontFamily: '"Nunito", sans-serif' }
          }}
        />}

         <TextField
          name="studentname"
          value={credentials.studentname}
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>Student Name</span>
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
          name="studentusn"
          value={credentials.studentusn}
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>Student Email</span>
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
          name="section"
          value={credentials.section}
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>Student Section</span>
          }
          onChange={handleChange}
          className="register-password"
          style={{marginTop:"20px"}}
          inputProps={{
            min: 0,
            style: { fontFamily: '"Nunito", sans-serif' }
          }}
        />
        <div style={{ width: "85%", marginLeft: "7.5%", marginTop: "40px" }}>
          <Submit disabled={disabled} credentials={credentials}  errorLogging={errorLogging}/>
        </div>
        <div
          onClick={() => {
            history.push("/admin-dpt-assign");
          }}
          className="admin-main-go-home"
          style={{ marginTop: "20px",cursor:"pointer" }}
        >
          Assign Subjects
        </div>
      </div>
    </div>
  );
}

