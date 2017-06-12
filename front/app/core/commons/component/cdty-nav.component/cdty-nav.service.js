(function () {
  'use strict';

  app.service("NavigationService", CdtyNavService);

  CdtyNavService.$inject = [ '$state', '$rootScope', 'ToasterFactory', 'GLOBALS', '$q', '$timeout','$sessionStorage'];
  function CdtyNavService ( $state, $rootScope, ToasterFactory, GLOBALS, $q, $timeout, $sessionStorage ) {
    
    var routerStack = [ ];
    var vm = this;
    vm.onNavigate = onNavigate;
    vm.back = back;
    vm.setTitle = setTitle;    
    vm.returnDeferred = returnDeferred;

    //Flag de ruta correcta
    var routeParamsFail = false;
    var isBack = false;

    /**
     * Se ejecuta en cada navegación ( que se completa correctamente onSucess())
     */
    function onNavigate(fromName, to){
      if (routeParamsFail){
        // Ha habido un error cargando los parámetros de entrada, no añadimos ruta, intentamos volver al estado por defecto
        routeParamsFail = false;
        $timeout(function(){
          ToasterFactory.pop( { type: 'error', title: 'UPS!', body: 'Error al cargar los datos, inténtelo de nuevo' } );
        },300);

      }else{
        //Comprobamos si la ruta tiene un return por defecto para saber si tenemos en cuenta opción de vovler.
        $rootScope.$broadcast('updateRoute', { title: to.title, defaultReturnRoute: to.defaultReturnRoute, editable: to.editable });
        // manejamos la pila de rutas para añadir o limpiar
        if ( to.defaultReturnRoute ){
          //Si no viene de vuelta
          if ( isBack === false ){
            // isBack = false;
            if ( fromName ){
              _addRoute({state:fromName, params:to});
            }else{
              //si se recarga la página
              _addRoute({state:to.defaultReturnRoute});
            }
          }
        }else{
          //Como no tiene ruta por defecto, vaciamos la pila
          _cleanRouterStack();
        }
      }
      isBack = false;
    }

    /**
     * Vuelve a la ruta anterios de la pila de rutas
     */
    function back(){
      var totalRoutes = routerStack.length;
      if (totalRoutes >=1){
        var route = routerStack.pop();
        // Añadimos el flag back para que no se añada la ruta a la pila si viene de allí
        isBack = true;
        $state.go(route.state, route.params);
        //Eliminamos el último estado
      }else{
        //TODO::Este caso no se puede dar, handle error
        ToasterFactory.pop({ type: 'error', title: 'UPS!', body: 'Ha ocurrido un error' });
      
      }
    }

    /**
     * Setea el título de una pantalla
     */
    function setTitle( title ){
      $rootScope.$broadcast('updateTitle', { title: title });
    }

    /**
     * Función que se llama desde el enrutador para capturar el error cuando no llega un parámetro requerido
     * @params: $stateParams
     */
    function returnDeferred(to){
      routeParamsFail = true;
      if (to.defaultReturnRoute){
        $state.go(to.defaultReturnRoute, to.params);
      }else{
        
      }
      return $q.reject('Error al cambiar la ruta !'); 
    }

    /**
     * Funciones privadas
     */

    /**
     * Añadir una ruta a la pila
     */
    function _addRoute(route){
      routerStack.push(route);
    }

    /**
     * Limpiar el stack de rutas
     */
    function _cleanRouterStack(){
      routerStack = [ ];
    }
  }

})();