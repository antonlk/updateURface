(function () {
  'use strict';
  angular.module('app').component('app', {
    templateUrl: 'app/app.component/app.component.html',
    bindings: {
      items: '<menuItems'
    },
    controller: AppController
  });

  AppController.$inject = ['$stateParams', '$transitions', '$timeout', '$sessionStorage', '$scope', 'GLOBALS', '$localStorage', 'ToasterFactory', '$q', '$mdDialog', '$state', 'ActivityMonitor'];
  function AppController($stateParams, $transitions, $timeout, $sessionStorage, $scope, GLOBALS, $localStorage, ToasterFactory, $q, $mdDialog, $state, ActivityMonitor) {

    var vm = this;
    vm.usuario = $sessionStorage.usuario;
    // console.log('vm.usuarios', $sessionStorage);

    // add 'ie' classes to html
    // var isIE = !!navigator.userAgent.match(/MSIE/i);
    // isIE && angular.element($window.document.body).addClass('ie');

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = vm,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function () {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
 

    vm.maximize = function () {
      if (vm.inNW) {
        if (vm.isMaximized) {
          GLOBALS.nw.Window.get().unmaximize();
          vm.isMaximized = false;
        } else {
          GLOBALS.nw.Window.get().maximize();
          vm.isMaximized = true;
        }
      }
    };

    vm.minimize = function () {
      if (vm.inNW) {
        GLOBALS.nw.Window.get().minimize();
      }
    };

    /**
     * Cerrar sesión
     */
    vm.closeSession = function (ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Cerrar sesión ')
        .textContent('¿Seguro que quieres cerrar la sesión?')
        .ariaLabel('Salir ')
        .targetEvent(ev)
        .ok('Sí, cerrar la sesión')
        .cancel('Continuar trabajando')
        .css('signout-dialog');

      $mdDialog.show(confirm).then(function () {
        $state.go('access.signout');
      }, function () { });
    };

    /**
     * Cerrar aplicación (NW) 
     */
    vm.closeApp = function (ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Salir ')
        .textContent('¿Seguro que quieres salir de la aplicación?')
        .ariaLabel('Salir ')
        .targetEvent(ev)
        .ok('Sí, salir')
        .cancel('Continuar trabajando')
        .css('signout-dialog');

      $mdDialog.show(confirm).then(function () {
        GLOBALS.nw.Window.get().close(true);
      }, function () { });
    };

    /**
     * Alta de incidencia
     */
    vm.reportIssue = function (ev) {
      function capturePage() {
        var def = $q.defer();
        var prom = def.promise;

        try {
          if (vm.inNW) {
            GLOBALS.nw.Window.get().capturePage(function (base64string) {
              def.resolve(base64string);
            }, { format: 'png', datatype: 'raw' });
          } else {
            def.resolve();
          }
        } catch (e) {
          def.reject(e);
        }
        return prom;
      }

      $mdDialog.show({
        controller: ModalControllerReportIssue,
        controllerAs: 'vm',
        templateUrl: 'app/core/commons/blocks/report-issue-dialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: true, // Only for -xs, -sm breakpoints.
        resolve:{
          capturePage: capturePage
        },
      }).then(
        function (answer) { }, 
        function () { });

    };

    /**
     * Intentar conectar con acceso local
     */
    $scope.$on('updateLocalAccess', function () {
      vm.localAccess = $localStorage.localAccess;
      if (!$localStorage.localAccess) {
        ToasterFactory.pop({ type: 'error', title: 'Sin acceso a documentos', body: 'La conexión con los ficheros locales no está disponible.' });
      }
    });

    /**
     * Comprobar conexión local
     */
    vm.checkLocalAccess = function () {
      if (vm.inNW) {
        LocalAccess.check(function (err, access) {
          vm.localAccess = access;
        });
      }
    };


    /**
     * Mostrar inspector del navegador
     */
    vm.showInspector = function () {
      GLOBALS.nw.Window.get().showDevTools();
    };

    /**
     * Recargar ventana
     */
    vm.reload = function () {
      GLOBALS.nw.Window.get().reloadDev();
    };

    // var ngStats = showAngularStats();

    // ngStats.listeners.digestLength.nameOfYourListener = function(digestLength) {
    //   console.log('Digest: ' + digestLength);
    // };

    // ngStats.listeners.watchCount.nameOfYourListener = function(watchCount) {
    //   console.log('Watches: ' + watchCount);
    // };

    /**
     * @description Controla la actividad del usuario
     */

    //Segundos en los que el user se considera inactivo
    ActivityMonitor.options.inactive = 18000;

    //Eventos del DOM que cuentan como actividad
    //ActivityMonitor.options.DOMevents = ['mousedown', 'mouseup', 'keypress', 'touchstart'];

    //Función que se ejecuta al ser inactivo
    ActivityMonitor.on('inactive', function() {
      $state.go('access.signout');
    });

  }

  ModalControllerReportIssue.$inject = ['$mdDialog', 'GLOBALS', 'ToasterFactory', 'ErrorsService', 'capturePage'];
  function ModalControllerReportIssue($mdDialog, GLOBALS, ToasterFactory, ErrorsService, capturePage) {
    var vm = this;
    vm.cancel = function () {
      $mdDialog.hide();
    };
    vm.saveIssue = function () {
      vm.capture = capturePage;
      var data = {
        capture: capturePage,
        description: vm.issueDescription,
        origin: 'USER'
      };
      ErrorsService.saveError(data).then(
        function () { // Success
          ToasterFactory.pop({ type: 'success', title: 'Problema reportado', body: 'El problema ha sido reportado al equipo de desarrollo. Gracias.' });
        },
        function () { // Error
          ToasterFactory.pop({ type: 'error', title: 'Problema no reportado', body: 'No ha sido posible reportar el problema.' });
        }
      );
      $mdDialog.hide();
    };
  }


})();
