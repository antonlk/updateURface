(function () {
  'use strict';

  angular.module('app').directive('preventDragAndDrop', function () {
    return {
      restrict: 'A',
      link: function ($scope, elem, attr) {
        elem.bind('dragover', function (e) {
          e.stopPropagation();
          e.preventDefault();

        });
        elem.bind('drop', function (e) {
          e.stopPropagation();
          e.preventDefault();
        });
      }
    };
  });

})();