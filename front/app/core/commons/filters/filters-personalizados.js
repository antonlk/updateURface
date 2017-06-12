(function() {

    'use strict';

    /* Filters */
// need load the moment.js to use this filter. 
    angular.module('app')
        //.filter('fromNow', function () {
        //    return function (date) {
        //        return moment(date).fromNow();
        //    }
        //})

        .filter('capitalize', function () {
            return function (input, scope) {
                if (input != null) {
                    input = input.toLowerCase();
                    var arr = [];
                    arr = input.split(" ");
                    var sb = "";
                    for (var i = 0; i < arr.length; ++i) {
                        sb = sb + " " + arr[i].substring(0, 1).toUpperCase() + arr[i].substring(1);
                    }
                    return sb;
                }
            }
        })


        .filter('age', function () {
            function calculateAge(birthday) { // birthday is a date
                var ageDifMs = Date.now() - new Date(birthday).getTime();
                var ageDate = new Date(ageDifMs); // miliseconds from epoch
                return Math.abs(ageDate.getUTCFullYear() - 1970);
            }

            return function (birthdate, unity) {
                return calculateAge(birthdate) + ' ' + unity;
            };
        })
        .filter('unity', function () {
            return function (input, unity) {
                if (input != null)
                    return input + ' ' + unity;
            };
        })

        .filter('timeago', function () {
            return function (input, p_allowFuture) {
                var substitute = function (stringOrFunction, number, strings) {
                        var string = angular.isFunction(stringOrFunction) ? stringOrFunction(number, dateDifference) : stringOrFunction;
                        var value = (strings.numbers && strings.numbers[number]) || number;
                        return string.replace(/%d/i, value);
                    },
                    nowTime = (new Date()).getTime(),
                    date = (new Date(input)).getTime(),
                //refreshMillis= 6e4, //A minute
                    allowFuture = p_allowFuture || false,
                    strings = {
                        prefixAgo: 'hace',
                        prefixFromNow: '',
                        suffixAgo: "",
                        suffixFromNow: "desde ahora",
                        seconds: "menos de un minuto",
                        minute: "1 minuto",
                        minutes: "%d minutos",
                        hour: " 1 hora",
                        hours: " %d horas",
                        day: "1 día",
                        days: "%d días",
                        month: " 1 mes",
                        months: "%d meses",
                        year: " 1 año",
                        years: "%d años"
                    },
                    dateDifference = nowTime - date,
                    words,
                    seconds = Math.abs(dateDifference) / 1000,
                    minutes = seconds / 60,
                    hours = minutes / 60,
                    days = hours / 24,
                    years = days / 365,
                    separator = strings.wordSeparator === undefined ? " " : strings.wordSeparator,
                    prefix = '',
                    suffix = strings.suffixAgo;

                if (allowFuture) {
                    prefix = strings.prefixAgo;
                }

                words = seconds < 45 && substitute(strings.seconds, Math.round(seconds), strings) ||
                seconds < 90 && substitute(strings.minute, 1, strings) ||
                minutes < 45 && substitute(strings.minutes, Math.round(minutes), strings) ||
                minutes < 90 && substitute(strings.hour, 1, strings) ||
                hours < 24 && substitute(strings.hours, Math.round(hours), strings) ||
                hours < 42 && substitute(strings.day, 1, strings) ||
                days < 30 && substitute(strings.days, Math.round(days), strings) ||
                days < 45 && substitute(strings.month, 1, strings) ||
                days < 365 && substitute(strings.months, Math.round(days / 30), strings) ||
                years < 1.5 && substitute(strings.year, 1, strings) ||
                substitute(strings.years, Math.round(years), strings);
                //console.log(prefix+words+suffix+separator);
                prefix.replace(/ /g, '')
                words.replace(/ /g, '')
                suffix.replace(/ /g, '')
                return (prefix + ' ' + words + ' ' + suffix + ' ' + separator);

            };
        })


        .filter("filteri18n", ["$filter", function ($filter) {
            var filterFn = $filter("filter");

            /** Transforma el texto quitando todos los acentos diéresis, etc. **/
            function normalize(texto) {
                texto = texto.replace(/[áàäâ]/g, "a");
                texto = texto.replace(/[éèëê]/g, "e");
                texto = texto.replace(/[íìïî]/g, "i");
                texto = texto.replace(/[óòôö]/g, "o");
                texto = texto.replace(/[úùüü]/g, "u");
                texto = texto.toUpperCase();
                return texto;
            }

            /** Esta función es el comparator en el filter **/
            function comparator(actual, expected) {
                if (normalize(actual).indexOf(normalize(expected)) >= 0) {
                    return true;
                } else {
                    return false;
                }
            }

            /** Este es realmente el filtro **/
            function filteri18n(array, expression) {
                //Lo único que hace es llamar al filter original pero pasado
                //la nueva función de comparator
                return filterFn(array, expression, comparator)
            }

            return filteri18n;

        }])

        .filter('bytes', function() {
            return function(bytes, precision) {
                if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) {
                    return '-';
                }

                if (typeof precision === 'undefined') {
                    precision = 1;
                }

                var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
                    number = bytes === 0 ? 0 : Math.floor(Math.log(bytes) / Math.log(1024));

                return (bytes / Math.pow(1024, Math.floor(number || 1))).toFixed(precision) +  ' ' + units[number];
            }
        })

        .filter('smartShortener', function () {
            return function (value, wordwise, max, tail) {
                if (!value) return '';

                max = parseInt(max, 10);
                if (!max) return value;
                if (value.length <= max) return value;

                value = value.substr(0, max);
                if (wordwise) {
                    var lastspace = value.lastIndexOf(' ');
                    if (lastspace != -1) {
                        value = value.substr(0, lastspace);
                    }
                }

                return value + (tail || ' …');
            };
        });

}());