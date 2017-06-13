(function () {
  'use strict';


  angular.module('core.access')
    //TODO upper camel
    .factory('accessFactory', accessFactory)
    .factory('signOutFactory', signOutFactory)
    .factory('lastUsersLoggedFactory', lastUsersLoggedFactory);

  accessFactory.$inject = ['$http', '$sessionStorage', '$state', 'md5', 'ToasterFactory', 'lastUsersLoggedFactory', 'LocalAccess', '$q'];
  function accessFactory($http, $sessionStorage, $state, md5, ToasterFactory, lastUsersLoggedFactory, LocalAccess, $q) {

  
    return {
      signInStudent: signInStudent,
      signInTeacher: signInTeacher,
      checkLoggedin: checkLoggedin,
     // comprobarHash: comprobarHash,
    };

    function signInTeacher(username, password) {
      var defered = $q.defer();
     var promise = defered.promise;
      $http.post($http.defaults.urlApi + '/login', { user: username, pass: password  }).then(
        function (res) {
          if (!res) {
           defered.reject(error);
          } else {
            // process.mainModule.exports.wat();
            $sessionStorage.usuario = res.data;
            //lastUsersLoggedFactory.manageUsers(username, res.data);
            LocalAccess.check(function (err, access) { if (err) console.log(err); });
            $state.go('app.teachers.students-list');
           defered.resolve();
          }
        },
        function (error) {
         defered.reject(error);
        }
      );
        return promise;
    }

    function signInStudent(code) {
      var defered = $q.defer();
     var promise = defered.promise;
      $http.post($http.defaults.urlApi + '/login', {code: code}).then(
        function (res) {
          if (!res) {
           defered.reject(error);
          } else {
            console.log(res.data);
            $sessionStorage.usuario = res.data;
           // lastUsersLoggedFactory.manageUsers(username, res.data);
            LocalAccess.check(function (err, access) { if (err) console.log(err); });
            $state.go('app.students.update-photo');
           defered.resolve();
          }
        },
        function (error) {
         defered.reject(error);
        }
      );
        return promise;
    }

    function checkLoggedin() {
      if ($sessionStorage.usuario) {
        return $http.get($http.defaults.urlApi + '/access/loggedin');
      } else {
        $state.go('access.clean');
      }
    }
  }

  signOutFactory.$inject = ['$http', '$state', '$sessionStorage'];
  function signOutFactory($http, $state, $sessionStorage) {

    return {
      signOut: signOut
    };

    function signOut() {
      $sessionStorage.$reset();
      $http.get($http.defaults.urlApi + '/access/logout')
        .success(function (res) {
          $state.go('access.clean');
           console.log("ok")
        })
        .error(function (x) {
          $state.go('access.signin');
          console.log("ko")
        });
    }
  }

  lastUsersLoggedFactory.$inject = ['$localStorage'];
  function lastUsersLoggedFactory($localStorage) {
    return {
      manageUsers: manageUsers
    };
    function manageUsers(username, res) {
      if (!res.photo) {
        res.photo = "";
      }
      if ($localStorage.usuariosLogeados) {
        //comprobamos si ya está el usuario en el $localStorage
        var found = false;
        $localStorage.usuariosLogeados.forEach(function (u) {
          if (u.username == username) {
            found = true;
            //actualizamos la hora
            u.hora = Date.parse(new Date());
            u.photo = res.photo;
            return true;
          }
        });

        if (!found) {
          //comprobamos cuantos usuarios hay en el $localStorage
          if ($localStorage.usuariosLogeados.length > 3) {
            //Alguien esta haciendo el nabo con el localStorage, borramos los datos
            $localStorage.usuariosLogeados = [];
          }
          if ($localStorage.usuariosLogeados.length == 3) {
            //buscamos el mas viejo y sustituimos
            var hora = -1;
            var firstUser = {};
            $localStorage.usuariosLogeados.forEach(function (u) {
              if (hora < 0) {
                hora = u.hora;
                firstUser = u;
              } else if (u.hora < hora) {
                //Se encuentra una hora menor
                firstUser = u;
              }
            });
            $localStorage.usuariosLogeados[$localStorage.usuariosLogeados.indexOf(firstUser)] = {
              username: username,
              hora: Date.parse(new Date()),
              photo: res.photo
            };
          }
          else {
            $localStorage.usuariosLogeados.push({ username: username, hora: Date.parse(new Date()), photo: res.photo });
          }
        }
      }
      else {
        $localStorage.usuariosLogeados = [];
        $localStorage.usuariosLogeados.push({ username: username, hora: Date.parse(new Date()), photo: res.photo });
      }
    }
  }
})();