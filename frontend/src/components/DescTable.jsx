import React from "react";
import "./Desc.css";
import EventNoteIcon from "@material-ui/icons/EventNote";
import Tooltip from "@material-ui/core/Tooltip";
import RemoveCircleOutlineRoundedIcon from "@material-ui/icons/RemoveCircleOutlineRounded";
import SubjectIcon from "@material-ui/icons/Subject";
import IconButton from "@material-ui/core/IconButton";
import DynamicFeedRoundedIcon from "@material-ui/icons/DynamicFeedRounded";
import AssignmentIndRoundedIcon from "@material-ui/icons/AssignmentIndRounded";
import Nothing from "./NothingShow";
import {isFaculty,isHod} from "./Util";
export default function DescTable(props) {
  const [material,setMaterials]=React.useState(props.contents);

  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

let paddingLeft = "5%";
const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  console.log(width);
  if (width < 1700) paddingLeft = "3.5%";
  const openNewTab=(url)=>{
    const newWindow=window.open(url,"_blank","noopener,noreferrer");
    if(newWindow) newWindow.opener=null;
  }
const handleDelete=(e)=>{
    props.setFlag(true)
    fetch("/deleteMaterial",{
      method:"POST",
      cache:"no-cache",
      headers:{
        "content_type":"application/json",
      },
      body:JSON.stringify(e)
     }).then(response=>response.json()).then(data=>{console.log(data)});
  }
return (
    <div style={{ backgroundColor: "#f2f2f0" }}>
      <table className="desc-table">
        <caption
          style={{
            textAlign: "left",
            backgroundColor: "#f2f2f0",
            height: "2%"
          }}
        >
          <table className="desc-table-caption">
            <colgroup>
              <col style={{ width: "50.01%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "16.67%" }} />
              <col style={{ width: "6.67%" }} />
              <col style={{ width: "6.67%" }} />
              <col style={{ width: "6.67%" }} />
            </colgroup>
            <thead style={{ width: "calc(100vw - 280px)", padding: "15px" }}>
              <tr>
                <th
                  style={{
                    color: "#5ea3a3",
                    fontSize: "24px",
                    paddingLeft: paddingLeft
                  }}
                >
                  {props.caption}
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th>
                  <Tooltip title="Sort by date">
                    <IconButton style={{ marginRight: "20px" }} onClick={()=>{setMaterials(groupBy(material,material=>material.date_added))}}>
                      <EventNoteIcon style={{ color: "#ee6f57" }} />
                    </IconButton>
                  </Tooltip>

                  {/*sort by date*/}
                </th>
                <th>
                  <Tooltip title="Sort by type">
                    <IconButton style={{ marginRight: "20px" }} onClick={()=>{setMaterials(groupBy(material,material=>material.type))}}>
                      <DynamicFeedRoundedIcon style={{ color: "#ee6f57" }} />
                    </IconButton>
                  </Tooltip>

                  {/*sort by type*/}
                </th>
                {props.type == "home" && (
                  <th>
                    <Tooltip title="Sort by department">
                      <IconButton style={{ marginRight: "20px" }} onClick={()=>{setMaterials(groupBy(material,material=>material.dept))}}>
                        {
                          <AssignmentIndRoundedIcon
                            style={{ color: "#f05454" }}
                          />
                        }
                        {/*sort by department*/}
                      </IconButton>
                    </Tooltip>
                  </th>
                )}
                <th style={{ paddingRight: "25px" }}>
                  <Tooltip title="Sort by subject">
                    <IconButton helperText="Hel" onClick={()=>{setMaterials(groupBy(material,material=>material.subject))}}>
                      <SubjectIcon style={{ color: "#f05454" }} />
                      {/* sort by subject */}
                    </IconButton>
                  </Tooltip>
                </th>
              </tr>
            </thead>
          </table>
        </caption>
        <colgroup>
          <col style={{ width: "16.67%" }} />
          <col style={{ width: "16.67%" }} />
          <col style={{ width: "16.67%" }} />
          <col style={{ width: "16.67%" }} />
          <col style={{ width: "16.67%" }} />
          <col style={{ width: "16.67%" }} />
        </colgroup>
        <thead>
          <tr>
            <th className="header-desc">Description</th>
            <th className="header-desc">Type</th>
            <th className="header-desc">Faculty</th>
            <th className="header-desc">Subject</th>
            <th className="header-desc">Department</th>
            <th className="header-desc">Date Added</th>
          </tr>
        </thead>
        <tbody>
          {material.map((item, index) => {
            return (
              <tr className="desc-table-tr" onClick={()=>openNewTab(item.link)}>
                <td
                  style={{
                    textAlign: "center",
                    width: "16.67%"
                  }}
                >
                  {item.desc}
                </td>
                <td style={{ textAlign: "center", width: "16.67%" }}>{item.type}</td>
                <td style={{ textAlign: "center", width: "16.67%" }}>
                  {item.faculty}
                </td>
                <td style={{ textAlign: "center", width: "16.67%" }}>
                {item.subject}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    width: "16.67%",
                    paddingLeft: "4.2%"
                  }}
                >
                {item.dept}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    width: "16.67%",
                    paddingLeft: "4.5%"
                  }}
                >
                {item.date_added}
                  {isHod() || isFaculty() && (
                    <div
                      style={{
                        width: "1%",
                        display: "inline",
                        marginLeft: "1.2%",
                        position: "absolute",
                        marginTop: ".1%",
                        cursor: "pointer"
                      }}
                      className="remove-profile"
                    >
                      <RemoveCircleOutlineRoundedIcon
                        color="secondary"
                        onClick={()=>handleDelete(item.link)}
                        style={{ fontSize: "16px" }}
                      />
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
          <tr className="desc-table-tr" style={{opacity:0}}>
             <td
              style={{
                  textAlign: "center",
                  width: "16.67%"
               }}
               >
                 Video on Bellman ford algorithm
                </td>
                <td style={{ textAlign: "center", width: "16.67%" }}>
                  Video doing
                </td>
                <td style={{ textAlign: "center", width: "16.67%" }}>
                Manju Krishna
                </td>
                <td
                  style={{
                    textAlign: "center",
                    width: "16.67%",
                    paddingLeft: "2%"
                  }}
                >
                Computer Networks
                </td>
                <td
                  style={{
                    textAlign: "center",
                    width: "16.67%",
                    paddingLeft: "28px"
                  }}
                >
                Information Science
                </td>
                <td
                  style={{
                    textAlign: "center",
                    width: "16.67%",
                    paddingLeft: "28px"
                  }}
                >20 Dec 2020</td>
              </tr>
        </tbody>
      </table>
    </div>
  );
}
