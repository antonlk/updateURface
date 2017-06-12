(function () {
  'use strict';

  angular.module('core',
    [
      'core.access',
      'core.errors'
    ])
    .config(
    ['$stateProvider',
      function ($stateProvider) {
        $stateProvider
          .state('app.core', {
            url: '/',
            template: '<div ui-view class="fade-in-up"></div>'
          });
      }
    ]
    );

})();