import React from "react";
import "./AdminMain.css";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import Submit from "./SubmitAdminMain";
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
export default function AdminMain() {
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
  const classes = useStyles();
  const [section,setSection]=React.useState('');
  const [faculty,setFaculty]=React.useState('');
  const [subject,setSubject]=React.useState('');
  const [facultyArr,setfacultyArr]=React.useState([]);
  const [sectionArr,setsectionArr]=React.useState([]);
  const [subjectArr,setsubjectArr]=React.useState([]);
  
  React.useEffect(()=>{
    fetch('/getSectionListDept').then(res=>{
      return res.json()
   }).then(json=>{
     setsectionArr(json.sectionList);
   })
  },[]);

  React.useEffect(()=>{
    fetch('/getFacultyListAdminDept', {
      method:"POST",
      cache: "no-cache",
      headers:{
          "content_type":"application/json",
      },
       body:JSON.stringify(subject)
      }).then(res=>{
      return res.json()
   }).then(json=>{
     setfacultyArr(json.facultyList);
   })
  },[section]);

  React.useEffect(()=>{
    fetch('/getSubjectListAdminDept').then(res=>{
      return res.json()
   }).then(json=>{
     setfacultyArr(json.subjectList);
   })
  },[faculty]);

  const handleChangeSection = (event) => {
    setSection(event.target.value);
  };

  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
  };

  const handleChangeFaculty = (event) => {
    setFaculty(event.target.value);
  };
  const [disabled, setDisabled] = React.useState(true);
  
  React.useState(()=>{
     if(section && faculty && subject)
     setDisabled(false);
     else
     setDisabled(true);
  },[faculty]);


  return (
    <div className="admin-main-body">
      <div className="admin-main-container" style={{marginTop:"2%"}}>
        <div className="admin-main-logo">W</div>
        <h1 className="admin-main-signUp">Assign Subjects</h1>
        <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Section</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={section}
          onChange={handleChangeSection}
        >

          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        {sectionArr.map((item,index)=>{
          return(
          <MenuItem value={item}>{item}</MenuItem>
          )
        })}
        </Select>
      </FormControl>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Subject</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={subject}
          onChange={handleChangeSubject}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {subjectArr.map((item,index)=>{
          return(
          <MenuItem value={item}>{item}</MenuItem>
          )
        })}
        </Select>
      </FormControl><FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Faculty</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={faculty}
          onChange={handleChangeFaculty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {facultyArr.map((item,index)=>{
           return(
          <MenuItem value={item}>{item}</MenuItem>
          )
         })}
        </Select>
      </FormControl>        
        <div style={{ width: "85%", marginLeft: "7.5%", marginTop: "40px" }}>
          <Submit disabled={disabled} credentials={{section:section,subject:subject,faculty:faculty}}/>
        </div>
        <div
          onClick={() => {
            history.push("/admin-main");
          }}
          className="admin-main"
          style={{ marginTop: "20px",cursor:"pointer" }}
        >
          Add Student
        </div>
      </div>
    </div>
  );
}

