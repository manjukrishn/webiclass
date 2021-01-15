from flask import Flask,request,session,jsonify
import sqlite3
import time

app=Flask(__name__)
conn=sqlite3.connect('Webiclass.db')
c=conn.cursor()
#c.execute("CREATE TRIGGER insert_into_college AFTER INSERT ON COLLEGE BEGIN DELETE FROM ARCHIVED_COLLEGE WHERE URL=(SELECT C.URL FROM COLLEGE C,ARCHIVED_COLLEGE A WHERE A.URL=C.URL);END;")
# c.execute("CREATE TABLE COLLEGE(URL TEXT PRIMARY KEY, NAME TEXT,IMAGE TEXT)")
# c.execute("CREATE TABLE ADMINDEPT(MAIL_ID TEXT PRIMARY KEY,NAME TEXT,DEPT_ID TEXT,FOREIGN KEY(DEPT_ID) REFERENCES DEPARTMENT(DEPT_ID))")
# c.execute("CREATE TABLE ADMINMAIN(MAIL_ID TEXT PRIMARY KEY,NAME TEXT)")
# c.execute('CREATE TABLE ADMINCOLLEGE(MAIL_ID TEXT PRIMARY KEY,NAME TEXT,URL TEXT, FOREIGN KEY(URL) REFERENCES COLLEGE(URL) ON UPDATE CASCADE)')
# c.execute('CREATE TABLE STUDENT(MAIL_ID TEXT PRIMARY KEY,NAME TEXT,SECID TEXT, FOREIGN KEY(SECID) REFERENCES SECTION(SECTION_ID) ON UPDATE CASCADE)')
#c.execute('CREATE TABLE COLLEGE(URL TEXT PRIMARY KEY,COLLEGE_NAME TEXT NOT NULL, ADMIN_MAIL_ID NOT NULL)')
#c.execute('CREATE TABLE DEPARTMENT(DEPT_ID TEXT PRIMARY KEY, DEPT_NAME TEXT NOT NULL, COLLEGE_NAME TEXT NOT NULL, FOREIGN KEY(COLLEGE_NAME) REFERENCES COLLEGE(COLLEGE_NAME) ON DELETE CASCADE)')
#c.execute('CREATE TABLE FACULTY(MAIL_ID TEXT PRIMARY KEY, ROLE TEXT, NAME TEXT, HOD_MAIL_ID TEXT NOT NULL, DEPT_ID TEXT NOT NULL, FOREIGN KEY (DEPT_ID) REFERENCES DEPARTMENT(DEPT_ID))')
#c.execute('CREATE TABLE FACULTY(MAIL_ID TEXT PRIMARY KEY, ROLE TEXT, NAME TEXT, DEPT_ID TEXT NOT NULL, FOREIGN KEY (DEPT_ID) REFERENCES DEPARTMENT(DEPT_ID))')
#c.execute('CREATE TABLE SECTION(SECTION_ID TEXT PRIMARY KEY, SECTION_NAME TEXT NOT NULL, NO_OF_SUBJECTS INTEGER, NO_OF_STUDENTS INTEGER, DEPT_ID TEXT, FOREIGN KEY(DEPT_ID) REFERENCES DEPARTMENT(DEPT_ID))')
#c.execute('CREATE TABLE ARCHIVED_COLLEGE(URL TEXT)')
#c.execute('CREATE TABLE MATERIAL(LINK TEXT PRIMARY KEY,COLLEGE_NAME TEXT NOT NULL, TYPE TEXT NOT NULL, DATE_ADDED TEXT, SUBJECT_NAME TEXT NOT NULL, SECTION_ID TEXT, FACULTY_MAIL_ID TEXT, FOREIGN KEY(COLLEGE_NAME) REFERENCES COLLEGE(COLLEGE_NAME), FOREIGN KEY(SECTION_ID) REFERENCES SECTION(SECTION_ID), FOREIGN KEY(FACULTY_MAIL_ID) REFERENCES FACULTY(MAIL_ID))')
#c.execute('ALTER TABLE DEPARTMENT ADD COLUMN HOD_MAIL_ID TEXT REFERENCES FACULTY(MAIL_ID)')
#c.execute('ALTER TABLE FACULTY ADD COLUMN HOD_MAIL_ID TEXT REFERENCES FACULTY(MAIL_ID)')
# c=conn.cursor()
conn.commit()
currentCollege="none"
currentUser="none"
conn.close()

