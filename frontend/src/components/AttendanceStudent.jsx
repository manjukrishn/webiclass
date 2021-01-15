import React from "react";

export default function Attendance(){

  return;
}
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
      { field: 'Subject', headerName: 'Subject', width: 180 },
      { field: 'Status', headerName: 'Status', width: 180 },
      { field: 'Date', headerName: 'Date', width: 180 },
      { field: 'Time', headerName: 'Time', width: 180 }

    ];
    
    const rows = [
      { id: 1,Subject:"Unix", Status: 'Present', Date: '15/05/2021',Time:"10.50"},
      { id: 2,Subject:"ATC", Status: 'Present', Date: '15/05/2021',Time:"10.10" },
      { id: 3,Subject:"ME", Status: 'Present', Date: '15/05/2021',Time:"11.30" },
      { id: 4,Subject:"Python", Status: 'Present', Date: '15/05/2021',Time:"09.50" },
      { id: 5,Subject:"CNS", Status: 'Present' , Date: '15/05/2021',Time:"02.50"},
      { id: 6,Subject:"DBMS", Status: 'Present', Date: '15/05/2021',Time:"08.50" },
      { id: 7,Subject:"OS", Status: 'Present', Date: '15/05/2021',Time:"12.50" },
      { id: 8,Subject:"CNS", Status: 'Present', Date: '15/05/2021',Time:"10.30" },
      { id: 9,Subject:"ATC", Status: 'Present', Date: '15/05/2021',Time:"11.50"}
    ];
    
    

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

   const { onClose, value: valueProp, open, ...other } = props;
   const [value, setValue] = React.useState(valueProp);
   const radioGroupRef = React.useRef(null);
   const [age, setAge] = React.useState('');
 
   const handleChange = (event) => {
     setAge(event.target.value);
   };
 
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
          <FormControl  className={classes.formControl}  style={{marginLeft:"5%"}}>
            <InputLabel id="demo-simple-select-outlined-label">Subject</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={age}
              onChange={handleChange}
              label="Subject"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} style={{marginLeft:"5%"}}>
              <TextField
                id="date"
                label="Date"
                type="date"
                defaultValue={new Date()}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
           </FormControl>
          <FormControl className={classes.formControl} style={{marginLeft:"5%"}}>
            <TextField
               id="time"
               label="Class Time"
               type="time"
               defaultValue="07:30"
               className={classes.textField}
               InputLabelProps={{
                  shrink: true,
               }}
               inputProps={{
                  step: 300, // 5 min
               }}
            />
           </FormControl>
         </DialogTitle>
         
         <DialogContent dividers style={{ backgroundColor: "#f2f2f0" }}>
         <div style={{ height: 400, width: '100%' }}>
             <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
          </div>
         </DialogContent>

         <DialogActions>
           <Button autoFocus onClick={handleCancel} color="primary">
             Cancel
           </Button>
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
