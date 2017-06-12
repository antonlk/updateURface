(function() {
    'use strict';

    app
        .directive('quemeco', quemeco);
    //.controller('quemecoController', quemecoController);

    quemeco.$inject = [ ];
    function quemeco( ) {

        var directive = {
            restrict: 'A',
            scope: {
                quemeco:'=',
                campos:'='
            },
            controller: ['$scope', function controller($scope) {
                var camposagrupables = [];
                camposagrupables = $scope.campos;
                var totalCampos = camposagrupables ? camposagrupables.length : 0;
                $scope.$watch('quemeco', function (newValue, oldValue) {
                    var total = newValue ? newValue.length : 0;
                    //INICIALIZAR ARRAY
                    for (var j = 0; j < total; j++) {
                        for (var k = 0; k< totalCampos; k++){
                            if ($scope.quemeco[j][camposagrupables[k] + 'child']) {
                                $scope.quemeco[j][camposagrupables[k] + 'child'] = null;
                            }
                            if ($scope.quemeco[j][camposagrupables[k] + 'parent']) {
                                $scope.quemeco[j][camposagrupables[k] + 'parent'] = null;
                            }
                            //$scope.quemeco[j].class = null;
                        }
                    }
                    function Par() {
                        this.par = 'impar';
                        this.changePar = function(){
                            this.par === 'par' ? this.par = 'impar' : this.par = 'par';
                        };
                    }
                    var par = new Par();
                    //AGRUPAR
                    for (var j = 0; j < total; j++) {
                        for (var k = 0; k< totalCampos; k++){
                            if (j === 0 || (!$scope.quemeco[j][camposagrupables[k] + 'child'] && !$scope.quemeco[j][camposagrupables[k] + 'parent'])) {
                                //customerParent element
                                var i = 1;
                                var condition = false;
                                if(k===0){
                                    while ($scope.quemeco[j + i] && $scope.quemeco[j][camposagrupables[k]] === $scope.quemeco[j + i][camposagrupables[k]]) {
                                        $scope.quemeco[j + i][camposagrupables[k] + 'child'] = true;
                                        //$scope.quemeco[j + i].class = clase;
                                        i++;
                                    }
                                }else{
                                    while ($scope.quemeco[j + i] && $scope.quemeco[j][camposagrupables[k]] === $scope.quemeco[j + i][camposagrupables[k]]
                                    && $scope.quemeco[j][camposagrupables[k-1]] === $scope.quemeco[j + i][camposagrupables[k-1]]) {
                                        $scope.quemeco[j + i][camposagrupables[k] + 'child'] = true;
                                        //$scope.quemeco[j + i].class = clase;
                                        i++;
                                    }
                                }
                                $scope.quemeco[j][camposagrupables[k] + 'parent'] = i;
                            }
                        }
                        if (j === 0 || ($scope.quemeco[j][camposagrupables[0] + 'parent'])) {
                            par.changePar();
                            $scope.quemeco[j].class = par.par + ' first';
                        }else {
                            $scope.quemeco[j].class = par.par;
                        }
                    }
                });
            }]
        };
        return directive;
        //controller.$inject = ['$scope'];

    }

})();