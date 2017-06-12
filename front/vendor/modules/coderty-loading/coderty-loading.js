(function(){
    'use strict';

/**
 * @name codertyLoading
 * @desc <coderty-loading> Directive
 */
function codertyLoading () {


    return {
        restrict: 'A',
        scope: {
            codertyLoading: '='
        },
        transclude: true,
        template: [
            '<div layout="row" layout-sm="column" layout-align="space-around">',
            '   <md-progress-circular ng-show="codertyLoading" class="md-hue-2" md-mode="indeterminate"></md-progress-circular>',
            '</div>',
            '<div ng-transclude ng-hide="codertyLoading"></div>'
        ].join('')
    };

}
angular
    .module('codertyLoading', [])
    .directive('codertyLoading', codertyLoading);

})();