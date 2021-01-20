from flask import Flask,request,session,jsonify
import sqlite3
import time

app=Flask(__name__)


role=""
uid=""

def userLoggedIn(email,password):
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   query=c.execute("SELECT * FROM USER WHERE EMAIL="+"\'"+email+"\' AND PASSWORD="+"\'"+password+"\'")
   query=query.fetchall()
   
   print(len(query))
   if(len(query)==0):
      return 1
   
   queryRole=c.execute("SELECT ROLE FROM USER WHERE EMAIL="+"\'"+email+"\'")
   queryRole=queryRole.fetchall()
   
   global role
   role=queryRole[0][0]
   
   queryRole=c.execute("SELECT UID FROM USER WHERE EMAIL="+"\'"+email+"\'")
   queryRole=queryRole.fetchall()

   global uid
   uid=queryRole[0][0]
   conn.commit()
   
   return 0

@app.route('/login',methods=['POST']) #done
def login():
  conn=sqlite3.connect('Webiclass.db')
  c=conn.cursor()
  conn=sqlite3.connect('Webiclass.db')
  data=request.json
  email=data['email']
  password=data['password']

  if(userLoggedIn(email,password)>=1):
    return {"status":"Email Not registered"}
  elif(userLoggedIn(email,password)==2):
    return {"status":"Invalid password"}
  
  global role
  global uid
  dept=c.execute("SELECT DEPARTMENT_NAME FROM USER WHERE UID="+"\'"+uid+"\'")
  dept=dept.fetchall()
  dept=dept[0][0]
  conn.commit()
  return {"status":"Success","role":role,"dept":dept}      

@app.route('/register',methods=['POST']) #done
def register():
  conn=sqlite3.connect('Webiclass.db')
  c=conn.cursor()
  data=request.json
  name=data["name"]
  email=data["email"]
  uid=data["uid"]
  password=data["password"]
  queryEmail="SELECT * FROM USER WHERE EMAIL=\'"+email+"\' AND PASSWORD<>'NULL'"
  rowEmail=c.execute(queryEmail)
  rowEmail=rowEmail.fetchall()
  if(len(rowEmail)>=1):
     return {"status":"Email already registered"}
  
  queryEmail="SELECT * FROM USER WHERE EMAIL=\'"+email+"\' AND PASSWORD='NULL'"
  rowEmail=c.execute(queryEmail)
  rowEmail=rowEmail.fetchall()
  if(len(rowEmail)>=1):
     c.execute("UPDATE USER SET NAME="+"\'"+name+"\' WHERE EMAIL="+"\'"+email+"\'")
     conn.commit()
     c.execute("UPDATE USER SET PASSWORD="+"\'"+password+"\' WHERE EMAIL="+"\'"+email+"\'")
     conn.commit()
     return {"status":"Success"}

  c.execute("INSERT INTO USER VALUES("+"\'"+uid+"\'"+",\'"+name+",\'"+email+"\'"+","+"\'5\'"+","+"\'\'"+","+"\'\'"+","+"\'"+password+"\')")
  conn.commit()
  conn.close()
  return {"status":"Success"}

@app.route('/addHOD',methods=['POST']) #done
def set_admin_main(): 
    conn=sqlite3.connect('Webiclass.db')  
    c=conn.cursor()
    data=request.json
    name=data["hodname"]
    email=data["hodemail"]
    uid=data["hoduid"]
    role="1"
    hod_id="NULL"
    dpt=data["dept"]
    password="NULL"
    query=c.execute("SELECT * FROM USER WHERE UID="+"\'"+uid+"\'")
    query=query.fetchall()
    if(len(query)):
       return {"status":"Email Already exists"}
    c.execute("INSERT INTO USER VALUES("+"\'"+uid+"\'"+","+"\'"+name+"\'"+","+"\'"+email+"\'"+","+"\'"+role+"\'"+","+"\'"+hod_id+"\'"+","+"\'"+dpt+"\'"+","+"'NULL')")
    conn.commit()
    c.execute("UPDATE USER SET HOD_ID="+"\'"+uid+"\' WHERE DEPARTMENT_NAME="+"\'"+dpt+"\'")
    conn.commit()
    conn.close()
    return {"status":"Success"}

