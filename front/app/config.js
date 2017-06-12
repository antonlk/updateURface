// config

var app =
  angular.module('app')

    .constant("GLOBALS",
    {
      "baseUrl": window.location.origin || 'http://localhost',
      "var": "val",
      "nw": null,
      "localAccess": false,
      "editingDir": "",
      "localServerPath": "",
      "maxThumbSize": 8 //MB

    })

    .config(['$compileProvider', function ($compileProvider) {
      // disable debug info
      $compileProvider.debugInfoEnabled(true);
    }])

    .config(['$logProvider',
      function ($logProvider) {
        $logProvider.debugEnabled(false);
      }
    ])

    .config(function ($mdThemingProvider) {
      $mdThemingProvider.definePalette('appBase', {
        '50': '#a6c8e6',
        '100': '#92bce0',
        '200': '#7eb0db',
        '300': '#6aa3d5',
        '400': '#5697d0',
        '500': '#428bca',
        '600': '#357ebd',
        '700': '#3071a9',
        '800': '#2a6496',
        '900': '#245682',
        'A100': '#b9d4eb',
        'A200': '#cde1f1',
        'A400': '#e1edf7',
        'A700': '#1f496e',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
        'contrastLightColors': 'dark'
      });
      $mdThemingProvider.theme('default')
        .primaryPalette('appBase');
    })

    .config(['GLOBALS', function (GLOBALS) {
      try {
        var NW = require('nw.gui');
        var win = NW.Window.get();
        var winSizeScreenPercent = 90;
        GLOBALS.nw = NW;
        GLOBALS.localServerPath = NW.App.manifest.localServerPath;

        NW.Screen.Init();
        var screenSize = NW.Screen.screens[0].work_area;
        var windowSizeW = parseInt((screenSize.width * winSizeScreenPercent) / 100);
        var windowSizeH = parseInt((screenSize.height * winSizeScreenPercent) / 100);
        win.resizeTo(windowSizeW, windowSizeH);
        win.setPosition('center');

        onload = function () {
          win.show();
        };
      }
      catch (e) {
        GLOBALS.nw = null;
      }
    }])

    .config(function ($mdDateLocaleProvider) {
      // Can change week display to start on Monday.
      $mdDateLocaleProvider.firstDayOfWeek = 1;
      $mdDateLocaleProvider.formatDate = function (date) {
        if (date) {
          var day = date.getDate();
          var monthIndex = date.getMonth();
          var year = date.getFullYear();

          return day + '/' + (monthIndex + 1) + '/' + year;
        } else {
          return null;
        }
      };
    })

    .config(
    ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
      function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;
      }
    ])

    .config(['$translateProvider', function ($translateProvider) {
      // Register a loader for the static files
      // So, the module will search missing translation tables under the specified urls.
      // Those urls are [prefix][langKey][suffix].
     /* $translateProvider.useStaticFilesLoader({
        prefix: 'l10n/',
        suffix: '.js'
      });*/
      // Tell the module what language to use by default
      $translateProvider.preferredLanguage('es_ES');
      // Tell the module to store the language in the local storage
      $translateProvider.useLocalStorage();
    }])
 
    .config(['$httpProvider', 'GLOBALS', function ($httpProvider, GLOBALS) {
      $httpProvider.useApplyAsync(true);
      $httpProvider.defaults.timeout = 5000;
      $httpProvider.defaults.withCredentials = true;
      if (window.location.protocol !== 'file:') {
        $httpProvider.defaults.url = GLOBALS.baseUrl;
      } else {
        $httpProvider.defaults.url = 'http://localhost';
      }

      $httpProvider.defaults.urlApi = $httpProvider.defaults.url + '/api';
      //$httpProvider.interceptors.push('httpCodertyInterceptor');
    }]);

//.config(["$socketProvider", function ($socketProvider) {
//        if(window.location.protocol !== 'file:'){
//            $socketProvider.setUrl(window.location.origin);
//        }else{
//            $socketProvider.setUrl('https://projects.havoc.es');
//        }
//}]);