def setCurrentCollege(emailQueried):
  conn=sqlite3.connect('Webiclass.db')
  c=conn.cursor()
  query=c.execute("SELECT COLLEGE_NAME FROM CREDENTIALS WHERE EMAIL="+"\'"+emailQueried+"\'")
  query=query.fetchall()   
  global currentCollege
  currentCollege=query[0][0]
  print(query)
  conn.close()

def setCurrentUser(emailQueried):
   global currentUser
   currentUser=emailQueried

def getRole(emailQueried):
  conn=sqlite3.connect('Webiclass.db')
  c=conn.cursor()
  queryRole="SELECT ROLE FROM CREDENTIALS WHERE EMAIL=\'"+emailQueried+"\'"
  rowQuery=c.execute(queryRole)
  rowQuery=rowQuery.fetchall()
  print(rowQuery)
  conn.close()
  return rowQuery

@app.route('/login',methods=['POST'])
def login():
  conn=sqlite3.connect('Webiclass.db')
  data=request.json
  email=data['email']
  password=data['password']
  c=conn.cursor()
  queryEmail="SELECT * FROM CREDENTIALS WHERE EMAIL=\'"+email+"\'"
  rowEmail=c.execute(queryEmail)
  rowEmail=rowEmail.fetchall()
  if len(rowEmail) == 0:
    return {"status":"Not registered"}
  queryCredential="SELECT * FROM CREDENTIALS WHERE EMAIL=\'"+email+"\'"+"AND PASSWORD=\'"+password+"\'"
  rowCredential=c.execute(queryCredential)
  rowCredential=rowCredential.fetchall()
  if len(rowCredential)==0:
    return {"status":"Invalid Password"}
  role=getRole(email)
  setCurrentCollege(email)
  setCurrentUser(email)
  conn.close()
  return {"status":"Success","role":role}

@app.route('/register',methods=['POST'])
def register():
  conn=sqlite3.connect('Webiclass.db')
  c=conn.cursor()
  data=request.json
  email=data['email']
  password=data['password']
  queryEmail="SELECT * FROM CREDENTIALS WHERE EMAIL=\'"+email+"\'"
  rowEmail=c.execute(queryEmail)
  rowEmail=rowEmail.fetchall()
  if(len(rowEmail)>=1):
    status="Email Already exist"
  else:
     queryCredential="INSERT INTO CREDENTIALS VALUES("+"\'"+email+"\'"+","+"\'"+password+"\'"+","+"STUDENT)"
     c.execute(queryCredential)
     conn.commit()
     conn.close()
     status="Success"
  return {"status":status}

@app.route('/admin-college',methods=['GET','POST'])
def get_admin_college():
    return "Hello"

@app.route('/admin-main',methods=['GET','POST'])
def get_admin_main():
    conn=sqlite3.connect('Webiclass.db')  
    e=conn.cursor()
    if request.method == 'POST':
      data=request.json
      college=data['college_url']
      try:
        print(college)
        if(data['approve']):
          e.execute("INSERT INTO COLLEGE(URL,NAME,IMAGE) SELECT URL,NAME,IMAGE FROM ARCHIVED_COLLEGE WHERE URL="+"\'"+college+"\'")        
        e.execute("DELETE FROM ARCHIVED_COLLEGE WHERE URL="+"\'"+college+"\'")
        status="Success"
      except:
        status="Failed"
      finally:
        conn.commit()
        conn.close()
        return {"status":status}
    else:
      queryC=e.execute("SELECT URL FROM ARCHIVED_COLLEGE")
      queryC=queryC.fetchall()
      conn.commit()
      conn.close()
      return {"college_url":queryC} 

@app.route('/home',methods=['POST'])
def home():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   data=request.json
   deptid=data['deptid']
   currentCollege=c.execute("SELECT URL FROM DEPARTMENT WHERE ID="+"\'"+deptid+"\'")
   material=c.execute("SELECT DISTINCT M.LINK,M.DESCRIPTION,M.TYPE,F.NAME,S.NAME,D.NAME,M.DATE_ADDED FROM MATERIAL M,FACULTY F,DEPARTMENT D,SUBJECT S WHERE M.SUBID=S.ID AND S.EMAIL=F.EMAIL AND D.ID="+"\'"+deptid+"\'")
   material=material.fetchall()
   conn.close()
   return {"material":material,"college_name":currentCollege}

