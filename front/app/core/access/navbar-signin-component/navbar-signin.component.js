(function () {
  'use strict';
  angular.module('core.access')
    .component('navbarSignin', {
      restrict: 'E',
      templateUrl: 'app/core/access/navbar-signin-component/navbar-signin.component.html',
      controller: ['GLOBALS', function (GLOBALS) {
        var vm = this;
        //acciones de ventana NW
        vm.inNW = ((GLOBALS.nw) ? true : false);
        vm.isMaximized = false;
        vm.maximize = function () {
          if (vm.isMaximized) {
            GLOBALS.nw.Window.get().unmaximize();
            vm.isMaximized = false;
          } else {
            GLOBALS.nw.Window.get().maximize();
            vm.isMaximized = true;
          }
        };
        vm.minimize = function () {
          if (vm.inNW) {
            GLOBALS.nw.Window.get().minimize();
          }
        };
        vm.close = function () {
          if (vm.inNW) {
            GLOBALS.nw.Window.get().close();
          }
        };
      }]
    });
})();