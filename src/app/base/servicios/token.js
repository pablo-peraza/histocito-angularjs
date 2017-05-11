"use strict";

module.exports = token;

token.$inject = [ "$http" ];

function token( $http ) {
  var funciones = {};

  funciones.obtener = function() {
    return $http.get( "/api/usuarios/" );
  };

  funciones.actualizar = function( perfil ) {
    return $http.put( "/api/usuarios/actualizar", perfil );
  };

  funciones.verificarToken = function( token ) {
    var head = {
      headers: {
        "Authorization": "JWT " + token
      }
    };
    return $http.get( "/api/verificacion/token", head );
  };

  funciones.revalidar = function( clave, recordarPor ) {
    var obj = {
      password: clave,
      recordarPor: recordarPor
    };
    return $http.put( "/api/usuarios/revalidar", obj );
  };

  return funciones;
}
