(function () {
  'use strict';
  app
    .component('nav', {
      templateUrl: 'app/core/commons/component/nav.component/nav.html',
      bindings: { },
      controller: NavController
    });
  /**
   * CONTROLADOR de 'Controller'
   */
  NavController.$inject = [ '$rootScope', 'NavigationService', '$stateParams' ];
  function NavController( $rootScope, NavigationService, $stateParams ) {
    var vm = this;

    vm.title = { };
    vm.cambiarEstado = function () {
      NavigationService.back();
    };
    
    $rootScope.$on('updateRoute', function(event, args) {
      // console.log('llega args', args);
      if (args && args.title){
        angular.extend(vm.title, args.title);
      }else{
        vm.title = { };
        angular.extend(vm.title, args.title);
      }
      
      if (args.editable || !args.defaultReturnRoute){
        vm.hideReturn = true;
      }else{
        vm.hideReturn = false;
      }

    });
    
    $rootScope.$on('updateTitle', function(event, args) {
      if (args && args.title){
        angular.extend(vm.title, args.title);
      }else{
        vm.title = { };
      }
    });
    
    //En caso de que se recargue la página 
    if ($stateParams.editable || !$stateParams.defaultReturnRoute){
      vm.hideReturn = true;
    }else{
      vm.hideReturn = false;
    }
    
    if ($stateParams.title){
      vm.title = {
        text: $stateParams.title.text,
        icon: $stateParams.title.icon,
      };
    }


  }

  
})();