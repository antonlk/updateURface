(function () {
  'use strict';
  app
    .component('cdtyNav', {
      templateUrl: 'app/core/commons/component/cdty-nav.component/cdty-nav.html',
      bindings: { },
      controller: CdtyNavController
    });
  /**
   * CONTROLADOR de 'Controller'
   */
  CdtyNavController.$inject = [ '$rootScope', 'NavigationService', '$stateParams' ];
  function CdtyNavController( $rootScope, NavigationService, $stateParams ) {
    var vm = this;

    vm.title = { };
    vm.cambiarEstado = function () {
      NavigationService.back();
    };

    //Esperamos cambios en la ruta para mostrar / ocultar la opción de volver
    // $rootScope.$on('updateDefaultRoute', function(event, args) {
    //   if(args && args.title){
    //     vm.title = {
    //       text: args.title.text,
    //       icon: args.title.icon,
    //     };
    //   }else{
    //     vm.title = { };
    //   }
    // });
    
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