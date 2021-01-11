import React from "react";
import Table from "./DescTable";
import RemoveProf from "./RemoveProf";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddProfessor from "./AddProfessors";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
export default function Profileright() {
  const DarkerDisabledTextField = withStyles({
    root: {
      marginRight: 8,
      "& .MuiInputBase-root.Mui-disabled": {
        color: "black"
      }
    }
  })(TextField);
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
          padding: "15px 15px 0px 15px",
          width: "calc(100vw - 275px)"
        }}
      >
        <col style={{ width: "80.01%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "15%" }} />
        <tr>
          <td></td>
          <td style={{ textAlign: "center" }}>
            <AddProfessor />
          </td>
          <td style={{ textAlign: "left" }}>
            <RemoveProf/>
          </td>
        </tr>
      </table>
      <table style={{ marginTop: "-2%", marginLeft: "5%" }}>
        <colgroup>
          <col style={{ width: "20%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "25%" }} />
        </colgroup>
        <tr>
          <td>
            <AccountCircleIcon style={{ fontSize: "150px" }} />
          </td>
          <td style={{ textAlign: "center" }}>
            <DarkerDisabledTextField
              disabled={true}
              id="outlined-basic"
              label="Name"
              value="XYZ"
              variant="outlined"
              style={{ width: "200px" }}
            />
          </td>
          <td>
            <DarkerDisabledTextField
              disabled={true}
              id="outlined-basic"
              label="Department"
              value="Information Science"
              variant="outlined"
              style={{ width: "200px" }}
            />
          </td>
          <td>
            <DarkerDisabledTextField
              disabled={true}
              id="outlined-basic"
              label="Designation"
              value="Asst. Professor"
              variant="outlined"
              style={{ width: "200px" }}
            />
          </td>
        </tr>
      </table>
      <div
        style={{
          marginLeft: "-5.5%",
          zIndex: "1",
          marginTop: "2%",
          marginBottom: "50px"
        }}
      >
        <Table caption="Materials Added" type="profile" />
      </div>
    </div>
  );
}
