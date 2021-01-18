from flask import Flask,request,session,jsonify
import sqlite3
import time

app=Flask(__name__)
conn=sqlite3.connect('Webiclass.db')
c=conn.cursor()
conn.commit()

role=""
uid=""
def userLoggedIn(email,password):
   query=c.execute("SELECT * FROM USER WHERE EMAIL="+"\'"+email+"\'")
   query=query.fetchall()
   
   if(len(query)==0):
     return 1
   
   query=c.execute("SELECT * FROM USER WHERE EMAIL="+"\'"+email+"\' AND PASSWORD=NULL")
   query=query.fetchall()
   
   if(len(query)==0):
      return 1

   query=c.execute("SELECT * FROM USER WHERE EMAIL="+"\'"+email+"\' AND PASSWORD="+"\'"+password+"\'")
   query=query.fetchall()

   if(len(query)==0):
      return 2
   
   queryRole=c.execute("SELECT ROLE FROM USER WHERE EMAIL="+"\'"+email+"\'")
   queryRole=queryRole.fetchall()
   
   global role
   role=queryRole[0][0]
   

   queryRole=c.execute("SELECT UID FROM USER WHERE EMAIL="+"\'"+email+"\'")
   queryRole=queryRole.fetchall()

   global uid
   uid=queryRole[0][0]
   
   return 0

@app.route('/login',methods=['POST'])
def login():
  conn=sqlite3.connect('Webiclass.db')
  data=request.json
  email=data['email']
  password=data['password']

  if(userLoggedIn(email,password)==1):
    return {"status":"Email Not registered"}
  else if(userLoggedIn(email,password)==2):
    return {"status":"Invalid password"}
  
  global role
  return {"status":"Success","role":role}      

@app.route('/register',methods=['POST'])
def register():
  conn=sqlite3.connect('Webiclass.db')
  c=conn.cursor()
  data=request.json
  name=data["name"]
  email=data["email"]
  uid=data["uid"]
  did=data["did"]
  role="4"
  password=data["password"]
  queryEmail="SELECT * FROM USER WHERE EMAIL=\'"+email+"\' AND PASSWORD!='NULL'"
  rowEmail=c.execute(queryEmail)
  rowEmail=rowEmail.fetchall()
  if(len(rowEmail)>=1):
     return {"status":"Email already registered"}
  
  queryEmail="SELECT * FROM USER WHERE EMAIL=\'"+email+"\' AND PASSWORD='NULL'"
  rowEmail=c.execute(queryEmail)
  rowEmail=rowEmail.fetchall()
  c.execute(queryCredential)
  if(len(rowEmail)>=1):
     c.execute("UPDATE USER SET NAME="+"\'"name+"\'"+" AND PASSWORD="+"\'"+password+"\' WHERE EMAIL="+"\'"+email+"\'")
     conn.commit()
     return {"status":"Success"}
  hod=c.execute("SELECT UID FROM USER WHERE HOD_ID='NULL' AND ID="+"\'"+did+"\'")
  hod=hod.fetchall()
  c.execute("INSERT INTO USER VALUES("+"\'"+uid+"\'"+",\'"+name+",\'"+email+"\'"+",\'"+"\'4\'"+","+"\'"+hod[0][0]+"\'"+","+"\'"+did+"\'"+","+"\'"+password+"\')")
  conn.commit()
  conn.close()
  return {"status":"Success"}

@app.route('/addHOD',methods=['POST'])
def set_admin_main():
    conn=sqlite3.connect('Webiclass.db')  
    c=conn.cursor()
    data=request.json
    name=data["hodname"]
    email=data["hodemail"]
    uid=data["hoduid"]
    role="1"
    hod_id="NULL"
    dpt=data["dpt"]
    password="NULL"
    query=c.execute("SELECT * FROM USER WHERE UID="+"\'"+uid+"\'")
    query=query.fetchall()
    if(len(query)):
       return {"status":"Email Already exists"}
    c.execute("INSERT INTO USER VALUES("+"\'"+uid+"\'"+","+"\'"+name+"\'"+","+"\'"+email+"\'"+","+"\'"+role+"\'"+","+"\'"+hod_id+"\'"+","+"\'"+dpt+"\'"+","+"'NULL')")
    conn.commit()
    return {"status":"Success"}

@app.route('/getDepartmentListAdminMain')
def getDeptList():
    conn=sqlite3.connect('Webiclass.db')  
    c=conn.cursor()
    query=c.execute("SELECT * FROM DEPARTMENT WHERE DEPARTMENT_NAME NOT IN(SELECT DEPARTMENT_NAME FROM USER)")
    query=query.fetchall()
    return {"dept":query}

