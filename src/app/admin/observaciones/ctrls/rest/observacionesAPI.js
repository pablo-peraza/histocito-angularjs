"use strict";

module.exports = Observaciones;

Observaciones.$inject = [ "$http", "Futuros", "urlApi" ];
function Observaciones( $http, Futuros, urlApi ) {
  var funciones = {};
  var observaciones;

  funciones.guardar = function( observacion ) {
    return $http.put( urlApi + "/api/observaciones/", observacion );
  };

  funciones.listar = function() {
    observaciones = undefined;
    return $http.get( urlApi + "/api/observaciones/" );
  };

  funciones.listarDeCache = function() {
    if ( !observaciones ) {
      observaciones = $http.get( urlApi + "/api/observaciones/" );
    }
    return Futuros.aFuturo( observaciones );
  };

  funciones.borrar = function( id ) {
    return $http["delete"]( urlApi + "/api/observaciones/" + id );
  };

  return funciones;
} //Observaciones
