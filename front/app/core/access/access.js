(function () {

  'use strict';

  angular.module('core.access', [])

    .config(
    ['$stateProvider',
      function ($stateProvider) {
        $stateProvider
          .state('access', {
            abstract: true,
            url: '/access',
            template: '<div ui-view class="fade-in-right-big smooth"></div>'
          })
          .state('access.signin', {
            url: '/signin',
            component: 'studentLogin'
          })
          .state('access.signout', {
            url: '/signout',
            template:'<!-- -->',
            resolve:{
              logOut:logOut
            }
          })
          .state('access.clean', {
            url: '/clean',
            templateUrl: 'app/core/commons/clean.html'
          })
          .state('access.recovery_pass', {
            url: '/recovery/:hashstr',
            component: 'recoveryPass',
            resolve: {
              Hashstr: ComprobarHash
            }
          })
          .state('access.teacher', {
            url: '/signin',
            param:{
              error: null
            },
            component: 'teacherLogin'
          });
      }
    ]
    );

  ComprobarHash.$inject = ['$stateParams', 'accessFactory', 'ToasterFactory'];
  function ComprobarHash($stateParams, accessFactory, ToasterFactory) {
    return accessFactory.comprobarHash($stateParams.hashstr).then(
      function () {},//SUCCESS
      function () { //ERROR
        ToasterFactory.pop({ type: 'error', title: 'Error', body: 'El enlace no es correcto.' });
      }
    );
  }

  logOut.$inject = [ 'signOutFactory' ];
  function logOut( signOutFactory ) {
    signOutFactory.signOut();
  }

})();