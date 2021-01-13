from flask import Flask,request,session,jsonify
import sqlite3
import time

app=Flask(__name__)
conn=sqlite3.connect('Webiclass.db')
#c.execute("CREATE TRIGGER insert_into_college AFTER INSERT ON COLLEGE BEGIN DELETE FROM ARCHIVED_COLLEGE WHERE URL=(SELECT C.URL FROM COLLEGE C,ARCHIVED_COLLEGE A WHERE A.URL=C.URL);END;")
#c.execute('CREATE TABLE COLLEGE(URL TEXT PRIMARY KEY,COLLEGE_NAME TEXT NOT NULL, ADMIN_MAIL_ID NOT NULL)')
#c.execute('CREATE TABLE DEPARTMENT(DEPT_ID TEXT PRIMARY KEY, DEPT_NAME TEXT NOT NULL, COLLEGE_NAME TEXT NOT NULL, FOREIGN KEY(COLLEGE_NAME) REFERENCES COLLEGE(COLLEGE_NAME) ON DELETE CASCADE)')
#c.execute('CREATE TABLE FACULTY(MAIL_ID TEXT PRIMARY KEY, ROLE TEXT, NAME TEXT, HOD_MAIL_ID TEXT NOT NULL, DEPT_ID TEXT NOT NULL, FOREIGN KEY (DEPT_ID) REFERENCES DEPARTMENT(DEPT_ID))')
#c.execute('CREATE TABLE FACULTY(MAIL_ID TEXT PRIMARY KEY, ROLE TEXT, NAME TEXT, DEPT_ID TEXT NOT NULL, FOREIGN KEY (DEPT_ID) REFERENCES DEPARTMENT(DEPT_ID))')
#c.execute('ALTER TABLE DEPARTMENT ADD COLUMN HOD_MAIL_ID TEXT REFERENCES FACULTY(MAIL_ID)')
#c.execute('ALTER TABLE FACULTY ADD COLUMN HOD_MAIL_ID TEXT REFERENCES FACULTY(MAIL_ID)')
#c.execute('CREATE TABLE SECTION(SECTION_ID TEXT PRIMARY KEY, SECTION_NAME TEXT NOT NULL, NO_OF_SUBJECTS INTEGER, NO_OF_STUDENTS INTEGER, DEPT_ID TEXT, FOREIGN KEY(DEPT_ID) REFERENCES DEPARTMENT(DEPT_ID))')
#c.execute('CREATE TABLE MATERIAL(LINK TEXT PRIMARY KEY,COLLEGE_NAME TEXT NOT NULL, TYPE TEXT NOT NULL, DATE_ADDED TEXT, SUBJECT_NAME TEXT NOT NULL, SECTION_ID TEXT, FACULTY_MAIL_ID TEXT, FOREIGN KEY(COLLEGE_NAME) REFERENCES COLLEGE(COLLEGE_NAME), FOREIGN KEY(SECTION_ID) REFERENCES SECTION(SECTION_ID), FOREIGN KEY(FACULTY_MAIL_ID) REFERENCES FACULTY(MAIL_ID))')
#c.execute('CREATE TABLE OTHERS(EMAIL TEXT PRIMARY KEY,PASSWORD TEXT NOT NULL,COLLEGE_NAME TEXT, FOREIGN KEY(COLLEGE_NAME) REFERENCES COLLEGE(COLLEGE_NAME))')
#c.execute('ALTER TABLE OTHERS RENAME TO CREDENTIALS')
#c.execute('CREATE TABLE ARCHIVED_COLLEGE(URL TEXT)')

currentCollege="none"
currentUser="none"
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
  college=data['college']
  queryEmail="SELECT * FROM CREDENTIALS WHERE EMAIL=\'"+email+"\'"
  rowEmail=c.execute(queryEmail)
  rowEmail=rowEmail.fetchall()
  if(len(rowEmail)>=1):
    status="Email Already exist"
  else:
     queryRole=c.execute("SELECT ROLE FROM FACULTY WHERE MAIL_ID="+"\'"+email+"\'")
     queryRole=queryRole.fetchall()
     queryCredential="INSERT INTO CREDENTIALS VALUES("+"\'"+email+"\'"+","+"\'"+password+"\'"+","+"\'"+college+"\'"+","+"\'"+queryRole[0][0]+"\'"+")"
     insertCredential= c.execute(queryCredential)
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
          e.execute("INSERT INTO COLLEGE(URL,COLLEGE_NAME,ADMIN_MAIL_ID) SELECT URL,COLLEGE_NAME,ADMIN_ID FROM ARCHIVED_COLLEGE WHERE URL="+"\'"+college+"\'")        
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

@app.route('/home',methods=['GET'])
def home():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   material=c.execute("SELECT DISTINCT M.LINK,M.DESCRIPTION,M.TYPE,F.NAME,M.SUBJECT_NAME,D.DEPT_NAME,M.DATE_ADDED FROM MATERIAL M,FACULTY F,DEPARTMENT D WHERE F.MAIL_ID=M.FACULTY_MAIL_ID AND F.DEPT_ID=D.DEPT_ID AND M.COLLEGE_NAME="+"\'"+currentCollege+"\'")
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

