(function () {
  'use strict';

  app
    .directive('cdtySticky', cdtySticky)
    .directive('cdtyStickyTabs', cdtyStickyTabs);

  cdtySticky.$inject = [ ];
  function cdtySticky($compile) {
    return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
        /**
         * Deja el elemento que tenga la directiva pegado a la cabecera.
         */
        var scrollFn = function(){
          // var alturaTabla = angular.element("table.table thead").offset().top;
          //console.log("--" + alturaTabla);
          var desplazamientoActual = angular.element(this).scrollTop();
          if (desplazamientoActual > 20) {
            element.addClass("fijar");
            angular.element(".fijar").css('width', angular.element(".card").width());
            angular.element(".layout-padding").css('padding-top', '85px');
          } else {
            element.removeClass("fijar");
            angular.element(".layout-padding").css('padding-top', '0');
          }
          
          if ( attrs.cdtySticky === 'table' ){
            /**
             * Fijar la cabecera de la tabla
             */
            var foo = false;
            if( desplazamientoActual > 120 && foo === false) {
              foo = true;
              angular.element("table.table thead").addClass( "fijarthead" );
              angular.element(".fijarthead").css('width', angular.element("table.table").width());
              angular.element(".layout-padding .row:first-child").css('padding-top', '20px');
              angular.element("table.table").css('margin-top', '42px');
              var tabla = angular.element('table.table thead th');
              var total = angular.element('table.table thead th').length;
              while(total){
                total--;
                angular.element('table.table thead th').eq(total).css('width', angular.element('table.table tbody td').eq(total).width()+30);
              }

              $(window).resize(function () {
                    angular.element(".fijar").css('width', angular.element(".card").width());
                    angular.element(".fijarthead").css('width', angular.element("table.table").width());
                    
                    var tabla = angular.element('table.table thead th');
                    var total = angular.element('table.table thead th').length;
                    while(total){
                      total--;
                      angular.element('table.table thead th').eq(total).css('width', angular.element('table.table tbody td').eq(total).width()+30);
                    }
              });

            }else{
              angular.element("table.table").css('margin-top', '0px');
              $(window).resize(function () {
                angular.element(".fijar").css('width', angular.element(".card").width());
              });
              angular.element("table.table thead").removeClass( "fijarthead" );
              if ( desplazamientoActual > 20 && foo === true) {
                foo = false;
                angular.element(".fijar").css('width', angular.element(".card").width());
                
              }
            }
          }

        };
        angular.element('.main-container').bind( "scroll", scrollFn );
        
        /**
         * unbid de la funcion cuando deja de existir el elemento
         */
        element.on('$destroy', function() {
          angular.element('.main-container').unbind( "scroll", scrollFn );
        });
      }
    };
  }

  cdtyStickyTabs.$inject = [ ];
  function cdtyStickyTabs($compile) {
    return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
        /**
         * Deja el elemento que tenga la directiva pegado a la cabecera.
         */
        var scrollFn = function(){
          var desplazamientoActual = angular.element(this).scrollTop();

          if ( desplazamientoActual > 20 ) {
            angular.element("md-tabs-wrapper").addClass( "fijar" );
            angular.element(".fijar").css('width', angular.element(".card").width());
            angular.element("md-tab-content").css('padding-top', '50px');
            angular.element("md-content").css('padding-top', '0px');
          } else {
            angular.element(".fijar").css('width', angular.element(".card").width());
            angular.element("md-tabs-wrapper").removeClass( "fijar" );
            angular.element("md-tab-content").css('padding-top', '0');
          }

        };
        angular.element('.main-container').bind( "scroll", scrollFn );
        /**
         * unbid de la funcion cuando deja de existir el elemento
         */
        element.on('$destroy', function() {
          angular.element('.main-container').unbind( "scroll", scrollFn );
        });
      }
    };
  }

})();