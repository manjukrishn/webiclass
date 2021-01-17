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
  const [arr, setArr] = React.useState([]);
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

  const finalValidation = () => {
    let i = 0;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].invalid) return true;
    }
    return false;
  };
  const handleOk = () => {
    const re = finalValidation();
    if (re === false) onClose(value);
  };

  const validate = (index) => {
    const mailFormat = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]{2,4})+)*$/;
    const name = "prof_email";
    if (arr[index][name].match(mailFormat)) {
      arr[index].invalid = false;
    } else {
      arr[index].invalid = true;
    }
  };
  const handleChange = (index) => (event) => {
    const newArr = [...arr];
    const { name, value } = event.target;
    newArr[index][name] = value;
    setArr(newArr);
    validate(index);
  };
  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
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
          {!!arr.length && (
            <table style={{ marginRight: "-4%" }}>
              <thead style={{ color: "#2c365d" }}>
                <th>Email</th>
                <th style={{ paddingLeft: "20px" }}>Name(Optional)</th>
          
              </thead>
              <tbody>
                {arr.map((item, index) => {
                  return (
                    <tr>
                      <td style={{ paddingTop: "3%", width: "200px" }}>
                        {!item.invalid ? (
                          <TextField
                            name="prof_email"
                            id={item.index}
                            value={item.prof_email}
                            variant="outlined"
                            type="email"
                            onChange={handleChange(index)}
                            placeholder="Eg. john@gmail.com"
                          />
                        ) : (
                          <TextField
                            error
                            label="Invalid email"
                            name="prof_email"
                            id={item.index}
                            value={item.prof_email}
                            variant="outlined"
                            type="email"
                            onChange={handleChange(index)}
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
                          id={item.index}
                          onChange={handleChange(index)}
                          name="prof_name"
                          value={item.prof_name}
                          placeholder="Eg. john"
                        />
                      </td>
                      {!!(arr.length > 1) && (
                        <td style={{ paddingTop: "3%", width: "5px" }}>
                          <IconButton
                            onClick={() => {
                              setArr(
                                arr.filter((itemIn) => itemIn.id !== item.id)
                              );
                            }}
                          >
                            <RemoveIcon />
                          </IconButton>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <Button
            style={{ marginTop: "5%",
          color:"#949cdf",
          opacity:"0.85"
          }}
            onClick={() => {
              setArr((prev) => {
                return [
                  ...prev,
                  {
                    id: getTimeFunc(),
                    index: getTimeFunc(),
                    prof_email: "",
                    prof_name: "",
                    invalid: false
                  }
                ];
              });
            }}
          >
            + Add New
          </Button>
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

