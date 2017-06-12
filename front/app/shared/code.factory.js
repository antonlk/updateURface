(function () {
    'use strict';

    angular
        .module('app')
        .factory('CodeFactory', codeFactory);

    codeFactory.$inject = [];
    function codeFactory() {

        return {
            getCode: getCode
        }


        function getCode() {
            return createPassword();
        }


        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }

        function createPassword() {

            var passwordLength = 12;
            var addUpper = true;
            var addNumbers = true;
            var addSymbols = true;


            var lowerCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            var upperCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];


            var noOfLowerCharacters = 0,
                noOfUpperCharacters = 0,
                noOfNumbers = 0;


            var noOfneededTypes = addUpper + addNumbers;

            var noOfLowerCharacters = getRandomInt(1, passwordLength - noOfneededTypes);

            var usedTypeCounter = 1;

            if (addUpper) {
                noOfUpperCharacters = getRandomInt(1, passwordLength - noOfneededTypes + usedTypeCounter - noOfLowerCharacters);
                usedTypeCounter++;
            }

            if (addNumbers) {
                noOfNumbers = getRandomInt(1, passwordLength - noOfneededTypes + usedTypeCounter - noOfLowerCharacters - noOfUpperCharacters);
                usedTypeCounter++;
            }

            var passwordArray = [];

            for (var i = 0; i < noOfLowerCharacters; i++) {
                passwordArray.push(lowerCharacters[getRandomInt(1, lowerCharacters.length - 1)]);
            }

            for (var i = 0; i < noOfUpperCharacters; i++) {
                passwordArray.push(upperCharacters[getRandomInt(1, upperCharacters.length - 1)]);
            }

            for (var i = 0; i < noOfNumbers; i++) {
                passwordArray.push(numbers[getRandomInt(1, numbers.length - 1)]);
            }

            passwordArray = shuffleArray(passwordArray);

            return passwordArray.join("");
        };

    }
})();