"use strict";

module.exports = zohoAPI;

zohoAPI.$inject = [ "$http", "node" ];
function zohoAPI( $http, node ) {
  var funciones = {};
  funciones.ejecutar = function( funcion, cliente ) {
    return $http.post( node + "/api/facturas/zoho/" + funcion + "/cliente", cliente );
  };
  funciones.guardarClienteZoho = function( cliente ) {
    function ok( resp ) {
      return resp;
    } //ok
    function error( resp ) {
      return resp;
    }
    return $http.post( node +
      "/api/facturas/zoho/guardar/cliente", cliente ).then( ok, error ) ;
  };

  funciones.buscarClienteZoho = function( cliente ) {
    function ok( resp ) {
      return resp.data.contact;
    } //ok
    function error( resp ) {
      return resp;
    }
    return $http.get( node +
      "/api/facturas/zoho/buscar/cliente", {params: {id: cliente }} ).then( ok, error ) ;
  };

  funciones.actualizarClienteZoho = function( cliente ) {
    return $http.get( node + "/api/facturas/zoho/actualizar/cliente", {params: {id: cliente }} );
  };

  return funciones;
}
