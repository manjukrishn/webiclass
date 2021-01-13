import React from "react";
import "./Desc.css";
import EventNoteIcon from "@material-ui/icons/EventNote";
import Tooltip from "@material-ui/core/Tooltip";
import RemoveCircleOutlineRoundedIcon from "@material-ui/icons/RemoveCircleOutlineRounded";
import SubjectIcon from "@material-ui/icons/Subject";
import IconButton from "@material-ui/core/IconButton";
import DynamicFeedRoundedIcon from "@material-ui/icons/DynamicFeedRounded";
import AssignmentIndRoundedIcon from "@material-ui/icons/AssignmentIndRounded";
export default function DescTable(props) {

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
      body:JSON.stringify({link:e})
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
                    <IconButton style={{ marginRight: "20px" }}>
                      <EventNoteIcon style={{ color: "#ee6f57" }} />
                    </IconButton>
                  </Tooltip>

                  {/*sort by date*/}
                </th>
                <th>
                  <Tooltip title="Sort by type">
                    <IconButton style={{ marginRight: "20px" }}>
                      <DynamicFeedRoundedIcon style={{ color: "#ee6f57" }} />
                    </IconButton>
                  </Tooltip>

                  {/*sort by type*/}
                </th>
                {props.type == "home" && (
                  <th>
                    <Tooltip title="Sort by department">
                      <IconButton style={{ marginRight: "20px" }}>
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
                    <IconButton helperText="Hel">
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
          {props.contents.map((item, index) => {
            return (
              <tr className="desc-table-tr" onClick={()=>openNewTab(item.link)}>
                <td
                  style={{
                    textAlign: "center",
                    width: "16.67%",
                    wordBreak:"break-all"
                  }}
                >
                  {item.desc}
                </td>
                <td style={{ textAlign: "center", width: "16.67%",
                    wordBreak:"break-all" }}>{item.type}</td>
                <td style={{ textAlign: "center", width: "16.67%",
                    wordBreak:"break-all" }}>
                  {item.faculty}
                </td>
                <td style={{ textAlign: "center", width: "16.67%",
                    wordBreak:"break-all" }}>
                {item.subject}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    width: "16.67%",
                    paddingLeft: "2%",
                    wordBreak:"break-all"
                  }}
                >
                {item.dept}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    width: "16.67%",
                    paddingLeft: "28px",
                    wordBreak:"break-all"
                  }}
                >
                {item.date_added}
                  {props.type == "profile" && (
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
                  width: "16.67%",
                  wordBreak:"break-all"
               }}
               >
                  mdadmlmcxzzzzccsad
                </td>
                <td style={{ textAlign: "center", width: "16.67%",
                    wordBreak:"break-all" }}>vcxcvxxcv</td>
                <td style={{ textAlign: "center", width: "16.67%",
                    wordBreak:"break-all" }}>
                  xcvvcx
                </td>
                <td style={{ textAlign: "center", width: "16.67%",
                    wordBreak:"break-all" }}>
                cvxcxvcvx
                </td>
                <td
                  style={{
                    textAlign: "center",
                    width: "16.67%",
                    paddingLeft: "2%",
                    wordBreak:"break-all"
                  }}
                >
                cvxcvxcvx
                </td>
                <td
                  style={{
                    textAlign: "center",
                    width: "16.67%",
                    paddingLeft: "28px",
                    wordBreak:"break-all"
                  }}
                >
                cvxxcv
                </td>
              </tr>
        </tbody>
      </table>
    </div>
  );
}
