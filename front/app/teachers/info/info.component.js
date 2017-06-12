(function () {
  'use strict';

  angular
    .module('teachers')
    .component('infoProvider', {
      templateUrl: 'app/shared/info.component.html',
      controller: InfoController,
      bindings: {
       "student":"<",
       "teacher":"<"
      },
    });

 InfoController.inject = ['NavigationService','$stateParams'];
  function InfoController(NavigationService,$stateParams) {
    var vm = this; 


    if (vm.teacher){
       vm.teacher = vm.teacher.data[0];
    }
    
    if(vm.student){
       vm.student = vm.student.data[0];   
    }
   
    vm.back = function(){
      NavigationService.back();
    }

  }
})();