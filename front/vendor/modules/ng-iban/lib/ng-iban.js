// Generated by CoffeeScript 1.12.5
'use strict';
var IBAN;

IBAN = require('iban');

angular.module('mm.iban', ['ng']).directive('ngIban', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      ngModel: '='
    },
    link: function(scope, elem, attrs, ctrl) {
      var isValidIban, parseIban;
      parseIban = function(value) {
        if (value != null) {
          return value.toUpperCase().replace(/\s/g, '');
        } else {
          return void 0;
        }
      };
      isValidIban = function(value) {
        var iban;
        if (!(attrs.required || value)) {
          return true;
        }
        iban = parseIban(value);
        return IBAN.isValid(iban);
      };
      ctrl.$validators.ngIban = function(modelValue) {
        return isValidIban(modelValue);
      };
      ctrl.$parsers.unshift(function(viewValue) {
        var parsed, pretty, valid;
        if (viewValue != null) {
          valid = isValidIban(viewValue);
          if (valid) {
            parsed = parseIban(viewValue);
            pretty = IBAN.printFormat(parsed);
            if (pretty !== viewValue) {
              ctrl.$setViewValue(pretty);
              ctrl.$render();
            }
            return parsed;
          } else {
            return viewValue;
          }
        }
      });
      ctrl.$formatters.unshift(function(modelValue) {
        var parsed, pretty, valid;
        if (modelValue != null) {
          valid = isValidIban(modelValue);
          if (valid) {
            parsed = parseIban(modelValue);
            if (parsed !== modelValue) {
              scope.ngModel = parsed;
            }
            return pretty = IBAN.printFormat(parsed);
          } else {
            return modelValue;
          }
        }
      });
    }
  };
}).filter('iban', function() {
  return function(string, separator) {
    var isValidIban, parseIban, valid;
    parseIban = function(value) {
      if (value != null) {
        return value.toUpperCase().replace(/\s/g, '');
      } else {
        return void 0;
      }
    };
    isValidIban = function(value) {
      var iban;
      iban = parseIban(value);
      return IBAN.isValid(iban);
    };
    valid = isValidIban(string);
    if (valid) {
      return IBAN.printFormat(string, separator);
    } else {
      return string;
    }
  };
});
