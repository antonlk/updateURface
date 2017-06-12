(function () {
  'use strict';
  angular.module('core.access').component('teacherLogin', {
    templateUrl: 'app/core/access/teacher-login/teacher-login.component.html',
    bindings: {},
    controller: teacherLoginController
  });

  teacherLoginController.$inject = ['accessFactory', '$localStorage', 'ToasterFactory'];
  function teacherLoginController(accessFactory, $localStorage, ToasterFactory) {
    var vm = this;
    vm.user = {};
    vm.localAccess = $localStorage.localAccess;
    vm.accesosSugeridos = false;
    vm.usuarioLogueados = [];
    vm.tryingLogin = false;
    vm.signIn = function (username, password, usuario) {
      usuario.err = false;
      vm.tryingLogin = true;

      accessFactory.signInTeacher(username, password).then(
        function () { vm.tryingLogin = false; },
        function (error) {
          vm.tryingLogin = false;
          usuario.err = true;
          ToasterFactory.pop({ type: 'error', title: 'Error en el nombre de usuario o contraseña', body: 'Por favor, compruebe que los datos introducidos son correctos.' });
        }
      );
    };

    vm.removeUser = function (u) {
      for (var i = 0; i < $localStorage.usuariosLogeados.length; i++) {
        if ($localStorage.usuariosLogeados[i].username === u.username) {
          $localStorage.usuariosLogeados.splice(i, 1);
          _refreshLocallyStoredUsers();
          break;
        }
      }
    };
  }

})();