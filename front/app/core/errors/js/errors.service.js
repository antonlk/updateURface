(function () {
  'use strict';

  angular.module('core.errors')
    .service("ErrorsService", ErrorsService)
    .service("errorHttpService", errorHttpService)
    .factory("errorLogService", errorLogService)
    .provider("$exceptionHandler", $exceptionHandler)
    .factory('httpCodertyInterceptor', httpCodertyInterceptor);

  function $exceptionHandler() {
    return {
      $get: function (errorLogService) {
        return (errorLogService);
      }
    };
  }

  errorLogService.$inject = ['$log', '$window', 'GLOBALS'];
  function errorLogService($log, $window, GLOBALS) {
    function log(exception, cause) {
      $log.error.apply($log, arguments);
      try {
        var errorMessage = exception.toString();
        $.ajax({
          type: "POST",
          url: GLOBALS.baseUrl + "/api/error",
          contentType: "application/json",
          data: angular.toJson({
            location: $window.location.hash,
            description: errorMessage,
            data: (cause || ""),
            nw: ((GLOBALS.nw) ? true : false),
            origin: "FRONT"
          })
        });
      } catch (loggingError) {
        $log.warn("Error logging failed");
        $log.log(loggingError);
      }
    }
    return (log);
  }

  errorHttpService.$inject = ['GLOBALS', '$window'];
  function errorHttpService(GLOBALS, $window) {
    this.saveHttpError = function (data) {

      try {
        $.ajax({
          type: "POST",
          url: GLOBALS.baseUrl + "/api/error",
          contentType: "application/json",
          data: angular.toJson({
            location: $window.location.hash,
            description: data.description,
            data: data.data,
            api: data.api,
            nw: ((GLOBALS.nw) ? true : false),
            origin: "$http",
            code: data.code
          }),
          error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 403) {
              $window.location.assign(GLOBALS.baseUrl)
            }
          }
        });
      } catch (error) {
        console.error('error', error);
      }
    };
  }


  ErrorsService.$inject = ['$http', 'GLOBALS'];
  function ErrorsService($http, GLOBALS) {

    this.saveError = function (data) {
      //TODO:: Se deshabilita la imágen para pruebas en servidor de prod
      var resp = {
        method: 'POST',
        url: $http.defaults.urlApi + '/error',
        data: {
          api: data.api,
          capture: data.capture,
          code: data.code,
          data: data.data || null,
          description: data.description,
          location: data.location,
          nw: ((GLOBALS.nw) ? true : false),
          origin: data.origin
        },
        timeout: $http.defaults.timeout
      };

      if (GLOBALS.nw && !data.capture) {
        try {
          GLOBALS.nw.Window.get().capturePage(function (base64string) {
            resp.data.capture = base64string;
            $http(resp);
          }, { format: 'jpeg', datatype: 'buffer' });
        } catch (e) {

        }
      } else {
        return $http(resp);
      }
    };

  }

  httpCodertyInterceptor.$inject = ['$q', 'errorHttpService', 'GLOBALS'];
  function httpCodertyInterceptor($q, errorHttpService, GLOBALS) {
    return {
      responseError: function (rejection) {
        errorHttpService.saveHttpError({
          api: rejection.config.url,
          code: rejection.status,
          data: JSON.stringify(rejection.config.data),
          description: rejection.config.method
        });
        if (rejection.status === 403) {
          console.error("Forbiden");
          location.replace(GLOBALS.baseUrl + '/#/access/signout');
        } else if (rejection.status === 502) {
          console.error("Bad Gateway");
          location.replace(GLOBALS.baseUrl + '/#/access/signout');
        }
        return $q.reject(rejection);
      }
    };
  }


})();