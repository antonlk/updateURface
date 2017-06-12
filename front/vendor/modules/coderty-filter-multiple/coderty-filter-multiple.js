(function(){
    'use strict';
    angular
        .module('codertyFilterMultiple', [ ])
        .filter('codertyFilter',['$filter',function ($filter) {
            return function (items, keyObj) {
                if (keyObj && items) {
                    var filter = keyObj.split(" ");
                    var total = filter.length;
                    while (total > 0 && items.length > 0) {
                        total--;
                        items = $filter('filter')(items, filter[total]);
                    }
                }
                return items;
            }
        }]);
})();