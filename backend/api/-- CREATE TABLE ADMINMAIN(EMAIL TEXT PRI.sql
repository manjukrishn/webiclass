-- CREATE TABLE ADMINMAIN(EMAIL TEXT PRIMARY KEY,NAME TEXT);
-- CREATE TABLE COLLEGE(URL TEXT PRIMARY KEY, NAME TEXT, IMAGE TEXT);
-- CREATE TABLE CREDENTIALS(EMAIL TEXT PRIMARY KEY,PASSWORD TEXT,ROLE TEXT);
-- CREATE TABLE DEPARTMENT(ID TEXT PRIMARY KEY,NAME TEXT,URL TEXT, FOREIGN KEY(URL) REFERENCES COLLEGE(URL) ON DELETE CASCADE ON UPDATE CASCADE);
-- CREATE TABLE FACULTY(EMAIL TEXT PRIMARY KEY,NAME TEXT, HOD_MAIL_ID TEXT,ID TEXT,FOREIGN KEY(ID) REFERENCES DEPARTMENT(ID) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY(HOD_MAIL_ID) REFERENCES FACULTY(EMAIL) ON DELETE CASCADE ON UPDATE CASCADE);
-- CREATE TABLE ADMINCOLLEGE(EMAIL TEXT PRIMARY KEY,NAME TEXT,URL TEXT,FOREIGN KEY(EMAIL) REFERENCES CREDENTIALS(EMAIL) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY(URL) REFERENCES COLLEGE(URL) ON DELETE CASCADE);
-- CREATE TABLE ADMINDEPT(EMAIL TEXT PRIMARY KEY,NAME TEXT,ID TEXT, FOREIGN KEY(ID) REFERENCES DEPARTMENT(ID));
-- CREATE TABLE SECTION(SEC_ID TEXT PRIMARY KEY,NAME TEXT, NO_OF_SUBJECTS TEXT, NO_OF_STUDENTS TEXT, ID TEXT, FOREIGN KEY(ID) REFERENCES DEPARTMENT(ID) ON DELETE CASCADE ON UPDATE CASCADE);
-- CREATE TABLE SUBJECT(ID TEXT PRIMARY KEY,NAME TEXT,SEC_ID TEXT,EMAIL TEXT,FOREIGN KEY(SEC_ID) REFERENCES SECTION(SEC_ID) ON UPDATE CASCADE ON DELETE CASCADE,FOREIGN KEY(EMAIL) REFERENCES FACULTY(EMAIL) ON UPDATE CASCADE ON DELETE CASCADE);
-- CREATE TABLE ATTENDANCE(ID TEXT PRIMARY KEY, DATE TEXT,TIME TEXT,SUBID TEXT,FOREIGN KEY(SUBID) REFERENCES SUBJECT(ID) ON UPDATE CASCADE ON DELETE CASCADE);
-- CREATE TABLE STUDENT(EMAIL TEXT,USN TEXT PRIMARY KEY,NAME TEXT,FOREIGN KEY(EMAIL) REFERENCES CREDENTIALS(EMAIL));
-- CREATE TABLE MATERIAL(LINK TEXT PRIMARY KEY, TYPE TEXT, DATE_ADDED TEXT, SUBID TEXT, FOREIGN KEY(SUBID) REFERENCES SUBJECT(ID)  ON UPDATE CASCADE ON DELETE CASCADE);
SELECT * FROM sqlite_master WHERE type="table";
-- ALTER TABLE ATTENDANCE ADD COLUMN STATUS;
-- CREATE TABLE PRESENCE(ID TEXT PRIMARY KEY, DATE TEXT,TIME TEXT,SUBID TEXT, USN TEXT, STATUS TEXT,FOREIGN KEY(SUBID) REFERENCES SUBJECT(ID) ON UPDATE CASCADE ON DELETE CASCADE,FOREIGN KEY(USN) REFERENCES STUDENT(USN) ON DELETE CASCADE ON UPDATE CASCADE);
-- DROP TABLE ATTENDANCE;