import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import CollegeClick from "./CollegeClick";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Loading from "./Loading";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "./College.css";
export default function College(props) {
  const useStyles = makeStyles({
    root: {
      maxWidth: 345
    }
  });
  const classes = useStyles();
  const [materials,setMaterials]=React.useState([]); 
  const [logged,setLogged]=React.useState();
  const [clicked,setClicked]=React.useState(false);
  const [loading,setLoading]=React.useState(true);
  const [image,setImage]=React.useState("");
  function setLoad(){
    setLoading(false);
  }

  function handleClick(college_name,image){
    setImage(image);
    fetch("/getCollegeGrid",{
      method:"POST",
      cache:"no-cache",
      headers:{
        "content_type":"application/json",
      },
      body:JSON.stringify({college:college_name})
     }).then(response=>response.json()).then(data=>{
      setLogged(data.college_name)
      const arr=[]
      data.material.map((item,index)=>arr.push(
      {
         link:item[0],
         desc:item[1],
         type:item[2],
         faculty:item[3],
         subject:item[4],
         dept:item[5],
         date_added:item[6]
      }))
     console.log(arr);
     setMaterials(arr);
     setTimeout(setLoad,2000)
   });    
   setClicked(true);
  }
  return (
    <div>
    {!clicked ? 
    <div
      style={{
        margin: "3% 5%",
        position: "fixed",
        width: "calc(100vw - 275px)",
        height: "100vh"
      }}
    >
      <Input
        id="standard-full-width"
        style={{ width: "calc(100vw - 40%)" }}
        placeholder="Search"
        margin="normal"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        InputLabelProps={{
          shrink: true
        }}
      />
      <div className="college-list">
        <Grid container spacing={3}>
          {props.colleges.map((item, index) => {
            return (
              <Grid item xs={6} onClick={()=>handleClick(item.link,item.logo)}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <div style={{height:"200px",width:"345px",overflow:"hidden"}}>
                      <img
                        src={item.logo}
                        height="200px"
                        style={{display:"block",marginLeft:"auto",marginRight:"auto"}}
                        alt="sahyadri"
                      />
                    </div>

                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        style={{ fontFamily: 'Nunito", sans-serif' }}
                      >
                      {item.college_name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div> : !loading ? <CollegeClick materials={materials} logged={logged} image={image}/> : <Loading/>}
    </div>
  );
}
