import React from "react";
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
import RemoveDialog from "./RemoveDialog";
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
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);
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
    fetch('/getFacultyList').then(res=>{return res.json()}).then(json=>{
      console.log("afkdfnsdnfk")
      console.log(json.faculty);
      const arr1=[];
      json.faculty.map((item,index)=>{
        arr1.push({
          prof_email:item[2],
          prof_name:item[1],
          prof_uid:item[0]
        })
      })
      setArr(arr1);
    })
  },[])
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
    if (response==true) {
      fetch("/deleteFaculty", {
        method:"POST",
        cache: "no-cache",
        headers:{
            "content_type":"application/json",
        },
         body:JSON.stringify(uid)
        }
      ).then(response => {
      return response.json()
     })
     .then(json => {
        console.log(json.status);      
     });
      setArr(arr.filter((item) => item.prof_uid !== uid));
    }
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
        <DialogTitle style={{ backgroundColor: "#f2f2f0" }}>
          <span
            style={{ fontFamily: '"Nunito", sans-serif', color: "#272e4f" }}
          >
            Remove Professors
          </span>
        </DialogTitle>
        <DialogContent dividers style={{ backgroundColor: "#f2f2f0" }}>
          {!!arr.length ? (
            <table style={{ marginRight: "-4%" }}>
              <thead style={{ color: "#2c365d" }}>
                <th>UID</th> 
                <th>Name</th>
                <th>Email</th>
              </thead>
              <tbody>
                {arr.map((item, index) => {
                  return (
                    <tr>
                    <td style={{ paddingTop: "3%", width: "150px" }}>
                        <DarkerDisabledTextField
                          disabled
                          multiline
                          inputProps={{min: 0, style: { textAlign: 'center' }}}
                          value={item.prof_uid}
                          variant="outlined"
                        />
                      </td>
                      <td style={{ paddingTop: "3%", width: "150px" }}>
                        <DarkerDisabledTextField
                          disabled
                          multiline
                          inputProps={{min: 0, style: { textAlign: 'center' }}}
                          value={item.prof_name}
                          variant="outlined"
                        />
                      </td>
                      <td
                        style={{
                          paddingTop: "3%",
                          paddingLeft: "3%",
                          width: "200px"
                        }}
                      >
                        <DarkerDisabledTextField
                          disabled
                          multiline
                          variant="outlined"
                          inputProps={{min: 0, style: { textAlign: 'center' }}}
                          value={item.prof_email}
                        />
                      </td>

                      {!!(arr.length > 1) && (
                        <td style={{ paddingTop: "3%", width: "5px" }}>
                          <RemoveDialog
                            response={toBeRecieved}
                            uid={item.prof_uid}
                          />
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div style={{ fontSize: "18px" }}>No one to remove</div>
          )}
        </DialogContent>
        <DialogActions> 
         <Button onClick={handleOk} color="primary">
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
        <RemoveCircleIcon
          style={{
            fontSize: "25px",
            marginLeft: "10%",
            color: "#cd5d7d"
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
