"use strict";

module.exports = Selecciones;

Selecciones.$inject = [ "$http", "Cache" ];
function Selecciones( $http, Cache ) {
  var funciones = {};

  function obtener( llave ) {
    if ( _.isUndefined( Cache.obtener( llave ) ) ) {
      return $http.get( "/api/selecciones/" + llave ).then( function( data ) {
        Cache.agregar( llave, data.data );
        return data.data;
      } );
    } else {
      return Cache.obtener( llave );
    }
  } //obtener

  funciones.usuario = function() {
    return obtener( "usuario" );
  };

  funciones.telefono = function() {
    return obtener( "telefono" );
  };

  funciones.correo = function() {
    return obtener( "correo" );
  };

  funciones.sexo = function() {
    return obtener( "sexo" );
  };

  funciones.estadoCivil = function() {
    return obtener( "estadoCivil" );
  };

  funciones.categoria = function() {
    return obtener( "categoria" );
  };

  funciones.lesiones = function() {
    return obtener( "lesion" );
  };

  funciones.control = function() {
    return obtener( "control" );
  };

  funciones.tratamiento = function() {
    return obtener( "tratamiento" );
  };

  funciones.patologia = function() {
    return obtener( "patologia" );
  };

  funciones.hormonal = function() {
    return obtener( "hormonal" );
  };

  funciones.patron = function() {
    return obtener( "patron" );
  };

  funciones.flora = function() {
    return obtener( "flora" );
  };

  return funciones;
}
