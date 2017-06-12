(function () {
  'use strict';

  app.directive('checkAvailability', checkAvailability);

  checkAvailability.$inject = ['$q'];
  function checkAvailability($q) {
    return {
      require: 'ngModel',
      restrict: 'A',
      scope: { validationPromise: '&checkAvailability' },
      link: function (scope, element, attrs, ngModel) {

        var expressionHandler = scope.validationPromise();

        ngModel.$asyncValidators[ngModel.$name] = function (modelValue, viewValue) {
          return expressionHandler(viewValue).then(
            function (res) {
              if (res.data === "false") {
                return $q.reject();
              } else {
                return $q.resolve();
              }
            },
            function (err) {
              return $q.reject();
            }
          );

        };

      }
    };
  }

})();
