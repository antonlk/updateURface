(function () {
  'use strict';

  angular
    .module('students')
    .component('studentInfo', {
      templateUrl: 'app/shared/info.component.html',
      controller: StudentInfoController,
      bindings:{
        "student":"<"
      }
    });

 StudentInfoController.inject = ['NavigationService','$stateParams'];
  function StudentInfoController(NavigationService,$stateParams) {
    var vm = this; 
    vm.student = vm.student.data[0];


    vm.back = function(){
      NavigationService.back();
    }

  }
})();