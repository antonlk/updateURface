(function(){
    'use strict';

/**
 * @name codertyExport
 * @desc Simple interfaz para facilitar lazy loading de las librerías necesarias exportar tablas
 */

function CodertyServiceExport(){    
    
    this.codertyExportInit = function(){
      return alasql;  
    }
}

angular
    .module('codertyExport', [])
    .service('CodertyServiceExport', CodertyServiceExport);

})();