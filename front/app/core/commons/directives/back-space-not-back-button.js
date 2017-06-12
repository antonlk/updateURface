'use strict';

angular.module('app')
    .directive('backSpaceNotBackButton', ['GLOBALS' ,function(GLOBALS){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                if (GLOBALS.nw) {
                    // This will stop backspace from acting like the back button
                    $(element).keydown(function (e) {
                        var elid = $(document.activeElement)
                            .filter(
                            "input:not([type], [readonly])," +
                            "input[type=text]:not([readonly]), " +
                            "input[type=password]:not([readonly]), " +
                            "input[type=search]:not([readonly]), " +
                            "input[type=number]:not([readonly]), " +
                            "input[type=email]:not([readonly]), " +
                            "input[type=date]:not([readonly]), " +
                            "input[type=datetime]:not([readonly]), " +
                            "input[type=datetime-local]:not([readonly]), " +
                            "input[type=month]:not([readonly]), " +
                            "input[type=tel]:not([readonly]), " +
                            "input[type=time]:not([readonly]), " +
                            "input[type=url]:not([readonly]), " +
                            "input[type=week]:not([readonly]), " +
                            "textarea")[0];
                        if (e.keyCode === 8 && !elid) {
                            return false;
                        }
                    });
                }
            }
        }
    }]);