@app.route('/college',methods=['GET','POST'])
def college():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   colleges=c.execute("SELECT * FROM COLLEGE")
   colleges=colleges.fetchall()
   conn.close()
   return {"colleges":colleges}

@app.route('/getDepartment',methods=['POST'])
def dept():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   data=request.json
   url=data['url']
   dept=c.execute("SELECT NAME FROM DEPARTMENT WHERE URL="+"\'"+url+"\'")
   dept=dept.fetchall()
   conn.close()
   return {"dept":dept}

@app.route('/getSection',methods=['POST'])
def getSection():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   data=request.json
   deptid=data['deptid']   
   dept=c.execute("SELECT S.SECTION_ID,S.SECTION_NAME,S.NO_OF_SUBJECTS,S.NO_OF_STUDENTS FROM SECTION S WHERE S.ID="+"\'"+deptid+"\'")
   dept=dept.fetchall()
   conn.close()
   return {"sections":dept}

@app.route('/setSection',methods=['POST'])
def setSection():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   data=request.json
   dept_id=data['dept']
   section_name=data['section_name']
   no_of_subjects=data['no_of_subjects']
   no_of_students=data['no_of_students']
   section_id=data['section_id']
   c.execute("INSERT INTO SECTION VALUES("+"\'"+section_id+"\'"+"\'"+section_name+"\'"+"\'"+no_of_subjects+"\'"+"\'"+no_of_students+"\'"+"\'"+dept_id+"\'"+")")
   conn.commit()
   conn.close()
   conn.close()

@app.route('/getSectionTable',methods=['POST'])
def getSectionTable():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   data=request.json
   sec_id=data['secId']
   material=c.execute("SELECT DISTINCT M.LINK,M.DESCRIPTION,M.TYPE,F.NAME,S.NAME,D.NAME,M.DATE_ADDED FROM MATERIAL M,FACULTY F,SUBJECT S WHERE M.SUBID=S.ID AND S.EMAIL=F.EMAIL AND S.SEC_ID="+"\'"+sec_id+"\'")   
   material=material.fetchall()   
   conn.close()
   return {"material":material}

@app.route("/getProfile")
def getTeacherDetails():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   data=request.json
   deptid=data['deptid']
   email=data['email']
   name=c.execute("SELECT NAME FROM FACULTY WHERE EMAIL="+"\'"+email+"\'"+" UNION SELECT NAME FROM STUDENT WHERE EMAIL="+"\'"+email+"\'"+" UNION SELECT NAME FROM ADMINDEPT WHERE EMAIL"="\'"+email+"\'")
   name=name.fetchall()
   deptname=c.execute("SELECT NAME FROM DEPARTMENT WHERE ID="+"\'"+deptid+"\'")
   deptname=deptname.fetchall()
   material=c.execute("SELECT DISTINCT M.LINK,M.DESCRIPTION,M.TYPE,F.NAME,S.NAME,D.NAME,M.DATE_ADDED FROM MATERIAL M,FACULTY F,SUBJECT S WHERE M.SUBID=S.ID AND S.EMAIL=F.EMAIL AND S.EMAIL="+"\'"+email+"\'")   
   materials=material.fetchall()
   conn.close()
   return {"name":name,"deptname":deptname,"material":materials}
  
@app.route('/addMaterial',methods=['POST'])
def addMaterial():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   data=request.json
   material=data['material']
   print(material)
   c.execute("INSERT INTO MATERIAL VALUES("+"\'"+material["link"]+"\'"+","+"\'"+material["desc"]+"\'"+","+"\'"+material["types"]+"\'"+","+"\'"+material["date"]+"\'"+","+"\'"+material["subject_id"]+"\')")
   conn.commit()   
   conn.close()
   return {"status":"success"}

@app.route('/addSection',methods=['POST'])
def addSection():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   data=request.json
   section=data['section']
   c.execute("INSERT INTO SECTION VALUES("+"\'"+section["secId"]+"\'"+","+"\'"+section["name"]+"\'"+","+"\'"+section["no_of_subjects"]+"\'"+","+"\'"+section["no_of_students"]+"\'"+","+"\'"+section["deptId"]+"\')")
   conn.commit()   
   conn.close()
   return {"status":"success"}

