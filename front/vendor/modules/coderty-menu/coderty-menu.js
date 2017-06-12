(function(){
    'use strict';
    /**
     * @name codertyMenu
     * @desc <coderty-menu> Directive
     */
    function codertyMenu () {
        return {
            templateUrl: 'app/core/commons/blocks/coderty-menu.html',
            scope: {},
            bindToController: {
                codertyMenu: '='
            },
            controllerAs: 'vm',
            controller: function () {
                var vm = this;
            }
        }
    }
    angular
        .module('codertyMenu', [ ])
        .directive('codertyMenu', codertyMenu);
})();