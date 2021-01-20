import React from "react";
import "./AdminMain.css";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import Submit from "./SubmitAdminDeptAssign";
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
  const [sectionId,setSectionId]=React.useState('');
  const [faculty,setFaculty]=React.useState('');
  const [facultyId,setFacultyId]=React.useState('');
  const [subject,setSubject]=React.useState('');
  const [subjectcode,setSubjectCode]=React.useState('');
  const [facultyArr,setfacultyArr]=React.useState([]);
  const [sectionArr,setsectionArr]=React.useState([]);
  const [subjectArr,setsubjectArr]=React.useState([]);
  
  const errorLog=(v)=>{
    console.log(v);
    setSectionId('');
    setFaculty('');
    setFacultyId('');
    setSubjectCode('');
    setSubject('');
    setSection('');
  }
  React.useEffect(()=>{
    fetch('/getSectionListAdminDept').then(res=>{
      return res.json()
   }).then(json=>{
     const arr=[];
     json.section.map((item,index)=>{
          arr.push({
            sectionid:item[0],
            sectionname:item[1]
          })
     })
     setsectionArr(arr);
   })
  },[]);

  React.useEffect(()=>{
    const ar={
      sectionid:sectionId,
      subjectcode:subjectcode
    }
    fetch('/getFacultyListAdminDept', {
      method:"POST",
      cache: "no-cache",
      headers:{
          "content_type":"application/json",
      },
       body:JSON.stringify(ar)
      }).then(res=>{
      return res.json()
   }).then(json=>{
        const arr=[];
        json.faculty.map((item,index)=>{
        arr.push({
           facultyid:item[1],
           facultyname:item[0]
         })
    })
     setfacultyArr(arr);
   })
  },[subjectcode,sectionId]);

  React.useEffect(()=>{
    fetch('/getSubjectListAdminDept', {
      method:"POST",
      cache: "no-cache",
      headers:{
          "content_type":"application/json",
      },
       body:JSON.stringify(sectionId)
      }).then(res=>{
      return res.json()
   }).then(json=>{
    const arr=[];
    json.section.map((item,index)=>{
         arr.push({
           subjectid:item[1],
           subjectname:item[0]
         })
    })
     setsubjectArr(arr);
   })
  },[sectionId]);
  
  React.useEffect(()=>{
    if(sectionId && subjectcode && facultyId){
      setDisabled(false);
    }
    else{
      setDisabled(true);
    }
  },[sectionId,subjectcode,facultyId])
  
  const [disabled, setDisabled] = React.useState(true);
  const handleChangeSection = (event) => {
    setSection(event.target.value);
    sectionArr.map((item,index)=>{
      if(item.sectionname==event.target.value){
        setSectionId(item.sectionid);
      }
    })
  };

  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
    subjectArr.map((item,index)=>{
      if(item.subjectname==event.target.value){
        setSubjectCode(item.subjectid);
      }
    })
  };

  const handleChangeFaculty = (event) => {
    setFaculty(event.target.value);
    facultyArr.map((item,index)=>{
      if(item.facultyname==event.target.value){
        setFacultyId(item.facultyid)
      }
    })
    
  };
 
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
          <MenuItem value={item.sectionname}>{item.sectionname}</MenuItem>
          )
        })}
        </Select>
      </FormControl>
      {!!sectionId &&
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
          <MenuItem value={item.subjectname}>{item.subjectname}</MenuItem>
          )
        })}
        </Select>
      </FormControl>}
      {!!sectionId && !!subjectcode && 
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Faculty</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={faculty.facultyname}
          onChange={handleChangeFaculty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {facultyArr.map((item,index)=>{
           return(
          <MenuItem value={item.facultyname}>{item.facultyname}</MenuItem>
          )
         })}
        </Select>
      </FormControl>}        
        <div style={{ width: "85%", marginLeft: "7.5%", marginTop: "40px" }}>
          <Submit disabled={disabled} credentials={{section:sectionId,subject:subjectcode,faculty:facultyId}} errorLog={errorLog}/>
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

