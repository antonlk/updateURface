(function () {
    'use strict';

    angular
        .module('app')
        .service('DataService', DataService);

    DataService.inject = ['$http'];
    function DataService($http) {
        var BASEURL = $http.defaults.urlApi;

        //--------------------------------------------//
        //                 TEACHERS                   //
        //--------------------------------------------//

        this.getTeacher = getTeacher;
        this.revokeAuthStudent = revokeAuthStudent;
        this.grantAuthStudent = grantAuthStudent;
        this.getClassNameList = getClassNameList;
        this.getModalityList = getModalityList;

        /**
                 * @description Devuelve profesor por id
                 * @param {number} teacherId
                 */

        function getTeacher(teacherId) {
            return $http({
                url: BASEURL + '/teachers/teacher/' + teacherId,
                method: 'GET',
                timeout: $http.defaults.timeout
            });
        }


        /**
         * @description codigo para el alumno
         * @param {number} studentId
         * @param {number} teacherId
         * @param {String} code
         */

        function grantAuthStudent(studentId, teacherId, code) {
            return $http.post(BASEURL + '/students/student/' + studentId + '/auth/grant',
                { studentId: studentId, teacherId: teacherId, code: code });

        }


        /**
         * @description elimina el codigo del alumno
         * @param {number} studentId
         */

        function revokeAuthStudent(studentId) {
            return $http.post(BASEURL + '/students/student/' + studentId + '/auth/revoke',
                { studentId: studentId });

        }

        /**
         * @description lista de clases
         */

         function getClassNameList (modality){
            return $http({
                url: BASEURL + '/teachers/' + modality + '/classnamelist',
                method: 'GET',
                timeout: $http.defaults.timeout
            });
         }

        /**
         * @description lista de modalidades
         */

         function getModalityList(){
            return $http({
                url: BASEURL + '/teachers/modalitylist',
                method: 'GET',
                timeout: $http.defaults.timeout
            });
         }

        //--------------------------------------------//
        //                 STUDENTS                   //
        //--------------------------------------------//

        this.getStudents = getStudents;
        this.getStudent = getStudent;
        this.updateStudentPhoto = updateStudentPhoto;

        /**
         * @description Devuelve la lista de estudiantes
         */

        function getStudents() {
            return $http({
                url: BASEURL + '/students',
                method: 'GET',
                timeout: $http.defaults.timeout
            });
        }


        /**
         * @description Devuelve estudiante por id
         * @param {number} studentId
         */

        function getStudent(studentId) {
            return $http({
                url: BASEURL + '/students/student/' + studentId,
                method: 'GET',
                timeout: $http.defaults.timeout
            });
        }

        /**
         * @description Actualiza estudiante por id
         * @param {number} studentId
         * @param {Object} student
         */

        function updateStudentPhoto(student) {
            return $http.post(BASEURL + '/students/student/' + student.studentId + '/updatePhoto', { student: student });
        }


    }

})();
