import React from "react";
import {isAdminDept} from "./Util";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Tooltip from "@material-ui/core/Tooltip";
import "./Department.css";
import AddClass from "./AddClass";
import { useLocation } from "react-router-dom";
import Sectionright from "./Sectionright";
function getDept() {
  let str = window.location.pathname.split("/");
  let res = "";
  let fres = "";
  for (let i = 0; i < str.length; i++) res += str[i];
  res = res.split("%20");
  for (let i = 0; i < res.length; i++) fres += res[i] + " ";
  return fres.trim();
}
let sec = [];
const colors = [
  "a0d1ff",
  "9ab3f5",
  "ff9a76",
  "fd5e53",
  "ffd57e",
  "ffc85c",
  "ffa45b",
  "ee6f57",
  "adce74",
  "b8de6f"
];
export default function Deptright(prop) {
  const location = useLocation();
  sec=prop.section;
  const [view, setView] = React.useState(false);
  const [heading, setHeading] = React.useState();
  const [sec_id,setSecId]=React.useState();
  
  React.useEffect(() => {
    setView(false);
  }, [location]);

  function viewer(value) {
    setView(value);
  }
  function section(value,sec_id) {
    setHeading(value);
    setSecId(sec_id);
  }

  return !view ? (
    <Dept onView={viewer} changeSection={section} dept={getDept()} />
  ) : (
    <Sectionright heading={heading} secId={sec_id} dept={getDept()} />
  );
}

function Dept(prop) {
  let paddingLef = "5%";
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (width < 1700) paddingLef = "4.5%";
  return (
    <div
      style={{
        width: "calc(100vw - 275px)",
        position: "fixed",
        height: "100vh",
        overflow: "hidden"
      }}
    >
      <table
        style={{
          paddingTop: "2%",
          width: "calc(100vw - 275px)",
          position: "absolute"
        }}
      >
        <tr>
          <td
            style={{
              paddingLeft: paddingLef,
              color: "#bc6ff1",
              width: "78.5%",
              textAlign: "left"
            }}
          >
            <h1
              style={{
                color: "#474f85"
              }}
            >
              {prop.dept}
            </h1>
          </td>{
            isAdminDept() && 
          <td>
            <AddClass dept={prop.dept}/>
          </td>}
        </tr>
      </table>
      <Grid
        container
        spacing={6}
        style={{
          marginTop: "10%",
          paddingLeft: "5%",
          width: "calc(100vw - 255px)",
          overflowY: "scroll",
          height: "80vh"
        }}
        className="desc-cards"
      >
        {sec.map((item, index) => {
          return (
            <Grid item xs={4}>
              <Card
                style={{
                  width: "145px",
                  borderRadius: "10px",
                  boxShadow: "5px 10px 5px #e3e3e3",
                  height: "auto",
                  backgroundColor: "#" + colors[index % colors.length],
                  color: "white",
                  cursor: "pointer"
                }}
                onClick={() => {
                  prop.onView(true);
                  prop.changeSection(item.section_name,item.section_id);
                }}
              >
                <CardContent
                  style={{
                    textAlign: "center"
                  }}
                >
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: '"Nunito", sans-serif'
                    }}
                  >
                    Sec
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    style={{
                      fontFamily: '"Nunito", sans-serif',
                      fontSize: "30px"
                    }}
                  >
                    {item.section_name}
                  </Typography>
                  <Typography>
                    <ul
                      style={{
                        listStyleType: "none",
                        fontFamily: '"Nunito", sans-serif',
                        fontSize: "14px",
                        marginLeft: "-35%"
                      }}
                    >
                      <li>{item.no_of_students} students</li>
                      <li>{item.no_of_subjects} subjects</li>
                    </ul>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
