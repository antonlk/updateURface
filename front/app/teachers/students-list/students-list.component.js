(function () {
  'use strict';

  angular
    .module('teachers')
    .component('studentsList', {
      templateUrl: 'app/teachers/students-list/students-list.component.html',
      controller: studentsList,
      bindings: {
        "students": "<",
        "modalities": "<"
      },
    });

  studentsList.$inject = ['$filter', '$stateParams', '$sessionStorage', 'CodeFactory', 'DataService', 'ToasterFactory','$state'];
  function studentsList($filter, $stateParams, $sessionStorage, CodeFactory, DataService,ToasterFactory,$state) {
    var vm = this;
    //si proviene de $sessionStorage, la id de profesor es "id" y no "teacherId"
    vm.teacher = $sessionStorage.usuario;
    vm.saving=false;

    vm.studentsList = vm.students.data;
  
    vm.modalities = vm.modalities.data;


    vm.selectedModality;
    vm.selectedClassName;

    
    vm.getClassNames= function (){
      if(!vm.selectedModality){

      }
      else {
        DataService.getClassNameList(vm.selectedModality).then(function(res){
          vm.classNames = res.data;
        });
      }
    }

   
    vm.studentsTable = {
      "header": [
        { "key": "name", "name": "Nombre" },
        { "key": "surname", "name": "Apellidos" },
        { "key": "modality", "name": "Modalidad" },
        { "key": "className", "name": "Clase" },
        { "key": "code", "name": "Codigo" },
      ],
      "rows": $filter('filter')(vm.studentsList)
    };

    vm.grantAuth = function (studentId) {
      var code = CodeFactory.getCode();
      DataService.grantAuthStudent(studentId,vm.teacher.id,code).then(function (res) {
        if (res) {
          ToasterFactory.pop({ type: 'success', title: 'Permiso', body: 'codigo asignado correctamente' });
          DataService.getStudents().then(function(res){
            $state.reload();
          });
        }
      },
        function (err) {
          ToasterFactory.pop({ type: 'error', title: 'Permiso', body: 'codigo no asignado' });
        });
    }

    vm.revokeAuth = function (studentId) {
      DataService.revokeAuthStudent(studentId).then(function (res) {
        if (res) {
          ToasterFactory.pop({ type: 'success', title: 'Permiso', body: 'codigo eliminado correctamente' });
           DataService.getStudents().then(function(res){
            $state.reload();
          });
        }
      },
        function (err) {
          ToasterFactory.pop({ type: 'error', title: 'Permiso', body: 'codigo no ha sido borrado' });
        });
    }


    vm.grantAuthStudents = function (){
      vm.saving = true;
      if (vm.selectedClassName){

      }
      else {

      }
    }

  }

})()