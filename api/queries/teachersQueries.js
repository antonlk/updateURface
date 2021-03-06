var db = require('../db'); 
var Teachers = {

    getAllTeachers: function (callback) {
        return db.query("Select * from teachers", callback);
    },
     getTeacher: function (teacherId,callback){
        return db.query("SELECT teacherId,name,surname,DNI FROM teachers WHERE teacherId = ?",[teacherId],callback);
    },
    getClassNameList: function(modality,callback){
        db.query(`SELECT DISTINCT className FROM students WHERE modality = ?`,[modality],callback);
    },
    getModalityList: function(callback){
        db.query(`SELECT DISTINCT modality FROM students`,callback);
    },
    updateTeacher: function(teacher,callback){
        db.query(`UPDATE teachers SET name= ? , surname = ?, DNI = ? WHERE teacherId = ?`,
        [teacher.name,teacher.surname,teacher.DNI,teacher.teacherId],callback);
    }


};
module.exports = Teachers;
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
