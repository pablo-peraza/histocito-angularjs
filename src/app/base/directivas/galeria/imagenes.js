"use strict";

module.exports = Imagenes;

Imagenes.$inject = [ "$http" ];
function Imagenes( $http ) {
  var funciones = {};
  funciones.previstas = function( ids ) {
    return $http.post( "/api/imagenes/", {
      ids: ids
    } );
  };
  funciones.previstasPublicas = function( ids ) {
    return $http.post( "/api/imagenes/publica/", {
      ids: ids
    } );
  };
  funciones.obtener = function( id ) {
    return $http.get( "/api/imagenes/" + id );
  };
  return funciones;
} //servicio
