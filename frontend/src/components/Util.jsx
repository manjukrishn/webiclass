const TOKEN_KEY = "jwt";

export const login = () => {
  localStorage.setItem(TOKEN_KEY, "TestLogin");
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return true;
};

export const isAdmin = () => {
  return true;
};

export const isAdminMain = () => {
  return true;
};
export const isAdminCollege = () => {
  return true;
};
export const isTeacher = () => {
  return true;
};
export const isHod = () => {
  return true;
};
export const collegesList = () => {
  return [
    "Sahyadri College of Engineering and Managment",
    "Canara Engineering College",
    "NMAM",
    "RVCE"
  ];
};
export const currentCollegeBranch = () => {
  return [
    "/Basic Science",
    "/Computer Science",
    "/Civil Engineering",
    "/Information Science",
    "/Electronics and Communication",
    "/Mechanical Engineering"
  ];
};
export const currentCollege = () => {
  const getCollegeList = collegesList();
  return getCollegeList[0];
};

