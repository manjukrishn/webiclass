import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  wrapper: {
    position: "relative",
    width: "100%"
  },
  buttonSuccess: {
    backgroundColor: "#362A89",
    "&:hover": {
      backgroundColor: "#362A89"
    }
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

export default function CircularIntegration(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    fetch("/addDepartment", {
      method:"POST",
      cache: "no-cache",
      headers:{
          "content_type":"application/json",
      },
       body:JSON.stringify(props.credentials)
      }
    ).then(response => {
    return response.json()
   })
   .then(json => {
      console.log(json.status);
      if(json.status!=="Success"){
        setSuccess(false);
      }
      else{
        setSuccess(true);
      }
      timer.current = window.setTimeout(() => {
        setLoading(false);
        props.errorLogging(json.status);
      }, 2000);  
   })
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        {!!props.disabled ? (
          <Button
            variant="contained"
            disabled
            style={{
              boxShadow: "none",
              width: "100%",
              fontFamily: '"Nunito", sans-serif',
              fontSize: "18px",
              backgroundColor: "#ECEFFC",
              color: " #A6ACCD",
              textTransform: "none"
            }}
          >
            Submit
          </Button>
        ) : (
          <div>
            <Button
              variant="contained"
              color="primary"
              className={buttonClassname}
              disabled={loading}
              onClick={handleButtonClick}
              style={{
                boxShadow: "none",
                borderRadius: "10px",
                width: "100%",
                fontFamily: '"Nunito", sans-serif',
                fontSize: "18px",
                textTransform: "none"
              }}
            >
              Submit
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