@app.route('/getDepartmentListAdminMain') #done
def getDeptList():
    conn=sqlite3.connect('Webiclass.db')  
    c=conn.cursor()
    query=c.execute("SELECT DEPARTMENT_NAME FROM DEPARTMENT WHERE DEPARTMENT_NAME NOT IN(SELECT DEPARTMENT_NAME FROM USER WHERE HOD_ID!='NULL' )")
    query=query.fetchall()
    return {"dept":query}

@app.route('/addDepartment',methods=['POST']) #done
def addDepartment():
    conn=sqlite3.connect('Webiclass.db')  
    c=conn.cursor()
    data=request.json
    print(data)
    dept=data["dptname"]
    query=c.execute("SELECT * FROM DEPARTMENT WHERE DEPARTMENT_NAME="+"\'"+dept+"\'")
    query=query.fetchall()
    collegeName="Sahyadri College of Engineering and Managment"
    if(len(query)):
      return {"status":"Department already exists"}
    c.execute("INSERT INTO DEPARTMENT VALUES("+"\'"+collegeName+"\'"+","+"\'"+dept+"\')")
    conn.commit()
    return {"status":"Success"}

@app.route('/addAdminDept',methods=['POST']) #done
def addAdminAdminDept():
    conn=sqlite3.connect('Webiclass.db')  
    c=conn.cursor()
    data=request.json
    print(data)
    name=data["adminname"]
    uid=data["adminuid"]
    email=data["adminemail"]
    role="2"
    hod_id="NULL"
    dpt=data["admindept"]
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
   user=c.execute("SELECT PASSWORD FROM USER WHERE EMAIL="+"\'"+data["studentemail"]+"\'")  
   user=user.fetchall()
   if(user):
      user=user[0][0]
      if(user!='NULL'):
        return{"status":"Email already exists"}  
   user=c.execute("SELECT PASSWORD FROM USER WHERE UID="+"\'"+data["studentusn"]+"\'")  
   user=user.fetchall()
   if(user):
      user=user[0][0]
      if(user!='NULL'):
        return {"status":"Invalid Uid"}
   
   role="4"
   q=c.execute("SELECT * FROM USER WHERE EMAIL="+"\'"+data["studentemail"]+"\' AND PASSWORD='NULL'")
   q=q.fetchall()
   if(len(q)):
      c.execute("UPDATE SET USER ROLE='4' WHERE EMAIL="+"\'"+data["studentemail"]+"\'")
      conn.commit()
      return {"status":"Success"}
   global uid
   dept=c.execute("SELECT DEPARTMENT_NAME FROM USER WHERE UID="+"\'"+uid+"\'")
   dept=dept.fetchall()
   print(dept)
   password='NULL'
   c.execute("INSERT INTO USER VALUES("+"\'"+data["studentusn"]+"\'"+","+"\'"+data["studentname"]+"\'"+","+"\'"+data["studentemail"]+"\'"+","+"\'"+role+"\'"+","+"\'"+uid+"\'"+","+"\'"+dept[0][0]+"\'"+","+password+")")
   conn.commit()
   secid=c.execute("SELECT SID FROM SECTION WHERE NAME="+"\'"+data["section"]+"\'")
   secid=secid.fetchall()
   secid=secid[0][0]
   c.execute("INSERT INTO STUDENT VALUES("+"\'"+data["studentusn"]+"\'"+","+"\'"+secid+"\'")
   conn.commit()
   return {"status":"Success"}


@app.route("/getSectionListAdminDept")
def getSectionListAdminMain():
    conn=sqlite3.connect('Webiclass.db')  
    c=conn.cursor()
    global uid
    query=c.execute("SELECT DEPARTMENT_NAME FROM USER WHERE UID="+"\'"+uid+"\'")
    query=query.fetchall()
    dpt=query[0][0]
    query=c.execute("SELECT SID,NAME FROM SECTION WHERE DEPARTMENT_NAME="+"\'"+dpt+"\'")
    query=query.fetchall()
    return {"section":query}
    
@app.route("/getFacultyListAdminDept",methods=['POST'])
def getFacultyListAdminMain():
    conn=sqlite3.connect('Webiclass.db')  
    c=conn.cursor()
    data=request.json
    sectionid=data["sectionid"]
    subjectcode=data["subjectcode"]
    subject=c.execute("SELECT U.NAME,U.UID FROM USER U WHERE U.ROLE='1' OR U.ROLE='3' AND U.UID NOT IN(SELECT UID FROM SUBJECT WHERE SID="+"\'"+sectionid+"\' AND CODE="+"\'"+subjectcode+"\')")
    subject=subject.fetchall()
    return {"faculty":subject}

