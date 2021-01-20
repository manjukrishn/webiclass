import React from "react";
import PropTypes from "prop-types";
import RemoveIcon from "@material-ui/icons/Remove";
import TextField from "@material-ui/core/TextField";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);
  const getTimeFunc = () => {
    let d = new Date();
    return d.getTime();
  };
  const [invalid,setInvalid]=React.useState({
    invalidEmail:false,
    invalidUid:false,
  })
  const [credentials,setCredentials]=React.useState({
    uid:"",
    name:"",
    email:""
  });
  const handleClickAdd =()=>{
    validate();
    if(credentials.email && credentials.name && credentials.uid && !invalid.invalidEmail && !invalid.invalidUid){
    fetch("/addFaculty", {
      method:"POST",
      cache: "no-cache",
      headers:{
          "content_type":"application/json",
      },
       body:JSON.stringify(credentials)
      }
    ).then(response => {
    return response.json()
   })
   .then(json => {
      console.log(json.status);
      if(json.status=="Success"){
        setInvalid({
           invalidEmail:false,
           invalidUid:false
        })
        setCredentials({
          uid:"",
          name:"",
          email:""
        })

      }
      else if(json.status=="Email already exists"){
        setInvalid({
          invalidEmail:true,
          invalidUid:false
       })
      }
      else{
        setInvalid({
          invalidEmail:false,
          invalidUid:true
       })
      }
        
   })
  }
  }
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

  const finalValidation = () => {
    if(!invalid.invalidEmail && !invalid.invalidUid)
    return false;
    return true;
  };
  const handledone = () => {
    const re = finalValidation();
    if (re === false) onClose(value);
  };

  const validate = () => {
    const mailFormat = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]{2,4})+)*$/;
    const name = "email";
    if (credentials.email.match(mailFormat)) {
      invalid.invalidEmail=false;
    } else {
      invalid.invalidEmail=true;
    }
  };

  const handleChange = (event) => {
   const { name, value } = event.target;
   setCredentials((prev)=>{
     return{
       ...prev,
       [name]:value
     }
   });
   const arr=invalid
   arr.invalidUid=false
   setInvalid(arr);
  };
  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="sm"
        onEntering={handleEntering}
        aria-labelledby="confirmation-dialog-title"
        open={open}
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">
          <span
            style={{ fontFamily: '"Nunito", sans-serif', color: "#272e4f" }}
          >
            Add Professors
          </span>
        </DialogTitle>
        <DialogContent dividers>
            <table>
              <thead style={{ color: "#2c365d" }}>
                <th>Email</th>
                <th style={{ paddingLeft: "20px" }}>Name</th>
                <th style={{ paddingLeft: "20px" }}>Unique Id</th>

              </thead>
              <tbody>
                    <tr>
                      <td style={{ paddingTop: "3%", width: "200px" }}>
                        {!invalid.invalidEmail ? (
                          <TextField
                            name="email"
                            value={credentials.email}
                            variant="outlined"
                            type="email"
                            onChange={handleChange}
                            placeholder="Eg. john@gmail.com"
                          />
                        ) : (
                          <TextField
                            error
                            label="Invalid email"
                            name="email"
                            value={credentials.email}
                            variant="outlined"
                            type="email"
                            onChange={handleChange}
                            placeholder="Eg. john@gmail.com"
                          />
                        )}
                      </td>
                      <td
                        style={{
                          paddingTop: "3%",
                          paddingLeft: "5%",
                          width: "190px"
                        }}
                      >
                        <TextField
                          variant="outlined"
                          onChange={handleChange}
                          name="name"
                          value={credentials.name}
                          placeholder="Eg. john"
                        />
                      </td>
                      <td
                        style={{
                          paddingTop: "3%",
                          paddingLeft: "5%",
                          width: "190px"
                        }}
                      >
                      {!invalid.invalidUid ?
                        <TextField
                          variant="outlined"
                          onChange={handleChange}
                          name="uid"
                          value={credentials.uid}
                          placeholder="Eg. is00ab"
                        />:
                        <TextField
                          error
                          variant="outlined"
                          onChange={handleChange}
                          name="uid"
                          label="UID already exists"
                          value={credentials.uid}
                          placeholder="Eg. is00ab"
                        />
                        }
                      </td>
                    </tr>
              </tbody>
            </table>
          {credentials.email && credentials.uid && credentials.name && <Button
            style={{ marginTop: "5%",
          color:"#949cdf",
          opacity:"0.85"
          }}
            onClick={handleClickAdd}
          >
            + Add New
          </Button>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handledone} color="primary">
            Done
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

export default function ConfirmationDialog() {
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

  return (
    <div className={classes.root}>
      <IconButton onClick={handleClickListItem}>
        <PersonAddIcon
          style={{
            fontSize: "30px",
            marginLeft: "10%",
            color: "#0277bd"
          }}
        />
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
