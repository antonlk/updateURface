var db = require('../db'); 

var Students = {

    getAllStudents: function (callback) {
        return db.query(`SELECT S.studentId, S.name, S.surname, S.className, S.modality, 
            CONVERT(S.photo USING utf8) as photo , A.code,
            IF(A.code IS NULL,false,true) as gotCode
            FROM students S LEFT JOIN authorizations A using(studentId)`, callback);
    },
    getStudent: function (studentId,callback){
       
        return db.query(
            `SELECT S.studentId, S.name, S.surname, S.className, S.modality,
            CONVERT(S.photo USING utf8) as photo ,
            IF(A.code IS NULL,false,true) as gotCode
            FROM students S LEFT JOIN authorizations A using(studentId)
            WHERE studentId = ?`
            ,
            [studentId],callback);
    },
    getStudentsByModality: function (modality,callback){
        return db.query(`SELECT studentId FROM students WHERE modality=?`,[modality],callback);
    },
    getStudentsByClassNameAndModality: function (className,modality,callback){
        return db.query(`SELECT studentId FROM students WHERE className = ? AND modality=?`,[className,modality],callback);
    },
    updatePhoto: function (studentId,photo,callback){
        return db.query('UPDATE students SET photo = ? WHERE studentId= ?',[photo,studentId],callback);
    },
    grantAuth: function(studentId,teacherId,code,callback){
        return db.query(`INSERT INTO authorizations (studentId,teacherId,code,creationDate) VALUES (?,?,?,now())`,[studentId,teacherId,code],callback);
    },
    revokeAuth: function(studentId,callback){
        return db.query(`DELETE FROM authorizations WHERE studentId = ?`,[studentId],callback);
    }

};
module.exports = Students;
 /*
 ,
 getTaskById:function(id,callback){
 
return db.query("select * from task where Id=?",[id],callback);
 },
 addTask:function(Task,callback){
 return db.query("Insert into task values(?,?,?)",[Task.Id,Task.Title,Task.Status],callback);
 },
 deleteTask:function(id,callback){
  return db.query("delete from task where Id=?",[id],callback);
 },
 updateTask:function(id,Task,callback){
  return db.query("update task set Title=?,Status=? where Id=?",[Task.Title,Task.Status,id],callback);
 }
 */