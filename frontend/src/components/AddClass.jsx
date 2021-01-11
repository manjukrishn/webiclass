import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
          Add Class
        </span>
      </DialogTitle>
      <DialogContent dividers>
        <div style={{ marginBottom: "15px", fontSize: "18px" }}>Section</div>
        <TextField
          variant="outlined"
          inputProps={{
            min: 0,
            style: { fontSize: "100px", textAlign: "center" }
          }}
        />
        <table>
          <tr>
            <td>
              <div
                style={{
                  marginBottom: "10px",
                  fontSize: "18px",
                  marginTop: "30px",
                  color: "#2c365d"
                }}
              >
                No of students
              </div>
            </td>
            <td style={{ paddingLeft: "15px", paddingTop: "20px" }}>
              <TextField
                style={{ width: "60px" }}
                inputProps={{
                  min: 0,
                  color: "black"
                }}
              />
            </td>
          </tr>
        </table>

        <table>
          <tr>
            <td>
              <div
                style={{
                  marginBottom: "10px",
                  fontSize: "18px",
                  marginTop: "30px",
                  color: "#2c365d"
                }}
              >
                No of subjects
              </div>
            </td>
            <td style={{ paddingLeft: "20px", paddingTop: "20px" }}>
              <TextField
                style={{ width: "60px" }}
                inputProps={{
                  min: 0,
                  color: "black"
                }}
              />
            </td>
          </tr>
        </table>
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
    height: 500
  }
}));

export default function ConfirmationDialog() {
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

  return (
    <div className={classes.root}>
      <List component="div" role="list">
        <Tooltip title="Add class">
          <IconButton>
            <AddCircleIcon
              style={{
                fontSize: "30px",
                color: "#0277bd",
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
        />
      </List>
    </div>
  );
}
