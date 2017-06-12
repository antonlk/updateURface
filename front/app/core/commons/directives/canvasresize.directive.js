(function() {
    'use strict';
    app

        .directive('canvasResize', canvasResize)
    .directive('canvasResize2', canvasResize2);

    canvasResize.$inject = ['$window'];
    function canvasResize($window) {

        return {
        link:function link (scope, element) {

            var w = angular.element($window);
            scope.getWindowDimensions = function () {
                return {
                    'h': w.height(),
                    'w': w.width()
                };
            };
            scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                scope.windowHeight = newValue.h;
                scope.windowWidth = newValue.w;

                scope.style = function () {
                    return {
                        'height': (newValue.h - 110) + 'px',
                        //'width': (newValue.w - 0) + 'px'
                    };
                };
            }, true);
            w.bind('canvasResize', function () {
                scope.$apply();
            });
        },
        controller:function(){

        }
        }
    }


    canvasResize2.$inject = ['$window'];
    function canvasResize2($window) {

        return {
        link:function link (scope, element) {

            var w = angular.element($window);
            scope.getWindowDimensions = function () {
                return {
                    'h': w.height(),
                    'w': w.width()
                };
            };
            scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                scope.windowHeight = newValue.h;
                scope.windowWidth = newValue.w;

                scope.style = function () {
                    return {
                        'height': (newValue.h-187) + 'px',
                        //'width': (newValue.w - 0) + 'px'
                    };
                };
            }, true);
            w.bind('canvasResize', function () {
                scope.$apply();
            });
        },
        controller:function(){

        }
    }


}
})();