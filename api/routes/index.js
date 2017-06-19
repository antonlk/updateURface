var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

//--------------------------------------------//
//             QUERY MODULES                  //
//--------------------------------------------//

var App = require('../queries/appQueries');
var Students = require('../queries/studentsQueries');
var Teachers = require('../queries/teachersQueries');


//Aqui es donde se indican todas las rutas que usara nuestra app

//--------------------------------------------//
//                    LOGIN                   //
//--------------------------------------------//


router.post('/login', function (req, res) {
  if (req.body.code) {

    App.loginStudent(req.body.code, function (err, results) {
      if (results) {
        var tok = jwt.sign(results[0], express.secret, { expiresIn: "1  day" });
         var student = {
          id:results[0].studentId,
          name:results[0].name,
          surname: results[0].surname,
          class: results[0].className,
          modality: results[0].modality,
          token : tok
        }
        return res.json(student).status(200);
      }
      else {
        res.status(401, 'Wrong user or password');
        res.json(err);
      }
    });
  }
  else {
    App.loginTeacher(req.body.user,req.body.pass, function (err, results) {
      if (results) {
        var tok = jwt.sign(results[0], express.secret, { expiresIn: "1  day" });
         var teacher = {
          id:results[0].teacherId,
          name:results[0].name,
          surname: results[0].surname,
          DNI: results[0].DNI,
          token : tok
        }
       return res.json(teacher).status(200);
      }
      else {
        res.status(401, 'Wrong user or password');
        res.json(err)
      }
    });
  }
});


//--------------------------------------------//
//                 SIGN OUT                   //
//--------------------------------------------//

router.get('/access/logout', function (req, res) {
 res.status(200).json("loged out");
});

//--------------------------------------------//
//                  ERRORS                    //
//--------------------------------------------//

router.post('/error', function (req, res) {
   console.log(req.data);
  res.json(req.data);
});

//--------------------------------------------//
//                 STUDENTS                   //
//--------------------------------------------//

router.get('/students', function (req, res) {
  Students.getAllStudents(function (err, results) {
    if (err){res.json(err)}
    else {res.json(results)}
  });
});

router.get('/students/student/:studentId', function (req, res) {
  Students.getStudent(req.params.studentId,function (err, results) {
    if (err){res.json(err)}
    else {res.json(results)}
  });
});

router.get('/students/:modality', function (req, res) {
  Students.getStudentsByModality(req.params.modality,function (err, results) {
    if (err){res.json(err)}
    else {res.json(results)}
  });
});

router.get('/students/:modality/:className', function (req, res) {
  Students.getStudentsByClassNameAndModality(req.params.modality,req.params.className,function (err, results) {
    if (err){res.json(err)}
    else {res.json(results)}
  });
});

router.post('/students/student/:studentId/updatePhoto',function (req,res){
  Students.updatePhoto(req.body.student.studentId,req.body.student.photo,function(err,results){
    if (err){res.json(err)}
    else {res.json(results)}
  });
});

router.post('/students/student/:studentId/auth/grant',function (req,res){
  Students.grantAuth(req.body.studentId,req.body.teacherId,req.body.code,function(err,results){
    if(err){res.json(err)}
    else {res.json(results)}
  });
});

router.post('/students/student/:studentId/auth/revoke',function (req,res){
  Students.revokeAuth(req.body.studentId,function(err,results){
    if(err){res.json(err)}
    else {res.json(results)}
  });
});



//--------------------------------------------//
//                 TEACHERS                   //
//--------------------------------------------//


router.get('/teachers/modalitylist', function (req, res) {
  Teachers.getModalityList(function (err, results) {
    if (err){res.json(err)}
    else {res.json(results)}
  });
});

router.get('/teachers/:modality/classnamelist', function (req, res) {
  console.log(req.params)
  Teachers.getClassNameList(req.params.modality,function (err, results) {
    if (err){res.json(err)}
    else {res.json(results)}
  });
});

router.get('/teachers/teacher/:teacherId', function (req, res) {
  Teachers.getTeacher(req.params.teacherId,function (err, results) {
    if (err){res.json(err)}
    else {res.json(results)}
  });
});

router.post('/teachers/teacher/:teacherId/update',function (req,res){
  Teachers.updateTeacher(req.body.teacher,function(err,results){
     if(err){res.json(err)}
    else {res.json(results)}
  })
});


module.exports = router;