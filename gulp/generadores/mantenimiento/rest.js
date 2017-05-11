"use strict";

module.exports = NOMBREAPI;

var NOMBRE = require( "../../modelos/ARCHIVO.js" );

NOMBREAPI.$inject = [ "urlApi", "$http", "Notificaciones" ];

function NOMBREAPI( urlApi, $http, Notificaciones ) {
  NOMBREAPI.obtener = obtener;
  NOMBREAPI.listar = listar;
  NOMBREAPI.guardar = guardar;
  NOMBREAPI.eliminar = eliminar;
  return NOMBREAPI;

  function obtener( id ) {
    if ( id ) {
      return $http.get( urlApi + "/api/ARCHIVO/" + id ).then( function( resp ) {
        return NOMBRE.cargar( resp.data );
      } );
    } else {
      return new NOMBRE();
    }
  }

  function listar( pagina, cantidad ) {
    var params = {
      params: {
        pagina: pagina || 0,
        cantidad: cantidad || 10
      }
    };
    return $http.get( urlApi + "/api/ARCHIVO/", params ).then( ok, err );
  }

  function ok( resp ) {
    if ( resp.data.docs ) {
      resp.data.docs = NOMBRE.cargar( resp.data.docs );
    }
    return resp.data;
  }

  function err( resp ) {
    Notificaciones.agregar( resp.status, "NOMBRE" );
    return [];
  }

  function eliminar( id ) {
    return $http.delete( urlApi + "/api/ARCHIVO/" + id ).then( function( resp ) {
      Notificaciones.agregar( resp.status, "NOMBRE" );
      return resp.data;
    }, function( resp ) {
      Notificaciones.agregar( resp.status, "NOMBRE" );
      return resp;
    } );
  }

  function guardar( obj ) {
    if ( obj._id ) {
      return editar( obj );
    } else {
      return crear( obj );
    }
  }

  function crear( obj ) {
    return $http.post( urlApi + "/api/ARCHIVO/", obj ).then( function( resp ) {
      Notificaciones.agregar( resp.status, "NOMBRE" );
      return NOMBRE.cargar( resp.data );
    }, function( resp ) {
      Notificaciones.agregar( resp.status, "NOMBRE" );
      return resp;
    } );
  }

  function editar( obj ) {
    return $http.put( urlApi + "/api/ARCHIVO/" + obj._id, obj ).then( function( resp ) {
      Notificaciones.agregar( resp.status, "NOMBRE" );
      return NOMBRE.cargar( resp.data );
    }, function( resp ) {
      Notificaciones.agregar( resp.status, "NOMBRE" );
      return resp;
    } );
  }
}
