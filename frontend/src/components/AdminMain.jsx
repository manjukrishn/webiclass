import React from "react";
import "./AdminMain.css";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Submit from "./SubmitAdminMain";

export default function AdminMain() {
  const history = useHistory();
  const [credentials, setCredentials] = React.useState({
    hodemail: "",
    hodname:"",
    dept:"",
    hoduid:""

  });
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: "85%",
      marginTop:"8%"
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const [disabled, setDisabled] = React.useState(true);
  const [error,setError]=React.useState({invalidEmail:false});
  const [dept,setDept]=React.useState([]);
  React.useEffect(() => {
    const res = () => {
      const mailFormat = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]{2,4})+)*$/;
      if (credentials.hodemail.match(mailFormat))
        return false;
      return true;
    };
    const fans = res();
    setDisabled(true);
    if(credentials.hodname && credentials.dept && credentials.hodemail && !fans)
    setDisabled(false);
  }, [credentials]);
  
  React.useEffect(()=>{
    fetch('/getDepartmentListAdminMain').then(res=>{
      return res.json()
   }).then(json=>{
     setDept(json.dept);
   })
  },[]);

  function handleChange(e) {
    const { name, value } = e.target;
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
       alert("HOD Successfully added")
    }
    else if(value==="Email Already exists"){
       setError({
         invalidEmail:true
       })
    }
  }

  const [department, setDepartment] = React.useState('');

  const handleChangeList = (event) => {
    setDepartment(event.target.value);
  };

  return (
    <div className="admin-main-body">
      <div className="admin-main-container" style={{marginTop:"2%"}}>
        <div className="admin-main-logo">W</div>
        <h1 className="admin-main-signUp">Add HOD</h1>
        {error.invalidEmail ?
           <TextField
            error
             name="hodemail"
             value={credentials.hodemail}
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
          name="hodemail"
          value={credentials.hodemail}
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>HOD Email</span>
          }
          onChange={handleChange}
          className="register-email"
          inputProps={{
            min: 0,
            style: { fontFamily: '"Nunito", sans-serif' }
          }}
        />}

         <TextField
          name="hodname"
          value={credentials.hodname}
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>HOD Name</span>
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
          name="hoduid"
          value={credentials.hoduid}
          label={
            <span style={{ fontFamily: '"Nunito", sans-serif' }}>HOD </span>
          }
          onChange={handleChange}
          className="register-password"
          style={{marginTop:"20px"}}
          inputProps={{
            min: 0,
            style: { fontFamily: '"Nunito", sans-serif' }
          }}
        /> 
        {!!dept.length &&
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Department</InputLabel>
         <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={department}
          onChange={handleChangeList}
        >
          {dept.map((item,index)=>{
            return(
              <MenuItem value={10}>Ten</MenuItem>
            )
          })}
        </Select>
      </FormControl>}
        
        <div style={{ width: "85%", marginLeft: "7.5%", marginTop: "40px" }}>
          <Submit disabled={disabled} credentials={credentials}  errorLogging={errorLogging}/>
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
