import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
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
  return (
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
              <Grid item xs={6}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <div style={{height:"200px",width:"345px",overflow:"hidden"}}>
                      <img
                        src="download-removebg-preview.png"
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
    </div>
  );
}