@app.route("/getSubjectListAdminDept",methods=['POST'])
def getSubjectListAdminMain():
    conn=sqlite3.connect('Webiclass.db')  
    c=conn.cursor()
    data=request.json
    sectionid=data
    query=c.execute("SELECT SUBNAME,SUBCODE FROM SUB WHERE SUBCODE NOT IN(SELECT CODE FROM SUBJECT WHERE SID="+"\'"+sectionid+"\')")
    query=query.fetchall()
    return {"section":query}
   
@app.route('/getFacultyName')
def getFacultyName():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   global uid
   name=c.execute("SELECT NAME FROM USER WHERE UID="+"\'"+uid+"\'")
   name=name.fetchall()
   return {"name":name[0][0],"uid":uid}

@app.route('/home')
def home():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   global uid
   role=c.execute("SELECT ROLE FROM USER WHERE UID="+"\'"+uid+"\'")
   role=role.fetchall()
   print(role)
   role=role[0][0]
   
   if(role=="1" or role=="3" or role=="4"):
       query=c.execute("SELECT DEPARTMENT_NAME FROM USER WHERE UID="+"\'"+uid+"\'")
       query=query.fetchall()
       dpt=query[0][0]
       queryMaterial=c.execute("SELECT M.LINK,M.DESCRIPTION,M.TYPE,U.NAME,S.SUBNAME,U.DEPARTMENT_NAME,M.DATE FROM MATERIAL M,USER U,SUB S WHERE M.CODE=S.SUBCODE AND U.UID=M.UID AND U.DEPARTMENT_NAME="+"\'"+dpt+"\'")
       queryMaterial=queryMaterial.fetchall()
       return {"material":queryMaterial}
   
   queryMaterial=c.execute("SELECT DISTINCT SELECT M.LINK,M.DESCRIPTION,M.TYPE,U.NAME,S.SUBNAME,U.DEPARTMENT_NAME,M.DATE FROM MATERIAL M,USER U,SUBJECT S,SUB SS WHERE M.CODE=S.CODE AND S.CODE=SS.SUBCODE AND S.UID=U.UID")
   query=queryMaterial.fetchall()
   return {"material":query}

@app.route('/getDepartment')#done
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
   section=c.execute("SELECT S.SID,S.NAME FROM SECTION S WHERE S.DEPARTMENT_NAME="+"\'"+dept+"\'")
   section=section.fetchall()
   no_of_students=c.execute("SELECT S.SID,COUNT(ST.USN) FROM STUDENT ST,SECTION S WHERE ST.ID=S.SID AND S.DEPARTMENT_NAME="+"\'"+dept+"\'")
   no_of_students=no_of_students.fetchall()
   no_of_subject=c.execute("SELECT S.SID,COUNT(SU.CODE) FROM SUBJECT SU,SECTION S WHERE SU.SID=S.SID AND S.DEPARTMENT_NAME="+"\'"+dept+"\'")
   no_of_subject=no_of_subject.fetchall()
   return {"sections":section,"no_of_students":no_of_students,"no_of_subjects":no_of_subject}

@app.route('/addSection',methods=['POST'])
def addSection():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   print(data)
   section=data["section"]
   section_id=data["sectionId"]
   dept=data["dept"]
   c.execute("INSERT INTO SECTION VALUES("+"\'"+section_id+"\'"+","+"\'"+section+"\'"+","+"\'"+dept+"\')")
   conn.commit()
   return {"status":"success"}


@app.route('/getSectionTable',methods=['POST'])
def getSectionTable():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   section_id=data
   global uid
   dept=c.execute("SELECT DEPARTMENT_NAME FROM USER WHERE UID="+"\'"+uid+"\'")
   dept=dept.fetchall()
   dept=dept[0][0]
   queryMaterial=c.execute("SELECT DISTINCT M.LINK,M.DESCRIPTION,M.TYPE,U.NAME,S.SUBNAME,U.DEPARTMENT_NAME,M.DATE FROM MATERIAL M,USER U,SUB S WHERE S.SUBCODE=M.CODE AND U.UID=M.UID AND U.DEPARTMENT_NAME="+"\'"+dept+"\' AND "+"M.ID="+"\'"+section_id+"\'")
   queryMaterial=queryMaterial.fetchall()
   conn.commit()
   print(queryMaterial)
   return {"status":"success","material":queryMaterial}

