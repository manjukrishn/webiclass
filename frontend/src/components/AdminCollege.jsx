import React from "react";
import "./AdminCollege.css";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import RemoveIcon from "@material-ui/icons/RemoveCircle";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Submit from "./AdminCollegeSubmit";
export default function AdminMain() {
  const history = useHistory();
  const getTimeFunc = () => {
    let d = new Date();
    return d.getTime();
  };
  const [disabled, setDisabled] = React.useState(true);

  const [image, setImage] = React.useState({ preview: "", raw: "" });
  const [validExtension, setValidExtenstion] = React.useState(1);
  const [arr, setArr] = React.useState([
    {
      id: 10,
      index: 10,
      hod_email: "",
      hod_dept: "",
      invalid: false
    }
  ]);
  const [college, setCollege] = React.useState();
  React.useEffect(() => {
    const res = () => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].invalid || arr[i].hod_dept.length < 5) return true;
      }
      return false;
    };
    const ans = res();
    if (ans) setDisabled(true);
    else setDisabled(false);
  }, [arr]);

  const validate = (index) => {
    const mailFormat = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]{2,4})+)*$/;
    const name = "hod_email";
    if (arr[index][name].match(mailFormat)) {
      arr[index].invalid = false;
    } else {
      arr[index].invalid = true;
    }
  };
  const handleChange = (index) => (event) => {
    const newArr = [...arr];
    const { name, value } = event.target;
    newArr[index][name] = value;
    setArr(newArr);
    validate(index);
  };

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

  let paddingLeft = "2%";
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (width < 1700) paddingLeft = "-4.5%";
  
  function handleImage(e) {
    if (e.target.files.length) {
      const arr = e.target.files[0].name.split(".");
      isValidExtension(arr[1]) &&
        setImage({
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0]
        });
    }
  }
  return (
    <div className="admin-college-body">
      <div className="admin-college-container">
        <table style={{ width: "100%" }}>
          <tr style={{ width: "100%" }}>
            <div className="admin-college-logo">W</div>
          </tr>
          <tr>
            <td style={{ width: "100%", paddingLeft: "40.5%" }}>
              <div
                style={{
                  borderRadius: "50%",
                  height: "100px",
                  width: "100px",
                  padding: "auto"
                }}
                onClick={() => {
                  document.getElementById("photo-input").click();
                }}
                className="admin-college-add-photo"
              >
                {!!validExtension ? (
                  <div>
                    {!image.raw ? (
                      <div
                        style={{
                          paddingTop: "30px",
                          cursor: "pointer",
                          fontSize: "14px"
                        }}
                        className="span-add-photo"
                      >
                        Add College Logo
                      </div>
                    ) : (
                      <div
                        style={{
                          height: "70px",
                          width: "100px",
                          paddingTop: "15px",
                          paddingLeft: "1px"
                        }}
                      >
                        <img
                          src={image.preview}
                          alt="college-logo"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%"
                          }}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div
                      style={{
                        paddingTop: "30px",
                        cursor: "pointer",
                        color: "#a80038"
                      }}
                    >
                      Invalid File Type
                    </div>
                  </div>
                )}
              </div>
              <input
                style={{
                  width: "500px",
                  height: "100px",
                  position: "absolute",
                  marginLeft: "-50px",
                  visibility: "hidden"
                }}
                id="photo-input"
                type="file"
                onChange={handleImage}
                accept="image/*"
              ></input>
            </td>
          </tr>

          <tr>
            <TextField
              name="college"
              label={
                <span style={{ fontFamily: '"Nunito", sans-serif' }}>
                  College Name
                </span>
              }
              inputProps={{
                min: 0,
                style: { fontFamily: '"Nunito", sans-serif' }
              }}
              onChange={handleChange}
            />
          </tr>
          <tr>
            <div
              style={{
                width: "580px",
                height: "120px",
                marginLeft: "-10px",
                marginTop: "30px",
                overflowY: "scroll"
              }}
              className="container-div"
            >
              {!!arr.length && (
                <table>
                  <thead style={{ color: " #0277bd" }}>
                    <td style={{ paddingTop: "5px" }}>Department</td>
                    <td style={{ paddingLeft: "100px", paddingTop: "5px" }}>
                      Email Id
                    </td>
                  </thead>
                  <tbody>
                    {arr.map((item, index) => {
                      return (
                        <tr>
                          <td>
                            <TextField
                              name="hod_dept"
                              label={
                                <span
                                  style={{ fontFamily: '"Nunito", sans-serif' }}
                                >
                                  Department
                                </span>
                              }
                              value={item.hod_dept}
                              inputProps={{
                                min: 0,
                                style: { fontFamily: '"Nunito", sans-serif' }
                              }}
                              onChange={handleChange(index)}
                            />
                          </td>
                          <td style={{ paddingLeft: "100px" }}>
                            {!item.invalid ? (
                              <TextField
                                name="hod_email"
                                label={
                                  <span
                                    style={{
                                      fontFamily: '"Nunito", sans-serif'
                                    }}
                                  >
                                    Email
                                  </span>
                                }
                                value={item.hod_email}
                                onChange={handleChange(index)}
                                inputProps={{
                                  min: 0,
                                  style: { fontFamily: '"Nunito", sans-serif' }
                                }}
                              />
                            ) : (
                              <TextField
                                error
                                label={
                                  <span
                                    style={{
                                      fontFamily: '"Nunito", sans-serif'
                                    }}
                                  >
                                    Invalid email
                                  </span>
                                }
                                name="hod_email"
                                id={item.index}
                                value={item.hod_email}
                                onChange={handleChange(index)}
                              />
                            )}
                          </td>
                          <td>
                            {!!(arr.length > 1) && (
                              <IconButton
                                onClick={() => {
                                  setArr(
                                    arr.filter(
                                      (itemIn) => itemIn.id !== item.id
                                    )
                                  );
                                }}
                              >
                                <RemoveIcon />
                              </IconButton>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </tr>
          <tr>
            <Button
              style={{
                marginTop: "10px",
                textTransform: "none",
                fontFamily: '"Nunito", sans-serif',
                marginLeft: "-5.5%"
              }}
              onClick={() => {
                setArr((prev) => {
                  return [
                    ...prev,
                    {
                      id: getTimeFunc(),
                      index: getTimeFunc(),
                      hod_email: "",
                      hod_dept: "",
                      invalid: false
                    }
                  ];
                });
              }}
            >
              + Add New
            </Button>
          </tr>
          <tr>
            <td style={{ paddingLeft: "30%" }}>
              <div style={{ marginTop: "20px", width: "50%" }}>
                <Submit disabled={disabled} />
              </div>
            </td>
          </tr>
          <tr>
            <div
              onClick={() => {
                history.push("/");
              }}
              className="admin-main-go-home"
              style={{
                marginTop: "20px",
                cursor: "pointer",
                marginLeft: "-30px"
              }}
            >
              Go to home
            </div>
          </tr>
        </table>
      </div>
    </div>
  );
}

