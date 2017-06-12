(function () {
  'use strict';
  angular.module('core.access').component('studentLogin', {
    templateUrl: 'app/core/access/student-login/student-login.component.html',
    bindings: {},
    controller: LoginController
  });

  LoginController.$inject = ['accessFactory', '$localStorage', 'ToasterFactory'];
  function LoginController(accessFactory, $localStorage, ToasterFactory) {
    var vm = this;
    vm.user = {};
    vm.localAccess = $localStorage.localAccess;
    vm.accesosSugeridos = false;
    vm.usuarioLogueados = [];
    vm.tryingLogin = false;
    vm.signIn = function (code, usuario) {
      usuario.err = false;
      vm.tryingLogin = true;
      accessFactory.signInStudent(code).then(
        function () { 
         vm.tryingLogin = false; 
        },
        function (error) {
          vm.tryingLogin = false;
          usuario.err = true;
          ToasterFactory.pop({ type: 'error', title: 'Error , codigo incorrecto', body: 'Por favor, compruebe que los datos introducidos son correctos.' });
        }
      );
    };
    
  
    vm.di = function (keycode, p, user) {
      if (keycode === 13) {
        vm.signIn(p, user);
      }
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