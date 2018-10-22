"use strict";

module.exports = SolicitudAPI;

SolicitudAPI.$inject = [ "$http", "node" ];
function SolicitudAPI( $http, node ) {
  SolicitudAPI.listar = listar;
  SolicitudAPI.preconvertir = preconvertir;
  SolicitudAPI.convertir = convertir;
  SolicitudAPI.convertirTodos = convertirTodos;
  return SolicitudAPI;

  function listar( pagina, cantidad ) {
    var params = {
      params: {
        pagina: pagina,
        cantidad: cantidad
      }
    };
    return $http.get( node + "/api/solicitudes", params )
      .then( ok )
      .catch( error );
  }

  function preconvertir( obj ) {
    return $http.post( node + "/api/solicitudes/premuestra", obj )
      .then( ok )
      .catch( error );
  }

  function convertir( premuestra ) {
    return $http.post( node + "/api/solicitudes/convertir", premuestra );
  }

  function convertirTodos( molde, ids ) {
    return $http.post( node + "/api/solicitudes/convertirtodos", {
      molde: molde,
      ids: ids
    } );
  }

  function ok( resp ) {
    return resp.data;
  }

  function error() {
    return [];
  }
}
