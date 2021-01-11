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
def setCurrentCollege(emailQueried):
  conn=sqlite3.connect('Webiclass.db')
  c=conn.cursor()
  query=c.execute("SELECT COLLEGE_NAME FROM CREDENTIALS WHERE EMAIL="+"\'"+emailQueried+"\'")
  query=query.fetchall()   
  global currentCollege
  currentCollege=query[0][0]
  conn.close()

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
  conn.close()
  return {"status":"Success","role":role}

@app.route('/register',methods=['POST'])
def register():
  try:
     conn=sqlite3.connect('Webiclass.db')
     c=conn.cursor()
     data=request.json
     email=data['email']
     password=data['password']
     college=data['college']
     role=getRole(email)
     setCurrentCollege(email)
     with sqlite3.connect('Webiclass.db') as conn:
       c=conn.cursor()
       queryCredential="INSERT INTO CREDENTIALS VALUES("+"\'"+email+"\'"+","+"\'"+password+"\'"+","+"\'"+college+"\'"+","+"NULL)"
       insertCredential= c.execute(queryCredential)
       status="Success"
  except:
    conn.rollback()
    role='NULL'
    status="Email Already exist"
  finally:
     conn.commit()
     conn.close()
     return {"status":status,"role":role}

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
   material=c.execute("SELECT M.LINK,M.DESCRIPTION,M.TYPE,F.NAME,M.SUBJECT_NAME,D.DEPT_NAME,M.DATE_ADDED FROM MATERIAL M,FACULTY F,DEPARTMENT D WHERE F.MAIL_ID=M.FACULTY_MAIL_ID AND F.DEPT_ID=D.DEPT_ID")
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

@app.route('/sortByDept',methods=['POST'])
def sortDept():
     conn=sqlite3.connect('Webiclass.db')   
     c=conn.cursor()
     queryDept="SELECT * FROM DEPARTMENT ORDER BY DEPT_NAME"
     sortedDept=c.execute(queryDept)
     sortedDept=sortedDept.fetchall()
     conn.close()     
     return {sortedDept}

