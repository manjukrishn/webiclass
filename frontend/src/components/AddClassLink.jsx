import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from '@material-ui/core/MenuItem';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);
  const [handledSubjects,setHandledSubject]=React.useState([]);
  const [subject,setSubject]=React.useState();

  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: "relative"
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1
    },
    margin: {
      margin: theme.spacing(1)
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  const classes = useStyles();  

  const [classLink,setClassLink]=React.useState('');
  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);
  
  console.log(props.section);
  React.useEffect(()=>{
    fetch("/getHandledSubjects",{
      method:"POST",
      cache:"no-cache",
      headers:{
        "content_type":"application/json",
      },
      body:JSON.stringify(props.section)
     }).then(response=>response.json()).then
    (data=>{
       console.log(data.subjects);
      setHandledSubject(data.subjects);
    });
  },[]);

  const handleChangeOption =(e)=>{
    setSubject(e.target.value);
 }

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleOk = () => {
     var current = new Date();
     const wrapper={
       classLink:classLink,
       subcode:subject,
       section:props.section,
       time:current.toLocaleTimeString(),
       date:current.toLocaleDateString()
     }
    fetch("/addClassLink",{
      method:"POST",
      cache:"no-cache",
      headers:{
        "content_type":"application/json",
      },
      body:JSON.stringify(wrapper)
     }).then(response=>response.json()).then
    (data=>{
       console.log(data.status);
    });
    onClose(value);
    setClassLink('');

  };
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSectionChange=(e)=>{
    const {name,value}=e.target;
    setClassLink(value);
  }
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle>
        <span style={{ fontFamily: '"Nunito", sans-serif', color: "#272e4f" }}>
          Add Class Link
        </span>
      </DialogTitle>
      <DialogContent dividers>
        <div style={{ marginBottom: "15px", fontSize: "18px" }}>Class Link</div>
        <TextField
          variant="outlined"
          inputProps={{
            min: 0,
            style: { fontSize: "16px" }
          }}
          style={{width:"100%"}}
          value={classLink}
          name="classLink"
          onChange={handleSectionChange}
        />
        <table>
          <tr>
            <FormControl className={classes.formControl}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subject}
                onChange={handleChangeOption}
              >{
                handledSubjects.map((item,index)=>{
                  return(
                   <MenuItem value={item[0]}>{item[0]}</MenuItem>
                  );
                })
              }
               </Select>
           </FormControl>
          </tr>
        </table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360
  },
  paper: {
    width: "80%",
    height: 300
  }
}));

export default function ConfirmationDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("Dione");

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  const setFlag=()=>{
    props.flag(1);
  }
  return (
    <div className={classes.root}>
      <List component="div" role="list">
        <Tooltip title="Add class">
          <IconButton style={{marginTop:"-20%"}}>
            <AddCircleIcon
              style={{
                fontSize: "30px",
                color: "#adce74",
                opacity: "0.8"
              }}
              onClick={handleClickListItem}
            />
          </IconButton>
        </Tooltip>
        <ConfirmationDialogRaw
          classes={{
            paper: classes.paper
          }}
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
          section={props.section}
          flag={setFlag}
        />
      </List>
    </div>
  );
}

