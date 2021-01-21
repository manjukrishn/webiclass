import React from "react";
import AssignmentIcon from '@material-ui/icons/Assignment';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { DataGrid } from '@material-ui/data-grid';
import Select from '@material-ui/core/Select';

function ConfirmationDialogRaw(props) {
   const DarkerDisabledTextField = withStyles({
     root: {
       marginRight: 8,
       "& .MuiInputBase-root.Mui-disabled": {
         color: "#c70039",
         opacity:"0.7",
         fontFamily: '"Nunito", sans-serif'
       }
     }
   })(TextField);

   const columns = [
      { field: 'id', headerName: 'ID', width: 150 },
      { field: 'USN', headerName: 'USN', width: 280 },
      { field: 'Name', headerName: 'Name', width: 180 }
    ];
    
    const [rows,setRows] =React.useState ([
      { id: 1,USN:"4SF18IS001", Name: 'Afeel'},
      { id: 4,USN:"4SF18IS025", Name: 'Dharshan' },
      { id: 2,USN:"4SF18IS051", Name: 'Manjukrishna' },
      { id: 3,USN:"4SF18IS053", Name: 'Mayur' }
    ]);
    
  const handleDateChange=(e)=>{
    setDate(e.target.value)
  }
  const handleTimeChange=(e)=>{
    setTime(e.target.value)
  }
 const useStyles = makeStyles((theme) => ({
   formControl: {
     margin: theme.spacing(1),
     minWidth: 100,
   },
   selectEmpty: {
     marginTop: theme.spacing(2),
   },
 }));
   const classes = useStyles();
   const [sectionArr,setsectionArr]=React.useState([]);
   const [subjectArr,setsubjectArr]=React.useState([]);
   const [time,setTime]=React.useState('7.30');
   const [date,setDate]=React.useState('');
   const { onClose, value: valueProp, open, ...other } = props;
   const [value, setValue] = React.useState(valueProp);
   const radioGroupRef = React.useRef(null);
   const [section,setSection]=React.useState('');
   const [sectionId,setSectionId]=React.useState('');
   const [subject,setSubject]=React.useState('');
   const [subid,setSubjectId]=React.useState();
   const [dateArr,setDateArr]=React.useState([]);
   const [timeArr, setTimeArr]=React.useState([]);
 
   const [arr, setArr] = React.useState([
     {
       prof_email: "abcdefffewefwef@gmail.com",
       prof_name: "abcdaadsadsds",
       prof_uid: "1b12323"
     },
     {
       prof_email: "xyz@gmail.com",
       prof_name: "xyz",
       prof_uid: "1b2432"
     },
     {
       prof_email: "lmn@gmail.com",
       prof_name: "lmn",
       prof_uid: "1b3432"
     },
     {
       prof_email: "pqr@gmail.com",
       prof_name: "pqr",
       prof_uid: "1b1232"
     }
   ]);
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

  const handleSelect=(newSelection)=>{
    console.log(newSelection)
    let ar={}
    if(newSelection.isSelected){
       ar={
        ...newSelection.data,
        date:date,
        section:sectionId,
        subject:subject,
        status:"1",
        time:time
      }
    }
    else{
       ar={
        ...newSelection.data,
        date:date,
        section:sectionId,
        subject:subject,
        status:"0"
      }
    }
    fetch("/attendance", {
     method:"POST",
     cache: "no-cache",
     headers:{
         "content_type":"application/json",
     },
      body:JSON.stringify(ar)
     }
     ).then(response => {
        return response.json()
     })
    .then(json => {  
      console.log(json) 
     })
  }

  React.useEffect(()=>{
    fetch("/getSubjectList", {
      method:"POST",
      cache: "no-cache",
      headers:{
          "content_type":"application/json",
      },
       body:JSON.stringify(sectionId)
      }
    ).then(res=>{
      return res.json()
   }).then(json=>{
     const arr=[];
     json.subject.map((item,index)=>{
          arr.push({
            subjectcode:item[0]
          })
     })
     setsubjectArr(arr);
   })
  },[section]);

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
        if(item[0]===event.target.value){
          setSubjectId(item[1]);
          console.log(item[1]);
          return null;
        }
      })
  };
  React.useEffect(()=>{
    const wrapper={
      section:sectionId,
      subject:subject
    }
    fetch("/getDate", {
      method:"POST",
      cache: "no-cache",
      headers:{
          "content_type":"application/json",
      },
       body:JSON.stringify(wrapper)
      }
    ).then(response => {
    return response.json()
   })
   .then(json => {  
      const arr=[];
      console.log(json.date);
      json.date.map((item,index)=>{
          arr.push({
            date:item[0]
          })
      })
      console.log(arr);
      setDateArr(arr);
   })
  },[sectionId,subject])

  React.useEffect(()=>{
    const wrapper={
      section:sectionId,
      subject:subject,
      date:date
    }
    fetch("/getTime", {
      method:"POST",
      cache: "no-cache",
      headers:{
          "content_type":"application/json",
      },
       body:JSON.stringify(wrapper)
      }
    ).then(response => {
    return response.json()
   })
   .then(json => {  
      const arr=[];
      console.log(json.time);
      json.date.map((item,index)=>{
          arr.push({
            time:item[0]
          })
      })
      console.log(arr);
      setTimeArr(arr);
   })
  },[sectionId,subject,date])
   React.useEffect(()=>{
     const cred={
       section:section,
       subject:subject,
       time:time,
       date:date
     }
     fetch("/getStudentList", {
       method:"POST",
       cache: "no-cache",
       headers:{
           "content_type":"application/json",
       },
        body:JSON.stringify(sectionId)
       }
     ).then(response => {
     return response.json()
    })
    .then(json => {  
       console.log(json.studentList);
       const arr=[];
       json.studentList.map((item,index)=>{
           arr.push({
             id:index+1,
             USN:item[0],
             Name:item[1]
           })
       })
       setRows(arr);
    })
   },[sectionId]);
   
   React.useEffect(() => {
     if (!open) {
       setValue(valueProp);
     }
   }, [valueProp, open]);
 
   const handleEntering = () => {
     if (radioGroupRef.current != null) {
       radioGroupRef.current.focus();
     }
   };
 
   const handleCancel = () => {
     onClose();
   };
 
   const handleOk = () => {
     onClose(value);
   };
 
   const toBeRecieved = (response, uid) => {
     if (response) {
       setArr(arr.filter((item) => item.prof_uid !== uid));
     }
   };
   return (
     <div>
       <Dialog
         disableBackdropClick
         disableEscapeKeyDown
         maxWidth="md"
         onEntering={handleEntering}
         aria-labelledby="confirmation-dialog-title"
         open={open}
         {...other}
       >
         <DialogTitle style={{ backgroundColor: "#f2f2f0" }}>
           <span
             style={{ fontFamily: '"Nunito", sans-serif', color: "#272e4f",position:"absolute",marginTop:"20px" }}
           >
             Attendance
           </span>
           <FormControl variant="filled" className={classes.formControl} style={{marginLeft:"150px"}}>
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
          <MenuItem value={item.subjectcode}>{item.subjectcode}</MenuItem>
          )
        })}
        </Select>
      </FormControl>}

      {!!sectionId &&
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Date</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={date}
          onChange={handleDateChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {dateArr.map((item,index)=>{
          return(
          <MenuItem value={item.date}>{item.date}</MenuItem>
          )
        })}
        </Select>
      </FormControl>}
      {!!sectionId &&
       <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="demo-simple-select-filled-label">Time</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={time}
            onChange={handleTimeChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {timeArr.map((item,index)=>{
            return(
            <MenuItem value={item.time}>{item.time}</MenuItem>
             )
             })}
           </Select>
        </FormControl>}
      </DialogTitle>
         
         <DialogContent dividers style={{ backgroundColor: "#f2f2f0" }}>
         <div style={{ height: 400, width: '100%' }}>
             <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection 
             onRowSelected={handleSelect}
         />
          </div>
         </DialogContent>

         <DialogActions>
           <Button onClick={handleOk} color="primary">
             Ok
           </Button>
         </DialogActions>

       </Dialog>
     </div>
   );
 }
 
 ConfirmationDialogRaw.propTypes = {
   onClose: PropTypes.func.isRequired,
   open: PropTypes.bool.isRequired,
   value: PropTypes.string.isRequired
 };
 
 const useStyles = makeStyles((theme) => ({
   root: {
     width: "100%"
   },
   paper: {
     width: "80%",
     maxHeight: 435
   }
 }));
 
export default function Attendance(){
   const classes = useStyles();
   const [open, setOpen] = React.useState(false);
   const [value, setValue] = React.useState("Notes");
 
   const handleClickListItem = () => {
     setOpen(true);
   };
 
   const handleClose = (newValue) => {
     setOpen(false);
 
     if (newValue) {
       setValue(newValue);
     }
   };
 
   return(
      <div className={classes.root}>
      <IconButton onClick={handleClickListItem}>
      <AssignmentIcon  style={{
            fontSize: "25px",
            marginLeft: "10%",
            color: "#cd5d7d"
          }}/>
      </IconButton>
      <ConfirmationDialogRaw
        classes={{
          paper: classes.paper
        }}
        id="dialog-box"
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
      />
      </div>
   );
}
