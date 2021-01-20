export const isLogin = () => {
  if (sessionStorage.getItem("isLoggedin")=="true") {
    return true;
  }
  return false;
};

export const isStudent =()=>{
  if (sessionStorage.getItem("isStudent")=="true") {
    return true;
  }
  return false;
}

export const isAdminMain = () => {//done
  if (sessionStorage.getItem("isAdminMain")=="true") {
    return true;
  }
  return false;
};
export const isAdminCollege = () => {//done
  if (sessionStorage.getItem("isAdminCollege")=="true") {
    return true;
  }
  return false;
};
export const isAdminDept = () => {//done
  if (sessionStorage.getItem("isAdminDept")) {
    return true;
  }
  return false;
};
export const isFaculty = () => {//done
  if (sessionStorage.getItem("isFaculty")=="true") {
    return true;
  }
  return false;
};
export const isHod = () => {
  if (sessionStorage.getItem("isHOD")=="true") {
    return true;
  }
  return false;
};

export const dept =()=>{
  let c=null;
  if (c=sessionStorage.getItem("Department")) {
    return c;
  }
}