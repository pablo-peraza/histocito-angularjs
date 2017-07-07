"use strict";

module.exports = token;

token.$inject = [ "$http", "urlApi" ];

function token( $http, urlApi ) {
  var funciones = {};

  funciones.obtener = function() {
    return $http.get( urlApi + "/api/usuarios/" );
  };

  funciones.actualizar = function( perfil ) {
    return $http.put( urlApi + "/api/usuarios/actualizar", perfil );
  };

  funciones.verificarToken = function( token ) {
    var head = {
      headers: {
        "Authorization": "JWT " + token
      }
    };
    return $http.get( urlApi + "/api/verificacion/token", head );
  };

  funciones.revalidar = function( clave, recordarPor ) {
    var obj = {
      password: clave,
      recordarPor: recordarPor
    };
    return $http.put( urlApi + "/api/usuarios/revalidar", obj );
  };

  return funciones;
}
