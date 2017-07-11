"use strict";

module.exports = PerfilRest;

PerfilRest.$inject = [ "$http", "urlApi" ];
function PerfilRest( $http, urlApi ) {
  var funciones = {};
  funciones.usuario = function() {
    return $http.get( urlApi + "/api/usuarios/" );
  };
  funciones.guardar = function( usuario, credenciales ) {
    if ( credenciales ) {
      usuario.passwordActual = credenciales.actual;
      usuario.passwordNuevo = credenciales.nueva;
    }
    return $http.put( urlApi + "/api/usuarios/", usuario );
  };
  return funciones;
} //PerfilRest
