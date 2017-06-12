(function () {

  'use strict';

  angular.module('teachers', [])

    .config(
    ['$stateProvider',
      function ($stateProvider) {
        $stateProvider
          .state('app.teachers', {
            url: '/teachers',
            template: '<div ui-view class="fade-in-up"></div>'
          })
          .state('app.teachers.students-list', {
            url: '/studentList',
            component: 'studentsList',
            resolve: {
              students: StudentsList
            },
            params: {
              filter: null,
              title: {
                text: 'Lista de estudiantes',
                icon: 'fa fa-image'
              }
            }
          })
          .state('app.teachers.student-info', {
            url: '/student/:studentId/profile',
            component: 'infoProvider',
            resolve: {
              student: Student,
            },
            params: {
              defaultReturnRoute: 'app.teachers.students-list',
              studentId: null,
              filter: null,
              title: {
                text: 'Informacion del alumno',
                icon: 'fa fa-edit'
              }
            }
          })
          .state('app.teachers.teacher-info', {
            url: '/teacher/:teacherId/profile',
            component: 'infoProvider',
            resolve: {
              teacher: Teacher
            },
            params: {
              defaultReturnRoute: 'app.teachers.students-list',
              filter: null,
              teacherId: null,
              title: {
                text: 'Perfil del profesor',
                icon: 'fa fa-edit'
              }
            }
          }
          )
          .state('app.teachers.teacher-edit', {
            url: '/teacher/:teacherId/profile/edit',
            component: 'teacherEditInfo',
            resolve: {
              teacher: Teacher
            },
            params: {
              defaultReturnRoute: 'app.teachers.students-list',
              teacherId: null,
              editable: true,
              title: {
                text: 'Editar perfil del profesor',
                icon: 'fa fa-edit'
              }
            }
          }
          );
      }
    ]
    );

  StudentsList.$inject = ['DataService'];
  function StudentsList(DataSercice) {
    return DataSercice.getStudents();
  }

  Student.$inject = ['$stateParams', 'DataService'];
  function Student($stateParams, DataService) {
    return DataService.getStudent($stateParams.studentId);
  }

  Teacher.$inject = ['$stateParams', 'DataService'];
  function Teacher($stateParams, DataService) {
    return DataService.getTeacher($stateParams.teacherId);
  }

})();