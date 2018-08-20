"use strict";

module.exports = zohoAPI;

zohoAPI.$inject = [ "$http", "node" ];
function zohoAPI( $http, node ) {
  function error( resp ) {
    return resp;
  }
  var funciones = {};
  funciones.ejecutar = function( funcion, cliente ) {
    return $http.post( node + "/api/facturas/zoho/" + funcion + "/cliente", cliente );
  };
  funciones.guardarClienteZoho = function( cliente ) {
    function ok( resp ) {
      return resp;
    } //ok
    return $http.post( node +
      "/api/facturas/zoho/guardar/cliente", cliente ).then( ok, error ) ;
  };

  funciones.buscarClienteZoho = function( cliente ) {
    function ok( resp ) {
      return resp.data.contact;
    } //ok
    return $http.get( node +
      "/api/facturas/zoho/buscar/cliente", {params: {id: cliente }} ).then( ok, error ) ;
  };

  funciones.actualizarClienteZoho = function( cliente ) {
    return $http.get( node + "/api/facturas/zoho/actualizar/cliente", {params: {id: cliente }} );
  };

  funciones.buscarArticulos = function( texto ) {
    function ok( resp ) {
      return resp.data.items;
    }
    return $http.get( node + "/api/facturas/zoho/buscar/articulo/" + texto ).then( ok, error );
  };

  funciones.buscarClientes = function( texto ) {
    function ok( resp ) {
      return resp.data.contacts;
    }
    return $http.get( node + "/api/facturas/zoho/buscar/cliente/" + texto ).then( ok, error );
  };

  funciones.obtenerReferencias = function( idsArticulos, idClienteZoho ) {
    var params = {
      params: {
        idsArticulos: idsArticulos,
        idClienteZoho: idClienteZoho
      }
    };
    function ok( resp ) {
      return resp.data;
    }
    return $http.get( node + "/api/facturas/zoho/referencias", params ).then( ok, error );
  };

  funciones.preciosArticulos = function( param ) {
    function ok( resp ) {
      return resp;
    }
    return $http.get( node + "/api/facturas/zoho/articulos/precios", {params: param.data.lista} )
      .then( ok, error );
  };

  return funciones;
}