@app.route('/getDepartment',methods=['GET'])
def dept():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   dept=c.execute("SELECT DEPT_NAME FROM DEPARTMENT WHERE COLLEGE_NAME="+"\'"+currentCollege+"\'")
   dept=dept.fetchall()
   conn.close()
   return {"dept":dept}

@app.route('/getSection',methods=['POST'])
def getSection():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   data=request.json
   dept=data['dept']
   print(dept)
   dept=c.execute("SELECT S.SECTION_ID,S.SECTION_NAME,S.NO_OF_SUBJECTS,S.NO_OF_STUDENTS FROM SECTION S, DEPARTMENT D WHERE D.DEPT_ID=S.DEPT_ID AND D.COLLEGE_NAME="+"\'"+currentCollege+"\'"+"AND DEPT_NAME="+"\'"+dept+"\'")
   dept=dept.fetchall()
   conn.close()
   print(dept)
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
   queryAddSection=c.execute("INSERT INTO SECTION VALUES("+"\'"+section_id+"\'"+"\'"+section_name+"\'"+"\'"+no_of_subjects+"\'"+"\'"+no_of_students+"\'"+"\'"+dept_id+"\'"+")")
   conn.commit()
   conn.close()
   conn.close()

@app.route('/getSectionTable',methods=['POST'])
def getSectionTable():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   data=request.json
   sec_id=data['secId']
   dept=data['dept']
   print(sec_id)
   material=c.execute("SELECT DISTINCT M.LINK,M.DESCRIPTION,M.TYPE,F.NAME, M.SUBJECT_NAME,D.DEPT_NAME, M.DATE_ADDED FROM MATERIAL M,FACULTY F,SECTION S,DEPARTMENT D WHERE F.MAIL_ID=M.FACULTY_MAIL_ID AND F.DEPT_ID=S.DEPT_ID AND M.SECTION_ID="+"\'"+sec_id+"\'AND D.DEPT_NAME="+"\'"+dept+"\'AND D.COLLEGE_NAME="+"\'"+currentCollege+"\'")
   material=material.fetchall()   
   conn.close()
   return {"material":material}

@app.route("/getProfile")
def getTeacherDetails():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   details=c.execute("SELECT F.NAME,D.DEPT_NAME,F.ROLE FROM DEPARTMENT D, FACULTY F WHERE D.DEPT_ID=F.DEPT_ID AND F.MAIL_ID="+"\'"+currentUser+"\'")
   details=details.fetchall()
   print(currentUser)
   materials=c.execute("SELECT DISTINCT M.LINK,M.DESCRIPTION, M.TYPE,F.NAME, M.SUBJECT_NAME,D.DEPT_NAME, M.DATE_ADDED FROM MATERIAL M,FACULTY F, DEPARTMENT D WHERE F.MAIL_ID=M.FACULTY_MAIL_ID AND D.DEPT_ID=F.DEPT_ID AND M.FACULTY_MAIL_ID="+"\'"+currentUser+"\'")
   materials=materials.fetchall()
   conn.close()
   return {"details":details,"material":materials}
  
@app.route('/addMaterial',methods=['POST'])
def addMaterial():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   data=request.json
   material=data['material']
   print(material)
   c.execute("INSERT INTO MATERIAL VALUES("+"\'"+material["link"]+"\'"+","+"\'"+currentCollege+"\'"+","+"\'"+material["types"]+"\'"+","+"\'"+material["date"]+"\'"+","+"\'"+material["subject"]+"\'"+","+"\'"+material["secId"]+"\'"+","+"\'"+material["facultyMailId"]+"\'"+","+"\'"+material['desc']+"\')")
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

@app.route('/sortByType',methods=['POST'])
def sortType():
   conn=sqlite3.connect('Webiclass.db')     
   c=conn.cursor()
   queryType="SELECT * FROM MATERIAL ORDER BY TYPE"
   sortedType=c.execute(queryType)
   sortedType=sortedType.fetchall()
   conn.close()
   return {"sortedType":sortedType}

@app.route('/sortBySub',methods=['POST'])
def sortSub():
     conn=sqlite3.connect('Webiclass.db')   
     c=conn.cursor()
     querySub="SELECT * FROM MATERIAL ORDER BY SUBJECT_NAME"
     sortedSub=c.execute(querySub)
     sortedSub=sortedSub.fetchall()
     conn.close()
     return {"sortedSub":sortedSub}

@app.route("/getMailId")
def getMail():
    return {"mail":currentUser,"college":currentCollege}

@app.route('/sortByDept',methods=['POST'])
def sortDept():
     conn=sqlite3.connect('Webiclass.db')   
     c=conn.cursor()
     queryDept="SELECT * FROM DEPARTMENT ORDER BY DEPT_NAME"
     sortedDept=c.execute(queryDept)
     sortedDept=sortedDept.fetchall()
     conn.close()     
     return {sortedDept}

