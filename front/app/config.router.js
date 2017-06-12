(function () {

  'use strict';

  /**
   * Sección de configuracion de ruteo de la aplicación
   */
  angular.module('app')

    .run(['$trace', '$transitions', '$mdComponentRegistry', 'NavigationService', '$state', 'ToasterFactory', '$timeout',
    function($trace, $transitions, $mdComponentRegistry, NavigationService, $state, ToasterFactory, $timeout) {
      // $trace.enable('TRANSITION');
/*
      var menu = null;
      $mdComponentRegistry.when('menu').then(function (leftSidenav) {
        menu = leftSidenav;
      });
      */
       //$transitions.onStart({ }, function(trans) {
         
        // var SpinnerService = trans.injector.get('SpinnerService');
        // SpinnerService.transitionStart();
        // trans.promise.finally(SpinnerService.transitionEnd);
      //});

      $transitions.onError({}, function(transition) {
        console.error('Error al cambiar el estado ');
        ToasterFactory.pop({ type: 'error', title: 'UPS!', body: 'No tienes permiso para entrar en esta seccción o la sesión ha caducado!' });
          $timeout(function(){
            $state.go('access.signout');
          }, 3000);
        // transition.promise.catch(function(error) {
          // ToasterFactory.pop('success', 'UPS!', 'No tienes permiso para entrar en esta seccción o la sesión ha caducado!');
          // $timeout(function(){
          //   $state.go('access.signout');
          // }, 3000);  
        // });
      });

      $transitions.onSuccess({ }, function(trans) {
        NavigationService.onNavigate(trans.$from().name, trans.params('to'));
       
      });


    }])

    .config(
    ['$stateProvider', '$urlRouterProvider', 
      function ($stateProvider, $urlRouterProvider ) {

        $urlRouterProvider
          .otherwise('/access/signin');
        $stateProvider
          .state('app', {
            abstract: true,
            url: '/app',
            component: 'app',
            resolve: {
            //loggedin: checkLoggedin,
            }
          })
          .state('app.inicio', {
            url: '/inicio',
            templateUrl: 'app/core/commons/app_inicio.html'
          });
      }
    ]
    );

  checkLoggedin.$inject = ['accessFactory', '$location'];
  function checkLoggedin(accessFactory, $location) {
    return accessFactory.checkLoggedin()
      .then(
      function (res) {
        if (res.data === '0') {
          $location.url('/access/signin');
        }
      },
      function (error) {
        console.error(error);
        $location.url('/access/signin');
      }
      );
  }

} ());