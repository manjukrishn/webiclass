import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));


export default function ProfileImage(props){   
   const[validExtension,setValidExtenstion]=React.useState(0);
   const classes = useStyles();
   let img="";
   if(props.src)
   img=props.src;
   const [image, setImage] = React.useState({ preview: img, raw: "" });
   
   function isValidExtension(extension) {
      switch (extension) {
        case "png":
        case "jpeg":
        case "jpg":
        case "svg":
          setValidExtenstion(1);
          return true;
        default:
          setValidExtenstion(0);
          return false;
      }
    }
   
    function handleImage(e) {
      if (e.target.files.length) {
        const arr = e.target.files[0].name.split(".");
        isValidExtension(arr[1]) &&
          setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
          });
         props.changeImage(image.raw,image.preview)
      }
   }

   return (
      <div style={{marginLeft:"5%"}}>
         <Avatar alt="Profile name" src={image.preview}  className={classes.large} onClick={()=>{document.getElementById("image-input").click()}} />
         <input type="file" id="image-input" onChange={handleImage} style={{visibility:"hidden",position:"absolute"}}></input>
      </div>
    );
}

