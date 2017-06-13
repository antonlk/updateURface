var db = require('../db');
var mysql = require('mysql'); 
var App = {

    loginStudent: function (code,callback) {
      return db.query('SELECT S.studentId, S.name, S.surname, S.className, S.modality FROM students S JOIN authorizations A USING(studentId) WHERE A.code = ?',[code],callback);
    },
    loginTeacher: function (user,pass,callback) {
      return db.query("SELECT T.teacherId ,T.DNI, T.name, T.surname  FROM teachers T WHERE DNI = ? and pass = ?",[user,pass],callback);
    }
};

module.exports = App;
