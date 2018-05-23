"use strict";

module.exports = RelacionesAPI;

RelacionesAPI.$inject = [ "$http", "node" ];
function RelacionesAPI( $http, node ) {
  RelacionesAPI.listar = listar;
  RelacionesAPI.guardar = guardar;
  RelacionesAPI.eliminar = eliminar;
  RelacionesAPI.obtener = obtener;
  return RelacionesAPI;

  function listar() {
    return $http.get( node + "/api/relaciones" )
      .then(function(resp) {
        return resp.data;
      })
      .catch(function() {
        return [];
      });
  }

  function ok( resp ) {
    return resp.data;
  }

  function error( resp ) {
    return resp;
  }

  function guardar( obj ) {
    if ( obj._id ) {
      return editar( obj );
    } else {
      return crear( obj );
    }
  }

  function crear( obj ) {
    console.log(obj);
    return $http.post( node + "/api/relaciones", obj ).then( ok, error );
  }

  function editar( obj ) {
    return $http.put( node + "/api/relaciones/" + obj._id, obj ).then( ok, error );
  }

  function eliminar(id) {
    return $http.delete( node + "/api/relaciones/" + id ).then( ok, error );
  }

  function obtener(id) {
    return $http.get( node + "/api/relaciones/medico/" + id ).then( ok, error );
  }
}
