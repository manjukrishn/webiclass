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
  data=request.json
  email=data['email']
  password=data['password']

  if(userLoggedIn(email,password)>=1):
    return {"status":"Email Not registered"}
  elif(userLoggedIn(email,password)==2):
    return {"status":"Invalid password"}
  
  global role
  return {"status":"Success","role":role}      

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

  c.execute("INSERT INTO USER VALUES("+"\'"+uid+"\'"+",\'"+name+",\'"+email+"\'"+","+"\'4\'"+","+"\'\'"+","+"\'\'"+","+"\'"+password+"\')")
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
    conn.close()
    return {"status":"Success"}

@app.route("/getSectionListAdminDept")
def getSectionListAdminMain():
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
def getSubjectListAdminMain():
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
       queryMaterial=c.execute("SELECT M.LINK,M.TYPE,U.NAME,S.NAME,U.DEPARTMENT_NAME,M.DATE FROM MATERIAL M,USER U,SUBJECT S WHERE S.CODE=M.CODE AND S.UID=U.UID AND U.DEPARTMENT_NAME="+"\'"+dpt+"\'")
       queryMaterial=queryMaterial.fetchall()
       return {"material":queryMaterial}
   
   queryMaterial=c.execute("SELECT M.LINK,M.TYPE,U.NAME,S.NAME,U.DEPARTMENT_NAME,M.DATE FROM MATERIAL M,USER U,SUBJECT S WHERE M.CODE=S.CODE AND S.UID=U.UID")
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
   query=c.execute("SELECT S.CODE,S.NAME FROM SUBJECT WHERE S S.UID="+"\'"+uid+"\' AND S.SID="+"\'"+section_id+"\'")
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

# @app.route('/getStudentList',methods=['POST'])
# def getStudentList():
#    conn=sqlite3.connect('Webiclass.db')
#    c=conn.cursor()
#    data=request.json
#    section=data["section"]
#    subject=data["subject"]
#    time=data["time"]
#    date=data["date"] 
#    query=c.execute("SELECT U.UID,U.NAME FROM USER U,STUDENT ST WHERE ST.USN=U.UID AND ST.ID="+"\'"+section+"\'")
#    query=query.fetchall()
#    conn.commit()
#    return {"studentList":query}

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
   data=request.json
   global uid
   profile=c.execute("SELECT UID,NAME,EMAIL,DEPARTMENT_NAME FROM USER WHERE UID="+"\'"+uid+"\'")
   profile=profile.fetchall()
   role=c.execute("SELECT ROLE FROM USER WHERE UID="+"\'"+uid+"\'")
   role=role.fetchall()
   role=role[0][0]
   if(role=="1" or role=="3"):
      material=c.execute("SELECT M.LINK,M.DESCRIPTION,M.TYPE,M.DATE,U.NAME,S.NAME,U.DEPARTMENT_NAME,M.DATE FROM MATERIAL M,USER U,SUBJECT S WHERE S.CODE=M.CODE AND U.UID=M.UID")
      return {"material":material}
   id=c.execute("SELECT ID FROM STUDENT WHERE USN="+"\'"+uid+"\'")
   id=id.fetchall()
   print(id)
   id=id[0]
   material=c.execute("SELECT M.LINK,M.DESCRIPTION,M.TYPE,M.DATE,U.NAME,S.NAME,U.DEPARTMENT_NAME,M.DATE FROM MATERIAL M,USER U,SUBJECT S,STUDENT SS WHERE S.CODE=M.CODE AND U.UID=SS.USN AND SS.ID="+"\'"+id+"\'")
   material=material.fetchall()
   conn.close()
   return {"details":profile,"material":material}
