-- -- SQLite

SELECT * FROM COLLEGE;
SELECT * FROM CREDENTIALS;
SELECT * FROM DEPARTMENT;
SELECT * FROM FACULTY;
-- INSERT INTO COLLEGE VALUES('https://www.sahyadri.edu.in/','Sahyadri College of Engineering and Managment','admin.sahyadri@sahyadri.edu.in');
-- DELETE FROM COLLEGE WHERE URL='&URL';
-- INSERT INTO COLLEGE VALUES('https://www.canaraengineering.in/','Canara Engineering College','admin.webiclass@canaraengineering.in');
-- UPDATE COLLEGE SET ADMIN_MAIL_ID='admin.webiclass@sahyadri.edu.in' WHERE URL='https://www.sahyadri.edu.in/';
-- INSERT INTO COLLEGE VALUES('https://www.nmamit.nitte.edu.in/','NMAM Institute of Technology ','admin.webiclass@nmamit.nitte.edu.in');
-- INSERT INTO CREDENTIALS VALUES('admin.webiclass@sahyadri.edu.in','12345','Sahyadri College of Engineering and Managment');

-- INSERT INTO CREDENTIALS VALUES('HOD.basicscience@NMAM.in','12345','NMAM Institute of Technology');
-- INSERT INTO CREDENTIALS VALUES('ramesh123@gmail.com','12345','NMAM Institute of Technology');
-- INSERT INTO CREDENTIALS VALUES('manjukrishna123@gmail.com','12345','NMAM Institute of Technology');

-- INSERT INTO CREDENTIALS VALUES('admin.webiclass@canaraengineering.in','12345','Canara Engineering College');
-- INSERT INTO CREDENTIALS VALUES('admin.webiclass@nmamit.nitte.edu.in','12345','NMAM Institute of Technology');
-- UPDATE COLLEGE SET COLLEGE_NAME='Sahyadri College of Engineering and Management' WHERE URL='https://www.sahyadri.edu.in/' 
-- ALTER TABLE COLLEGE DROP COLUMN COLLEGE_NAME;

-- DROP TABLE COLLEGE;
-- CREATE TABLE COLLEGE(URL TEXT PRIMARY KEY, COLLEGE_NAME TEXT, ADMIN_MAIL_ID TEXT);
-- ALTER TABLE COLLEGE DROP COLUMN COLLEGE_NAME;
-- DROP TABLE COLLEGE;

-- CREATE TABLE COLLEGE(ADMIN_MAIL_ID TEXT);
-- CREATE TABLE COLLEGE(URL TEXT, COLLEGE_NAME TEXT, ADMIN_MAIL_ID TEXT,PRIMARY KEY(URL,COLLEGE_NAME));
-- DELETE FROM CREDENTIALS WHERE EMAIL='admin.webiclass@srinivas.edu.in';

-- INSERT INTO DEPARTMENT VALUES('SCEMD1','Basic Science','Sahyadri College of Engineering and Managment','HOD.basicscience@sahyadri.edu.in');
-- INSERT INTO DEPARTMENT VALUES('SCEMD2','Information Science','Sahyadri College of Engineering and Managment','HOD.informationscience@sahyadri.edu.in');
-- INSERT INTO DEPARTMENT VALUES('SCEMD3','Computer Science','Sahyadri College of Engineering and Managment','HOD.informationscience@sahyadri.edu.in');
-- INSERT INTO DEPARTMENT VALUES('SCEMD4','Electronics and Communication','Sahyadri College of Engineering and Managment','HOD.ec@sahyadri.edu.in');
-- INSERT INTO DEPARTMENT VALUES('SCEMD5','Mechanical Engineering','Sahyadri College of Engineering and Managment','HOD.mecheng@sahyadri.edu.in');
-- INSERT INTO DEPARTMENT VALUES('SCEMD6','Civil Engineering','Sahyadri College of Engineering and Managment','HOD.civileng@sahyadri.edu.in');

-- INSERT INTO DEPARTMENT VALUES('CECD1','Basic Science','Canara Engineering College','HOD.basicscience@canaraengineering.in');
-- INSERT INTO DEPARTMENT VALUES('CECD2','Information Science','Canara Engineering College','HOD.informationscience@canaraengineering.in');
-- INSERT INTO DEPARTMENT VALUES('CECD3','Computer Science','Canara Engineering College','HOD.informationscience@canaraengineering.in');
-- INSERT INTO DEPARTMENT VALUES('CECD4','Electronics and Communication','Canara Engineering College','HOD.ec@canaraengineering.in');
-- INSERT INTO DEPARTMENT VALUES('CECD5','Mechanical Engineering','Canara Engineering College','HOD.mecheng@canaraengineering.in');
-- INSERT INTO DEPARTMENT VALUES('CECD6','Civil Engineering','Canara Engineering College','HOD.civileng@canaraengineering.in');

-- INSERT INTO DEPARTMENT VALUES('NMAM1','Basic Science','NMAM Institute of Technology','HOD.basicscience@NMAM.in');
-- INSERT INTO DEPARTMENT VALUES('NMAM2','Information Science','NMAM Institute of Technology','HOD.informationscience@NMAM.in');
-- INSERT INTO DEPARTMENT VALUES('NMAM3','Computer Science','NMAM Institute of Technology','HOD.informationscience@NMAM.in');
-- INSERT INTO DEPARTMENT VALUES('NMAM4','Electronics and Communication','NMAM Institute of Technology','HOD.ec@NMAM.in');
-- INSERT INTO DEPARTMENT VALUES('NMAM5','Mechanical Engineering','NMAM Institute of Technology','HOD.mecheng@NMAM.in');
-- INSERT INTO DEPARTMENT VALUES('NMAM6','Civil Engineering','NMAM Institute of Technology','HOD.civileng@NMAM.in');

-- INSERT INTO FACULTY VALUES('HOD.basicscience@NMAM.in','HOD','RAMESH','NMAM1','');
-- INSERT INTO FACULTY VALUES('ramesh123@gmail.com','asst. professor','RAMESH','NMAM1','HOD.basicscience@NMAM.in');
-- INSERT INTO FACULTY VALUES('rakshith123@gmail.com','asst. professor','RAKSHITH','NMAM1','HOD.basicscience@NMAM.in');
-- INSERT INTO FACULTY VALUES('varun123@gmail.com','asst. professor','VARUN','NMAM1','HOD.basicscience@NMAM.in');
-- INSERT INTO FACULTY VALUES('sunil123@gmail.com','asst. professor','SUNIL','NMAM1','HOD.basicscience@NMAM.in');
-- INSERT INTO FACULTY VALUES('sumanth123@gmail.com','asst. professor','SUMANTH','NMAM1','HOD.basicscience@NMAM.in');
