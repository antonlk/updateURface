(function() {
    'use strict';

    app
        .factory('DatesFactory', DatesFactory)
        .factory('ToasterFactory', ToasterFactory)
        .factory('LocalAccess', LocalAccess)

      

    ToasterFactory.$inject = [ 'GLOBALS', 'toaster'];
    function ToasterFactory( GLOBALS, toaster ) {
        return {
            pop:pop
        };
        function showNotification(type, title, body) {

            var icon = 'file:///' + process.cwd() + '/notifications/' + type + '.png';
            //var icon = '/img/notifications/' + type + '.png';

            var notification = new Notification(title, {icon: icon, body: body});

            return notification;
        }

        function pop(toast){
            if (GLOBALS.nw){   //NW VIEW
                showNotification(toast.type, toast.title, toast.body);
            }else{
                //WEB VIEW
                toaster.pop(toast.type, toast.title, toast.body);
            }
        }
    }

    DatesFactory.$inject = [];
    function DatesFactory( ) {

        return {
            pad                             : pad,
            rightPad                        : rightPad,
            formatDateddMMyyyyToyyyyMMdd    : formatDateddMMyyyyToyyyyMMdd,
            formatDateddMMyyyy              : formatDateddMMyyyy,
            formatDateToddMMyyyy            : formatDateToddMMyyyy,
            formatDateToyyyyMMdd            : formatDateToyyyyMMdd,
            formatddMMyyyyToDate            : formatddMMyyyyToDate,
            formatddMMyyyyToDateFixMonth    : formatddMMyyyyToDateFixMonth,
            getLastWeek                     : getLastWeek,
            getLastMonth                    : getLastMonth,
            formatDate                      : formatDate,
            getMontNames                    : getMontNames,
            monthsAbrev                     : ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],
            getMonday                       : getMonday

        };

        function formatDate(date){
            var dia 		= ("0"+ date.getDate() ).slice(-2);
            var mes 		= ("0"+ (date.getMonth() + 1) ).slice(-2);
            var ano 		= date.getFullYear();
            return "" + ano+mes+dia;
        }

        function getMontNames(initialMonth){
            var initialMonth = initialMonth || 0;
            var res = [];
            for (var i = 0; i < 12; i++) {
                if (initialMonth + i > 11){
                    res.push( this.monthsAbrev[ initialMonth - 12 + i ] );
                }else{
                    res.push( this.monthsAbrev[ initialMonth + i ] );
                }
            }
            return res;
        }

        /**
         * Format date ddMMyyyy to yyyyMMdd
         * @param d
         * @returns String (yyyyMMdd)
         */
        function formatDateddMMyyyyToyyyyMMdd(d){
            var dateA = d.substr(4,4) + d.substr(2,2) + d.substr(0,2);
            return dateA;
        }
        /**
         * Format date ddMMyyyy to dd/MM/yyyy
         * @param d
         * @returns String dd/MM/yyyy
         */
        function formatDateddMMyyyy(d){
            return d.substr(0,2) + '/' + d.substr(2,2) + '/' + d.substr(4,4) ;
        }

        /**
         * Format date Date() to yyyyMMdd
         * @param d
         * @returns String (yyyyMMdd)
         */
        function formatDateToyyyyMMdd(d){
            var dateA = d.getFullYear() + "" + pad(d.getMonth() + 1, 2) + pad(d.getDate(),2);
            return dateA;
        }

        /**
         * Format date Date() to ddMMyyyy
         * @param d
         * @returns String (ddMMyyyy)
         */
        function formatDateToddMMyyyy(d){
            var dateA = pad(d.getDate(),2) + "" + pad(d.getMonth() + 1, 2) + d.getFullYear() ;
            return dateA;
        }

        function pad(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }

        function rightPad(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(n) + z;
        }

        function formatddMMyyyyToDate(d){
            try{
                return new Date(d.substr(4,4),d.substr(2,2), d.substr(0,2));
            }catch(e){
                return null;
            }
        }
        
        function formatddMMyyyyToDateFixMonth(d){
            try{
                var month = parseInt(d.substr(2,2)) - 1;
                return new Date(d.substr(4,4),month, d.substr(0,2));
            }catch(e){
                return null;
            }
        }

        function _getLastWeek(){
            var today = new Date();
            return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        }
        function _getLastMonth(){
            var today = new Date();
            return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
        }

        function getLastWeek(){
            return _getLastWeek();
        }

        function getLastMonth(){
            return _getLastMonth();
        }

        function getMonday() {
            var d = new Date();
            //console.log('d', d);
            var day = d.getDay(),
                diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
            return new Date(d.setDate(diff));
        }

    }

    LocalAccess.$inject = ['$http', 'GLOBALS', '$localStorage', '$rootScope', 'ErrorsService'];
    function LocalAccess($http, GLOBALS, $localStorage, $rootScope, ErrorsService) {
        return {
            check: check
        };

        function check(callback){
            // COMPROBACIÓN DE ACCESO A DIRECTORIO ROOTPATH:
            var inNW = ((GLOBALS.nw)?true:false);

            var data = {};
            data.origin = 'FRONT';

            if(inNW){
                //Se obtiene rootPath
                $http.get($http.defaults.urlApi + '/configuration/rootPath')
                    .success(function(res){
                        //Si hay acceso a rootPath:
                        if(process.mainModule.exports.dirExists(res[0].rootPath)){
                            //Se obtiene editingPath del usuario
                            return $http.get($http.defaults.urlApi + '/configuration/editingPath')
                                .success(function(res){
                                    GLOBALS.editingDir = res[0].editingPath;

                                    //Si hay acceso a editingPath:
                                    if(process.mainModule.exports.dirExists(res[0].editingPath)){
                                        //Sincroniza los documentos locales con los ficheros en edición:
                                        syncFilesEditing();
                                        //Inicia watcher de documentos en edición:
                                        process.mainModule.exports.watchEditingFiles(GLOBALS.editingDir);
                                        $localStorage.localAccess = true;

                                        $rootScope.$broadcast('updateLocalAccess');
                                        callback(null, true);

                                    }else{
                                        process.mainModule.exports.createFolder(GLOBALS.editingDir, function(err){
                                            if (err) {
                                                var error = 'ERROR AL INTENTAR acceder a editingPath: ' + GLOBALS.editingDir;
                                                console.log(error);
                                                $localStorage.localAccess = false;
                                                $rootScope.$broadcast('updateLocalAccess');
                                                data.description = error;
                                                ErrorsService.saveError(data);
                                                callback(error, false);
                                            } else {
                                                syncFilesEditing();
                                                //Inicia watcher de documentos en edición:
                                                process.mainModule.exports.watchEditingFiles(GLOBALS.editingDir);
                                                $localStorage.localAccess = true;
                                                $rootScope.$broadcast('updateLocalAccess');
                                                callback(null, true);
                                            }
                                        });


                                    }
                                })
                                .error(function(e){
                                    var error = 'ERROR AL INTENTAR OBTENER editingPath: '+ e + GLOBALS.editingDir;
                                    console.log(error);
                                    $localStorage.localAccess = false;
                                    $rootScope.$broadcast('updateLocalAccess');
                                    data.description = error;
                                    ErrorsService.saveError(data);
                                    callback(error, false);
                                });
                        }else{
                            var error = 'ERROR AL INTENTAR acceder a rootPath: ' + res[0].rootPath;
                            console.log(error);
                            $localStorage.localAccess = false;
                            $rootScope.$broadcast('updateLocalAccess');
                            data.description = error;
                            ErrorsService.saveError(data);
                            callback(error, false);
                        }
                    })
                    .error(function(e){
                        var error = 'ERROR AL INTENTAR OBTENER ROOTPATH: '+ e;
                        console.log(error);
                        $localStorage.localAccess = false;
                        $rootScope.$broadcast('updateLocalAccess');
                        data.description = error;
                        ErrorsService.saveError(data);
                        callback(error, false);
                    });


            }else{
                $localStorage.localAccess = false;
                $rootScope.$broadcast('updateLocalAccess');
                callback(null, false);
            }
        }
    }

    RequireRolService.$inject =['$sessionStorage', 'md5'];
    function RequireRolService($sessionStorage, md5){

        this.requireRol = function (rol) {
            if (md5 && $sessionStorage.usuario && $sessionStorage.usuario.roles && rol) {
                var rolHash = md5.createHash(rol);
                var total = $sessionStorage.usuario.roles.length;
                for (var i = 0; i < total; i++) {
                    if ($sessionStorage.usuario.roles[i] === rolHash) {
                        return true;
                    }
                }
            }
            return false;
        };
    }
    
    MenuService.$inject = ['$http'];
    function MenuService($http) {
        var BASEURL = $http.defaults.urlApi;

        this.getMenuItems = function () {
            return $http({
                url: BASEURL + '/users/menu',
                method: 'GET',
                timeout: $http.defaults.timeout
            });
        };
    }


})();