@app.route('/deleteMaterial',methods=['POST'])
def deleteMaterial():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   data=request.json
   link=data['link']
   print(link)
   c.execute("DELETE FROM MATERIAL WHERE LINK="+"\'"+link+"\'")
   conn.commit()   
   conn.close()
   return {"status":"success"}

@app.route('/updateProfile',methods=['POST'])
def updateProfile():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   data=request.json
   prevEmail=data['prevEmail']
   newEmail=data['newEmail']
   name=data['name']
   c.execute("UPDATE CREDENTIALS SET EMAIL="+"\'"+newEmail+"\'"+"WHERE EMAIL="+"\'"+prevEmail+"\'")
   conn.commit()
   c.execute("UPDATE FACULTY SET NAME="+"\'"+name+"\'"+" WHERE EMAIL="+"\'"+newEmail+"\'")
   conn.commit()
   c.execute("UPDATE ADMINCOLLEGE NAME="+"\'"+name+"\'"+" WHERE EMAIL="+"\'"+newEmail+"\'")
   conn.commit()   
   c.execute("UPDATE ADMINDEPT SET NAME="+"\'"+name+"\'"+" WHERE EMAIL="+"\'"+newEmail+"\'")
   conn.commit()
   c.execute("UPDATE STUDENT SET NAME="+"\'"+name+"\'"+"WHERE EMAIL="+"\'"+newEmail+"\'")   
   conn.commit()
   conn.close()
   return {"status":"success"}

@app.route("/addAttendance")
def addAttendance():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   data=request.json
   attendance=data["attendance"]
   id=data["id"]
   subid=data["subid"]
   for i in len(attendance):
      c.execute("INSERT INTO PRESENCE VALUES("+"\'"+id+"\'"+","+"\'"+attendance[i]["date"]+"\'"+","+"\'"+attendance[i]["time"]+"\'"+","+"\'"+subid+"\'"+","+"\'"+attendance[i]["usn"]+"\'"+","+"\'"+attendance[i]["status"]+"\')")
      conn.commit()
   return {"status":"success"}      

@app.route("/getAttendance")
def addAttendance():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   data=request.json
   attendance=data["usn"]
   attendanceList=c.execute("SELECT * FROM ATTENDANCE WHERE USN="+"\'"+usn+"\'")
   attendanceList=attendanceList.fetchall()
   return {"list":attendanceList}      

@app.route("/addProfessor")
def addProfessor():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   data=request.json
   profs=data["profs"]
   hod=data["hod"]
   id=data["id"]
   for i in len(profs):
      c.execute("INSERT INTO FACULTY VALUES("+"\'"+profs[i]["email"]+"\'"+","+"\'"+profs[i]["name"]+"\'"+","+"\'"+hod+"\'"+","+"\'"+id+"\')")
      conn.commit()
   return {"status":"Success"}

@app.route("/removeProfessor")
def removeProfessor():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   data=request.json
   profs=data["profs"]
   hod=data["hod"]
   id=data["id"]
   for i in len(profs):
      c.execute("DELETE FROM FACULTY WHERE EMAIL="+"\'"+profs[i]["email"]+"\'")
      conn.commit()
   return {"status":"Success"}

@app.route("/addStudent")
def addStudent():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   data=request.json
   student=data["student"]
   id=data["id"]
   for i in len(student):
      c.execute("INSERT INTO STUDENT VALUES("+"\'"+student[i]["email"]+"\'"+","+"\'"+student[i]["usn"]+"\'"+","+"\'"+student[i]["name"]+"\'"+","+"\'"+id+"\')")
      conn.commit()
   return {"status":"Success"}

@app.route("/removeStudent")
def removeStudent():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   data=request.json
   student=data["student"]
   id=data["id"]
   for i in len(profs):
      c.execute("DELETE FROM STUDENT WHERE EMAIL="+"\'"+student[i]["email"]+"\'")
      conn.commit()
   return {"status":"Success"}

@app.route("/getMailId")
def getMail():
    return {"mail":currentUser,"college":currentCollege}