@app.route('/getHandledSubjects',methods=['POST'])
def getHandledSubjects():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   print(data)
   section_id=data
   global uid
   query=c.execute("SELECT SS.SUBCODE,SS.SUBNAME FROM SUBJECT S,SUB SS WHERE SS.SUBCODE=S.CODE AND S.UID="+"\'"+uid+"\' AND S.SID="+"\'"+section_id+"\'")
   query=query.fetchall()
   return {"subjects":query}

@app.route('/addMaterial',methods=['POST'])
def addMaterial():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   print(data)
   link=data["link"]
   date=data["date"]
   subid=data["subid"]
   typeo=data["type"]
   desc=data["desc"]
   secId=data["secId"]
   global uid
   c.execute("INSERT INTO MATERIAL VALUES("+"\'"+link+"\'"+","+"\'"+date+"\'"+","+"\'"+typeo+"\'"+","+"\'"+desc+"\'"+","+"\'"+subid+"\'"+","+"\'"+secId+"\'"+","+"\'"+uid+"\')")
   conn.commit()
   return {"status":"Success"}

@app.route('/getStudentList',methods=['POST'])
def getStudentList():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   section=data
   query=c.execute("SELECT U.UID,U.NAME FROM USER U,STUDENT ST WHERE ST.USN=U.UID AND ST.ID="+"\'"+section+"\'")
   query=query.fetchall()
   conn.commit()
   return {"studentList":query}

@app.route('/attendance',methods=['POST'])
def attendance():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   usn=data["usn"]
   name=data["name"]
   date=data["date"]
   id=data["id"]
   link=c.execute("SELECT LINK FROM CLASS WHERE TIME="+"\'"+date+"\'")
   link=link.fetchall()
   status=c.execute("SELECT STATUS FROM ATTENDANCE WHERE UID="+"\'"+uid+"\' AND ID="+"\'"+id+"\'")
   status=status.fetchall()
   status=status[0][0]
   status=not status
   c.execute("INSERT INTO ATTENDANCE VALUES("+"\'"+id+"\'"+","+"\'"+status+"\'"+","+"\'"+date+"\'"+","+"\'"+usn+"\'"+","+"\'"+link+"\'")
   conn.commit()
   return {"status":"Success"}

@app.route('/getProfile')
def profile():
      conn=sqlite3.connect('Webiclass.db')
      c=conn.cursor()
      global uid
      profile=c.execute("SELECT UID,NAME,EMAIL,DEPARTMENT_NAME FROM USER WHERE UID="+"\'"+uid+"\'")
      profile1=profile.fetchall()
      role=c.execute("SELECT ROLE FROM USER WHERE UID="+"\'"+uid+"\'")
      role1=role.fetchall()
      print(role1)
      role1=role1[0][0]
      if(role1=="1" or role1=="3"):
         global uid
         material=c.execute("SELECT M.LINK,M.DESCRIPTION,M.TYPE,U.NAME,S.SUBNAME,U.DEPARTMENT_NAME,M.DATE FROM MATERIAL M,USER U,SUB S WHERE M.CODE=S.SUBCODE AND U.UID=M.UID AND U.UID="+"\'"+uid+"\'")
         return {"material":material.fetchall(),"details":profile1}
      global uid
      secid=c.execute("SELECT ID FROM STUDENT WHERE USN="+"\'"+uid+"\'")
      secid=secid.fetchall()
      secid=secid[0][0]
      material=c.execute("SELECT M.LINK,M.DESCRIPTION,M.TYPE,M.DATE,U.NAME,S.SUBNAME,U.DEPARTMENT_NAME,M.DATE FROM MATERIAL M,USER U,SUB S,STUDENT SS WHERE S.SUBCODE=M.CODE AND U.UID=M.UID AND SS.ID="+"\'"+secid+"\'")
      material=material.fetchall()
      conn.close()
      return {"details":profile1,"material":material}

