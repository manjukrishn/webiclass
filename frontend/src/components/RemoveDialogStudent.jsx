import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RemoveIcon from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";
export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseNo = () => {
    props.response(false, props.uid);
    setOpen(false);
  };

  const handleCloseYes = () => {
    props.response(true, props.uid);
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <RemoveIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remove Professor ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Changes made cannot be retrived. Clicking 'Yes' will remove
            student of USN - {props.uid} .Are you sure you wanna proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNo} color="primary">
            No
          </Button>
          <Button onClick={handleCloseYes} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

