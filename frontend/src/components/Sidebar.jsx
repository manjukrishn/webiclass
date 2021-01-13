import React from "react";
import "./Sidebar.css";
import { isAdmin } from "./Util";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import SchoolIcon from "@material-ui/icons/School";
import PersonPinIcon from "@material-ui/icons/PersonPin";
export default function Sidebar(props) {
  const [dept,setDeptList]=React.useState([]);
 
  React.useEffect(() => {
    const cls = "style-onhover";
    const str = window.location.pathname.split("/");
    console.log(str);
    if (
      str[1] === "home" ||
      !str[1] ||
      str[1] === "colleges" ||
      str[1] === "profile"
    ) {
      if (!str[1]) str[1] = "home";
      const elnt = document.getElementById(str[1]);
      elnt.className += " " + cls;
    }
    fetch("/getDepartment").then(response=>response.json()).then
     (data=>{
      const arr=[]
      console.log(data.dept);
      data.dept.map((item,index)=>
      arr.push(item[0])
      )
      console.log(arr);
      setDeptList(arr);
  });
  }, []);
  const getRandom = (index) => {
    let color3 = [
      "FD3A4A",
      "FC74FD",
      "00CC99",
      "00755E",
      "FE66FF",
      "006CAB",
      "FB4BAC",
      "FF01CC"
    ];
    return "#" + color3[index % 7];
  };
  return (
    <div>
      <div className="sidebar">
        <ul id="sidebar-list">
          <li tabindex="0" id="home" style={{ marginTop: "3%" }}>
            <Link to="home">
              <HomeIcon className="img-sidebar" />
              <span style={{ position: "absolute" }}>Home</span>
            </Link>
          </li>
          <li tabindex="1" id="colleges" style={{ marginTop: "5%" }}>
            <Link to="colleges">
              <SchoolIcon className="img-sidebar" />
              <span style={{ position: "absolute" }}>College</span>
            </Link>
          </li>
          <ul className="sidebar-sublist" style={{ marginTop: "3%" }}>
            <table
              style={{
                borderCollapse: "separate",
                borderSpacing: "0 .7em",
                marginTop: "-10px"
              }}
            >
              {dept.map((item, index) => {
                return (
                  <Link to={item}>
                    <tr>
                      <td>
                        <RadioButtonUncheckedIcon
                          style={{
                            fontSize: "14px",
                            marginLeft: "-15px",
                            marginRight: "5px",
                            color: getRandom(index),
                            fontWeight: "900"
                          }}
                        />
                      </td>
                      <td>
                        <li>
                          <span>{item}</span>
                        </li>
                      </td>
                    </tr>
                  </Link>
                );
              })}
            </table>
          </ul>
          <li tabindex="2" id="profile" style={{ marginTop: "5%" }}>
            {isAdmin() && (
              <Link to="profile">
                <PersonPinIcon className="img-sidebar" />
                <span style={{ position: "absolute" }}>Profile</span>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