@app.route('/addFaculty',methods=['POST'])
def addFaculty():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   user=c.execute("SELECT PASSWORD FROM USER WHERE EMAIL="+"\'"+data["email"]+"\'")  
   user=user.fetchall()
   if(user):
      user=user[0][0]
      if(user!='NULL'):
        return{"status":"Email already exists"}  
   user=c.execute("SELECT PASSWORD FROM USER WHERE UID="+"\'"+data["uid"]+"\'")  
   user=user.fetchall()
   if(user):
      user=user[0][0]
      if(user!='NULL'):
         return {"status":"Invalid Uid"}
   
   role="3"
   q=c.execute("SELECT * FROM USER WHERE EMAIL="+"\'"+data["email"]+"\' AND PASSWORD='NULL'")
   q=q.fetchall()
   if(len(q)):
      c.execute("UPDATE SET USER ROLE='3' WHERE EMAIL="+"\'"+data["email"]+"\'")
      conn.commit()
      return {"status":"Success"}
   global uid
   dept=c.execute("SELECT DEPARTMENT_NAME FROM USER WHERE UID="+"\'"+uid+"\'")
   dept=dept.fetchall()
   print(dept)
   password='NULL'
   c.execute("INSERT INTO USER VALUES("+"\'"+data["uid"]+"\'"+","+"\'"+data["name"]+"\'"+","+"\'"+data["email"]+"\'"+","+"\'"+role+"\'"+","+"\'"+uid+"\'"+","+"\'"+dept[0][0]+"\'"+","+password+")")
   conn.commit()
   return {"status":"Success"}

@app.route('/getFacultyList')
def getFacultyList():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   global uid
   dept=c.execute("SELECT DEPARTMENT_NAME FROM USER WHERE UID="+"\'"+uid+"\'")
   dept=dept.fetchall()
   dept=dept[0][0]
   faculty=c.execute("SELECT UID,NAME,EMAIL FROM USER WHERE ROLE='3' AND DEPARTMENT_NAME="+"\'"+dept+"\'")
   faculty=faculty.fetchall()
   print(faculty)
   return {"faculty":faculty}

@app.route('/deleteFaculty',methods=['POST'])
def deleteFaculty():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   c.execute("DELETE FROM USER WHERE UID=\'"+data+"\'")
   conn.commit()
   return {"status":"Success"}

@app.route('/getStudentListAdminDept')
def getStudentListAdminDept():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   global uid
   dept=c.execute("SELECT DEPARTMENT_NAME FROM USER WHERE UID="+"\'"+uid+"\'")
   dept=dept.fetchall()
   dept=dept[0][0]
   faculty=c.execute("SELECT UID,NAME,EMAIL FROM USER WHERE ROLE='4' AND DEPARTMENT_NAME="+"\'"+dept+"\'")
   faculty=faculty.fetchall()
   print(faculty)
   return {"faculty":faculty}

@app.route('/addSubject',methods=['POST'])
def addSubject():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   sub=c.execute("SELECT * FROM SUB WHERE SUBCODE="+"\'"+data["subjectcode"]+"\'")
   sub=sub.fetchall()
   if(sub):
      return {"status":"Subject already exists"}
   c.execute("INSERT INTO SUB VALUES("+"\'"+data["subjectname"]+"\'"+","+"\'"+data["subjectcode"]+"\'"+")")
   conn.commit()
   return {"status":"Success"}

@app.route('/assignFaculty',methods=['POST'])
def assignFaculty():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   section=data["section"]
   subject=data["subject"]
   faculty=data["faculty"]
   c.execute("INSERT INTO SUBJECT VALUES("+"\'"+subject+"\'"+","+"\'"+section+"\'"+","+"\'"+faculty+"\')")
   conn.commit()
   return {"status":"Success"}

@app.route('/addClassLink',methods=['POST'])
def addClassLink():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   link=data["classLink"]
   section=data["section"]
   time=data["time"]
   code=data["subcode"]
   date=data["date"]
   c.execute("INSERT INTO CLASS VALUES("+"\'"+link+"\'"+","+"\'"+time+"\'"+","+"\'"+code+"\'"+","+"\'"+section+"\'"+","+"\'"+date+"\'"+")")

   conn.commit()
   return {"status":"Success"}

@app.route('/getSubjectList',methods=['POST'])
def getSubjectList():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   section=data
   global uid
   querya=c.execute("SELECT CODE FROM SUBJECT WHERE SID="+"\'"+section+"\' AND UID="+"\'"+uid+"\'")
   querya=querya.fetchall()
   return {"subject":querya}