"use strict";

module.exports = Imagenes;

Imagenes.$inject = [ "$http", "urlApi" ];
function Imagenes( $http, urlApi ) {
  var funciones = {};
  funciones.previstas = function( ids ) {
    return $http.post( urlApi + "/api/imagenes/", {
      ids: ids
    } );
  };
  funciones.previstasPublicas = function( ids ) {
    return $http.post( urlApi + "/api/imagenes/publica/", {
      ids: ids
    } );
  };
  funciones.obtener = function( id ) {
    return $http.get( urlApi + "/api/imagenes/" + id );
  };
  return funciones;
} //servicio
