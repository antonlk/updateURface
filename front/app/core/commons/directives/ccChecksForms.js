(function () {
  'use strict';

  app

    .directive('ccCheckAvailableMail', ccCheckAvailableMail)
    .directive('ccCheckCorrectMail', ccCheckCorrectMail)
    .directive('ccCheckAvailableUser', ccCheckAvailableUser)
    .directive('checkIsValidate', checkIsValidate)
    .directive('ccCheckPhone', ccCheckPhone)
    .directive('ngThumb', ngThumb);

  ccCheckAvailableMail.$inject = ['$http'];
  function ccCheckAvailableMail($http) {

    var directive = {
      require: 'ngModel',
      link: link,
      scope: {
        ccCheckAvailableMail: "="
      }
    };
    return directive;

    function link(scope, elem, attr, ctrl) {

      var valorInicial = null;
      ctrl.$parsers.unshift(function (viewValue) {
        if (viewValue && !valorInicial) {
          valorInicial = ctrl.$modelValue;
        }
        if (viewValue && viewValue.match(/[a-zA-Z0-9\-_]+@[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]{2,}/)) {
          if (viewValue != valorInicial) {
            $http.get($http.defaults.urlApi + '/users/availableMail/' + viewValue)
              .success(function (res) {
                ctrl.$setValidity('CheckAvailableMail', res.available);
                return undefined;
              })
              .error(function (x) {
                return undefined;
              });
            return viewValue;
          } else {
            return viewValue;
          }
        } else {
          ctrl.$setValidity('CheckAvailableMail', false);
          return undefined;
        }
      });
    }
  }

  function ccCheckCorrectMail() {

    var directive = {
      require: 'ngModel',
      link: link
    };

    return directive;

    function link(scope, elem, attr, ctrl) {

      ctrl.$parsers.unshift(function (viewValue) {

        if (viewValue) {
          if (viewValue.match(/[a-zA-Z0-9\-_]+@[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]{2,}/)) {
            ctrl.$setValidity('CheckCorrectMail', true);
            return viewValue;

          } else {
            ctrl.$setValidity('CheckCorrectMail', false);
            return undefined;
          }
        } else {
          ctrl.$setValidity('CheckCorrectMail', true);
          return viewValue;
        }

      });
    }
  }

  ccCheckAvailableUser.$inject = ['$http'];
  function ccCheckAvailableUser($http) {

    var directive = {
      require: 'ngModel',
      link: link
    };

    return directive;


    function link(scope, elem, attr, ctrl) {

      var valorInicial = null;

      ctrl.$parsers.unshift(function (viewValue) {

        if (viewValue && !valorInicial) {
          valorInicial = ctrl.$modelValue;
        }

        if (viewValue && viewValue.match(/^[a-zA-Z0-9\-_.ñÑ]*$/)) {

          if (viewValue != valorInicial) {

            $http.get($http.defaults.urlApi + '/users/availableUser/' + viewValue)
              .success(function (res) {
                ctrl.$setValidity('CheckAvailableUser', res.available);
                return true;
              })
              .error(function (x) {
                return undefined;
              });
            return viewValue;
          } else {
            return viewValue;
          }

        } else {
          ctrl.$setValidity('CheckAvailableUser', false);
          return undefined;
        }
      });
    }
  }


  checkIsValidate.$inject = ['$http'];
  function checkIsValidate($http) {

    return {
      require: 'ngModel',
      scope: {
        checkIsValidate: '='
      },
      link: link
    };

    function link(scope, elem, attr, ctrl) {
      scope.$watch('checkIsValidate', function (nVal) {
        ctrl.$setValidity('checkIsValid', nVal);
      });
    }
  }


  function ccCheckPhone() {

    var directive = {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        ccCheckPhone: '=',
        model: '=ngModel'
      },
      link: link
    };

    return directive;


    function link(scope, elem, attr, ctrl) {

      if (attr.ccCheckPhone && attr.ccCheckPhone == "required") {
        //Si es obligatorio el teléfono
        ctrl.$parsers.unshift(function (viewValue) {

          if (viewValue && viewValue.match(/[0-9\+]{4,}$/)) {
            ctrl.$setValidity('CheckPhone', true);
            return viewValue;
          } else {
            ctrl.$setValidity('CheckPhone', false);
            return false;
          }
        });
      } else {
        //Si solo se comprueba el formato
        ctrl.$parsers.unshift(function (viewValue) {

          if (viewValue && viewValue.match(/[0-9\+]{4,}$/)) {
            ctrl.$setValidity('CheckPhone', true);
            return viewValue;

          } else {
            if (!viewValue) {
              ctrl.$setValidity('CheckPhone', true);
              return true;
            }
            else {
              ctrl.$setValidity('CheckPhone', false);
              return false
            }
          }
        });
      }
    }

  }

  ngThumb.$inject = ['$window'];
  function ngThumb($window) {
    var helper = {
      support: !!($window.FileReader && $window.CanvasRenderingContext2D),
      isFile: function (item) {
        return angular.isObject(item) && item instanceof $window.File;
      },
      isImage: function (file) {
        var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    };

    return {
      restrict: 'A',
      template: '<canvas/>',
      link: function (scope, element, attributes) {
        if (!helper.support) return;

        var params = scope.$eval(attributes.ngThumb);

        if (!helper.isFile(params.file)) return;
        if (!helper.isImage(params.file)) return;

        var canvas = element.find('canvas');
        var reader = new FileReader();

        reader.onload = onLoadFile;
        reader.readAsDataURL(params.file);

        function onLoadFile(event) {
          var img = new Image();
          img.onload = onLoadImage;
          img.src = event.target.result;
        }

        function onLoadImage() {
          var width = params.width || this.width / this.height * params.height;
          var height = params.height || this.height / this.width * params.width;
          canvas.attr({ width: width, height: height });
          canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
        }
      }
    };
  }

})();


