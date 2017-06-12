(function () {

  'use strict';

  angular.module('students', [])
    .config(
    ['$stateProvider',
      function ($stateProvider) {
        $stateProvider
          .state('app.students', {
            url: '/students',
            template: '<div ui-view class="fade-in-up"></div>'
          })
          .state('app.students.update-photo', {
            url: '/update-photo',
            component: 'updatePhoto',
            resolve: {
              student: Student,
              deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load(['ngFileUpload']).then(
                  function () {
                    return $ocLazyLoad.load(['ngImgCrop']);
                  }
                );
              }]
            },
            params: {
              studentId: null,
              title: {
                text: 'Update your photo',
                icon: 'fa fa-image'
              }
            }
          })
          .state('app.students.student-info', {
            url: '/student/:studentId/profile',
            component: 'studentInfo',
            resolve: {
              student:StudentData
            },
            params: {
              student : null,
              studentId: null,
              defaultReturnRoute: 'app.students.update-photo',
              title: {
                text: 'Informacion del alumno',
                icon: 'fa fa-edit'
              }
            }
          }
          );
      }
    ]
    );

Student.$inject = ['$sessionStorage','DataService'];
function Student ($sessionStorage,DataService){
  return DataService.getStudent($sessionStorage.usuario.id);
}

StudentData.$inject = ['$stateParams','DataService'];
function StudentData ($stateParams,DataService){
  return DataService.getStudent($stateParams.studentId);  
}

})();