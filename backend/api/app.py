from flask import Flask,request,session,jsonify
import sqlite3
import time

app=Flask(__name__)
conn=sqlite3.connect('Webiclass.db')
c=conn.cursor()
conn.commit()

role=""
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

@app.route('addAdminAdminDept',methods=['POST'])
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
    
@app.route('/home')
def home():
   conn=sqlite3.connect('Webiclass.db')
   c=conn.cursor()
   global currentDept
   global currentCollege
   material=c.execute("SELECT DISTINCT M.LINK,M.DESCRIPTION,M.TYPE,C.NAME,S.NAME,D.NAME,M.DATE_ADDED FROM MATERIAL M,FACULTY F,DEPARTMENT D,SUB S,CREDENTIALS C WHERE M.SUBID=S.ID AND D.ID="+"\'"+currentDept+"\'")
   material=material.fetchall()
   conn.close()
   return {"material":material,"college_name":currentCollege}
