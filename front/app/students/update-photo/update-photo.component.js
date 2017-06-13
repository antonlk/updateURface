(function () {
  'use strict';

  angular
    .module('students')
    .component('updatePhoto', {
      templateUrl: 'app/students/update-photo/update-photo.component.html',
      controller: UpdatePhotoController,
      bindings: {
        "student": "<"
      }
    });


  UpdatePhotoController.$inject = ['$sessionStorage', 'NavigationService', 'DataService', 'ToasterFactory'];
  function UpdatePhotoController($sessionStorage, NavigationService, DataService, ToasterFactory) {
    var vm = this;
    vm.saving=false;
    
    vm.student = vm.student.data[0];
    if (vm.student.photo) {
      vm.profileImage = vm.student.photo;
    }
    else {
      vm.profileImage = '';
    }

    vm.editingImage = {};

    vm.deletePhoto = function () {
      vm.profileImage = '';
      vm.student.photo = '';
      vm.editingImage = {};
    };

    vm.saveEditingImage = function () {
      var photo = vm.editingImage.croppedDataUrl;
      vm.profileImage = photo.split(',')[1];
      vm.student.photo = vm.profileImage;
    };

    vm.discardEditingImage = function () {
      vm.editingImage = {};
    };

    vm.save = function () {
      vm.saving=true;
      DataService.updateStudentPhoto(vm.student).then(function (res) {
        ToasterFactory.pop({ type: 'success', title: 'OK!', body: 'imagen guardada' });
        DataService.revokeAuthStudent(vm.student.studentId).then(function(res){
          ToasterFactory.pop({ type: 'info', title: 'Contraseña', body: 'Se ha inutilizado' });
        });
         vm.saving=false;
      },
        function (err) {
           ToasterFactory.pop({ type: 'error', title: 'error', body: 'Algo ha fallado' });
           vm.saving=false;
        });
    }

  }



})();