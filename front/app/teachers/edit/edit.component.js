(function() {
    'use strict';

    angular
        .module('teachers')
        .component('teacherEditInfo', {
            templateUrl:'app/teachers/edit/edit.component.html',
            controller: teacherEditController,
            bindings: {
               "teacher": '<',
            },
        });

    teacherEditController.$inject = ['NavigationService','DataService','ToasterFactory','$state','$stateParams'];
    function teacherEditController(NavigationService,DataService,ToasterFactory,$state) {
        var vm = this;
       
        vm.teacher = vm.teacher.data[0];
        
        vm.saving=false;

        vm.back = function(){
        NavigationService.back();
        }
      
    }
})();