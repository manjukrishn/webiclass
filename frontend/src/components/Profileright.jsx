import React from "react";
import Table from "./DescTable";
import RemoveProf from "./RemoveProf";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddProfessor from "./AddProfessors";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Attendance from "./Attendance";
import {isHod,isAdminDept, isFaculty} from "./Util";

export default function Profileright(props) {
  const [disabled,setDisabled]=React.useState(true);
  const [invalid,setInvalid]=React.useState(false);
  
  const DarkerDisabledTextField = withStyles({
    root: {
      marginRight: 8,
      "& .MuiInputBase-root.Mui-disabled": {
        color: "black"
      }
    }
  })(TextField);
  
  // const [values,setValues]=React.useState({
  //   name:props.details.name.charAt(0).toUpperCase()+props.details.name.slice(1).toLowerCase(),
  //   newEmail:props.details.email,
  //   prevEmail:props.details.email
  // })

  const [values,setValues]=React.useState({
    name:"",
    newEmail:"",
    prevEmail:""
  })

  const validate = (email) => {
    const mailFormat = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]{2,4})+)*$/;
    if(email.match(mailFormat)){
      return false;
    }
    return true;
  };
  function setFlag(e){
    props.setFlag(e);
  }

  function handleChange(e){  
    const {name,value}=e.target;
    setValues((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }
  
  function handleClickUpdate(){
     setInvalid(validate(values.newEmail));
     setDisabled(true);
     if(!invalid){
      fetch("/updateProfile", {
        method:"POST",
        cache: "no-cache",
        headers:{
            "content_type":"application/json",
        },
         body:JSON.stringify(values)
        }
      ).then(response => {
      return response.json()
     })
     .then(json => {
        console.log(json.status);  
     })
     }
  }

  function handleClickCancel(){
    setValues({
      name:props.details.name.charAt(0).toUpperCase()+props.details.name.slice(1).toLowerCase(),
      newEmail:props.details.email,
      prevEmail:props.details.email    
    })
    setDisabled(true);
  }
  return (
    <div
      style={{
        width: "calc(100vw - 275px)",
        position: "fixed",
        height: "100vh",
        overflow: "hidden"
      }}
    >
      <table
        style={{
          padding: "15px 15px 0px 15px",
          width: "calc(100vw - 275px)"
        }}
      >
        <col style={{ width: "60%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "15%" }} />
        <tr>
          <td></td>
          {isHod() && <td style={{ textAlign: "right" }}>
            <AddProfessor />
          </td>}
          {isHod() && <td style={{ textAlign: "center" }}>
            <RemoveProf/>
          </td>}
          {isFaculty() && <td style={{ textAlign: "left" }}>
            <Attendance/>
          </td>}
        </tr>
      </table>
      <table style={{ marginTop: "2%", marginLeft: "5%" }}>
        <colgroup>
          <col style={{ width: "25%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "25%" }} />
        </colgroup>
        <tr>
          <td style={{ textAlign: "left"  }}>
            {disabled ?
            <DarkerDisabledTextField
              disabled={true}              
              id="outlined-basic"
              label="Name"
              name="name"
              value={values.name}
              variant="outlined"
              style={{ width: "200px" }}
              onClick={()=>{setDisabled(false)}}
            />:
            <TextField
              id="outlined-basic"
              label="Name"
              name="name"
              value={values.name}
              variant="outlined"
              onChange={handleChange}
              style={{ width: "200px" }}
            />}
          </td>
          <td>
            <DarkerDisabledTextField
              disabled={true}
              id="outlined-basic"
              label="Department"
              value={props.details.dept}
              variant="outlined"
              name="dept"
              onChange={handleChange}
              style={{ width: "200px" }}
              onClick={()=>{setDisabled(false)}}
            />
          </td>
          <td>
          {  disabled ? 
            <DarkerDisabledTextField
              disabled={true}
              id="outlined-basic"
              label="Email"
              name="newEmail"
              value={values.newEmail}
              variant="outlined"
              style={{ width: "200px" }}
              onClick={()=>{setDisabled(false)}}
            />
            :
            !invalid ?
            <TextField
              id="outlined-basic"
              label="Email"
              name="newEmail"
              value={values.newEmail}
              variant="outlined"
              style={{ width: "200px" }}
              onChange={handleChange}

            />:
            <TextField
              error
              id="outlined-basic"
              label="Invalid email"
              name="newEmail"
              value={values.newEmail}
              variant="outlined"
              style={{ width: "200px" }}
              onChange={handleChange}
            />
            }
          </td>
        </tr>
        {!disabled && 
        <tr>
        <td></td>
        <td></td>
        <td>
           <div style={{marginTop:"5%"}}>
              <Button variant="contained" color="primary" style={{borderRadius:"25px"}} onClick={handleClickUpdate}>Update</Button>
              <Button onClick={handleClickCancel} >Cancel</Button>
           </div>          
        </td>
        </tr>}
      </table>
      <div
        style={{
          marginLeft: "-5.5%",
          zIndex: "1",
          marginTop: "3%",
          marginBottom: "50px"
        }}
      >
        <Table caption="Materials Added" type="profile" contents={props.materials} setFlag={setFlag}/>
      </div>
    </div>
  );
}
