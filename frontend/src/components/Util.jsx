const TOKEN_KEY = "jwt";

export const login = () => {
  sessionStorage.setItem(TOKEN_KEY, "TestLogin");
};

export const isLogin = () => {
  if (sessionStorage.getItem("isLoggedin")) {
    return true;
  }
  return true;
};

export const isAdminMain = () => {//done
  if (sessionStorage.getItem("isAdminMain")) {
    return true;
  }
  return true;
};
export const isAdminCollege = () => {//done
  if (sessionStorage.getItem("isAdminCollege")) {
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
  if (sessionStorage.getItem("isFaculty")) {
    return true;
  }
  return true;
};
export const isHod = () => {
  if (sessionStorage.getItem("isHod")) {
    return true;
  }
  return false;
};