@app.route('/addDepartment',methods=['POST'])
def addDepartment():
    conn=sqlite3.connect('Webiclass.db')  
    c=conn.cursor()
    data=request.json
    dept=data["deptname"]
    query=c.execute("SELECT * FROM DEPARTMENT WHERE DEPARTMENT_NAME="+"\'"+dept+"\'")
    query=query.fetchall()
    collegeName="Sahyadri College of Engineering and Managment"
    if(len(query)):
      return {"status":"Department already exists"}
    c.execute("INSERT INTO DEPARTMENT VALUES("+"\'"+collegeName+"\'"+","+"\'"+dept+"\')")
    conn.commit()
    return {"status":"Success"}

@app.route('/addAdminAdminDept',methods=['POST'])
def addAdminAdminDept():
    conn=sqlite3.connect('Webiclass.db')  
    c=conn.cursor()
    data=request.json
    name=data["adminname"]
    uid=data["adminuid"]
    email=data["adminemail"]
    role="2"
    hod_id="NULL"
    dpt=data["dpt"]
    password="NULL"
    query=c.execute("SELECT * FROM USER WHERE UID="+"\'"+uid+"\'")
    query=query.fetchall()
    if(len(query)):
       return {"status":"Email Already exists"}
    c.execute("INSERT INTO USER VALUES("+"\'"+uid+"\'"+","+"\'"+name+"\'"+","+"\'"+email+"\'"+","+"\'"+role+"\'"+","+"\'"+hod_id+"\'"+","+"\'"+dpt+"\'"+","+"'NULL')")
    conn.commit()
    return {"status":"Success"}

@app.route('/removeStudent',methods=['POST'])
def removeStudent():
    conn=sqlite3.connect('Webiclass.db')  
    c=conn.cursor()
    data=request.json
    uid=data["studentusn"]
    c.execute("DELETE FROM USER WHERE UID="+"\'"+uid+"\'")
    conn.commit()
    return {"status":"Success"}
    
@app.route('/getStudentListDept')
def getStudentListDept():
    conn=sqlite3.connect('Webiclass.db')  
    c=conn.cursor()
    getDept=c.execute("SELECT DEPARTMENT_NAME FROM USER WHERE UID="+"\'"+uid+"\'")
    getDept=getDept.fetchall()
    query=c.execute("SELECT NAME,USN FROM USER WHERE DEPARTMENT_NAME="+"\'"+getDept[0][0]+"\'")
    query=query.fetchall()
    return {"studentList":query}

@app.route('/addStudent',methods=['POST'])
def addStudent():
    conn=sqlite3.connect('Webiclass.db')  
    c=conn.cursor()
    data=request.json
    name=data["studentname"]
    usn=data["studentusn"]
    email=data["studentemail"]
    role="4"
    dpt=data["dpt"]
    sec_name=data["section"]
    global uid
    query=c.execute("SELECT DEPARTMENT_NAME FROM USER WHERE UID="+"\'"+uid+"\'")
    query=query.fetchall()
    dpt=query[0][0]
    query=c.execute("SELECT HOD_ID FROM USER WHERE DEPARTMENT_NAME="+"\'"+dpt+"\'")
    query=query.fetchall()
    hod_id=query[0][0]   
    password="NULL"
    query=c.execute("SELECT * FROM USER WHERE UID="+"\'"+uid+"\'")
    query=query.fetchall()
    query2=c.execute("SELECT * FROM USER WHERE USN="+"\'"+uid+"\'")
    query2=query2.fetchall()
    if(len(query) or len(query2)):
       return {"status":"Email Already exists"}
    c.execute("INSERT INTO USER VALUES("+"\'"+usn+"\'"+","+"\'"+name+"\'"+","+"\'"+email+"\'"+","+"\'"+role+"\'"+","+"\'"+hod_id+"\'"+","+"\'"+dpt+"\'"+","+"'NULL')")
    query=c.execute("SELECT SID FROM SECTION WHERE SECTION_NAME="+"\'"+sec_name+"\' AND DEPARTMENT_NAME="+"\'"+dpt+"\'")
    query=query.fetchall()
    sid=query[0][0]
    c.execute("INSERT INTO STUDENT VALUES("+"\'"+uid+"\'"+","+"\'"+sid+"\')")
    conn.commit()
    return {"status":"Success"}

@app.route("/getSectionListAdminDept")
def getFacultyListAdminMain():
    conn=sqlite3.connect('Webiclass.db')  
    c=conn.cursor()
    global uid
    query=c.execute("SELECT DEPARTMENT_NAME FROM USER WHERE UID="+"\'"+uid+"\'")
    query=query.fetchall()
    dpt=query[0][0]
    query=c.execute("SELECT NAME FROM SECTION WHERE UID="+"\'"+uid+"\' AND DEPARTMENT_NAME="+"\'"+dpt+"\'")
    query=query.fetchall()
    return {"section":query}
    
