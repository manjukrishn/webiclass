import React from "react";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import ConfirmationDialog from "./ConfirmationDialog";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [addMaterial,setAddMaterial]=React.useState({
    facultyMailId:null,
    date:null,
    link:null,
    subject:null,
    type:"Notes",
    desc:null,
    secId:null,
    collegeName:null
  })
  React.useEffect(()=>{
    fetch("/getMailId").then(response=>response.json()).then
    (data=>{
      setAddMaterial({facultyMailId:data.mail,date:getDate(),collegeName:data.currentCollege,secId:props.secId,types:"Notes"})
 });
},[]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave=()=>{
    const arr=[];
    fetch("/addMaterial",{
      method:"POST",
      cache:"no-cache",
      headers:{
        "content_type":"application/json",
      },
      body:JSON.stringify({material:addMaterial})
     }).then(response=>response.json()).then(data=>{console.log(data);});
    setOpen(false);
    props.flag(true);
  }
  const getDate = () => {
    var today = new Date();
    return today.toISOString().substr(0, 10);
  };
  const handleChange=(e)=>{
      const {name,value}=e.target;
      setAddMaterial((prev)=>
      {
        return{
          ...prev,
           [name]:value
        };
      });
      console.log(addMaterial);
  }
  function addValue(values){
    setAddMaterial((prev)=>
    {
      return{
        ...prev,
         type:values
      };
    })
  }
  return (
    <div>
      <Tooltip title="Add material">
      <IconButton
        style={{ marginTop: "-20%" }}
        onClick={() => {
          handleClickOpen();
        }}
      >
        <NoteAddIcon
          style={{ fontSize: "30px", color: "#0277bd", opacity: "0.8" }}
        />
      </IconButton>
      </Tooltip>
      
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h6"
              className={classes.title}
              style={{ fontFamily: '"Nunito", sans-serif' }}
            >
              Add Material
            </Typography>

            <Button autoFocus color="inherit" onClick={handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <ListItemText primary="Faculty" secondary={addMaterial.facultyMailId} />
          </ListItem>
          <Divider />
          <ListItem>
          <ListItemText
              primary="Link for the material"
              secondary={
                <InputBase
                  style={{ width: "100%" }}
                  name="link"
                  multilined
                  value={addMaterial.link}
                  placeholder="Paste your link here"
                  onChange={handleChange}
                />
              }
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Subject"
              secondary={
                <InputBase
                  name="subject"
                  style={{ width: "100%" }}
                  placeholder="Associated Subject"
                  onChange={handleChange}
                  value={addMaterial.subject}
                />
              }
            />
          </ListItem>
          <Divider />
          <ConfirmationDialog addValues={addValue}/>
          <ListItem>
            <ListItemText
              name="date"
              primary="Date"
              secondary={<InputBase type="date" defaultValue={getDate()} />}
              onChange={handleChange}
              value={addMaterial.date}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Description"
              secondary={
                <InputBase
                  style={{ width: "100%" }}
                  multilined
                  name="desc"
                  placeholder="Short Description of the material"
                  onChange={handleChange}
                  value={addMaterial.desc}
                />
              }
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