@app.route("/getFacultyListAdminDept",methods=['POST'])
def getFacultyListAdminMain():
    conn=sqlite3.connect('Webiclass.db')  
    c=conn.cursor()
    data=request.json
    subject=data["subject"]
    subject=c.execute("SELECT U.NAME FROM USER U,SUBJECT S WHERE U.UID=S.UID S.NAME!="+"\'"+subject+"\'")
    subject=subject.fetchall()
    return {"subject":subject}

@app.route("/getSubjectListAdminDept",methods=['POST'])
def getFacultyListAdminMain():
    conn=sqlite3.connect('Webiclass.db')  
    c=conn.cursor()
    global uid
    query=c.execute("SELECT DEPARTMENT_NAME FROM USER WHERE UID="+"\'"+uid+"\'")
    query=query.fetchall()
    dpt=query[0][0]
    sid=c.execute("SELECT SID FROM SECTION WHERE ")
    query=c.execute("SELECT NAME FROM SUBJECT WHERE NAME="+"\'"+dpt+"\'")
    query=query.fetchall()
    return {"section":query}
 
   
@app.route('/home')
def home():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   global uid
   role=c.execute("SELECT ROLE FROM USER WHERE UID="+"\'"+uid+"\'")
   role=role.fetchall()
   role=role[0][0]
   
   if(role=="1" or role=="3" or role="4"):
       query=c.execute("SELECT DEPARTMENT_NAME FROM USER WHERE UID="+"\'"+uid+"\'")
       query=query.fetchall()
       dpt=query[0][0]
       queryMaterial=c.execute("SELECT M.LINK,M.TYPE,U.NAME,S.NAME,U.DEPARTMENT_NAME,M.DATE FROM MATERIAL M,USER U,SUBJECT S WHERE S.CODE=M.CODE AND S.UID=U.UID AND U.DEPARTMENT_NAME="+"\'"+dpt+"\'")
       queryMaterial=queryMaterial.fetchall()
       return {"material":queryMaterial}

   queryMaterial=c.execute("SELECT M.LINK,M.TYPE,U.NAME,S.NAME,U.DEPARTMENT_NAME,M.DATE FROM MATERIAL M,USER U,SUBJECT S WHERE M.CODE=S.CODE AND S.UID=U.UID")
   queryMaterial=queryMaterial.fetchall()
   return {"material":queryMaterial}

@app.route('/getDepartment')
def getDept():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   dept=c.execute("SELECT DEPARTMENT_NAME FROM DEPARTMENT")
   dept=dept.fetchall()
   return {"dept":dept}
   
@app.route('/getSection',methods=['POST'])
def getSection():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   dept=data["dept"]
   section=c.execute("SELECT S.SID,S.NAME,COUNT(ST.USN),COUNT(SU.CODE) FROM SECTION S,USER U,SUBJECT SU,STUDENT ST WHERE ST.ID=S.SID AND SU.SID=S.SID")
   section=section.fetchall()
   return {"sections":section}

@app.route('/addSection',methods=['POST'])
def addSection():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   section=data["section"]
   section_id=data["sectionId"]
   dept=data["dept"]
   c.execute("INSERT INTO SECTION VALUES("+"\'"+section_id+"\'"+","+"\'"+section+"\'"+","+"\'"+dept+"\')")
   conn.commit()
   return {"status":"success"}


@app.route('/getSectionTable',methods=['POST'])
def addSection():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   section_id=data["sectionId"]
   dept=data["dept"]
   queryMaterial=c.execute("SELECT M.LINK,M.TYPE,U.NAME,S.NAME,U.DEPARTMENT_NAME,M.DATE FROM MATERIAL M,USER U,SUBJECT S,SECTION SE WHERE S.CODE=M.CODE AND S.UID=U.UID AND U.DEPARTMENT_NAME="+"\'"+dept+"\' AND "+"\' SE.SID=S.SID AND S.SID="+"\'"+section_id+"\'")
   queryMaterial=queryMaterial.fetchall()
   conn.commit()
   return {"status":"success"}

@app.route('/getHandledSubjects',methods=['POST'])
def getHandledSubjects():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   section_id=data["sectionId"]
   global uid
   query=c.execute("SELECT S.CODE,S.NAME FROM SUBJECT S S.UID="+"\'"+uid+"\' AND S.SID="+"\'"+section_id+"\'")
   query=query.fetchall()
   return {"subjects":query}

@app.route('/addMaterial',methods=['POST'])
def addMaterial():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   link=data["link"]
   date=data["link"]
   subid=data["link"]
   typeo=data["link"]
   desc=data["desc"]
   secId=data["secId"]
   c.execute("INSERT INTO MATERIAL VALUES("+"\'"+link+"\'"+","+"\'"+date+"\'"+","+"\'"+typeo+"\'"+","+"\'"+desc+"\'"+","+"\'"+code+"\'"+","+"\'"+secId+"\')")
   conn.commit()
   return {"status":"Success"}

