"use strict";

module.exports = SolicitudAPI;

SolicitudAPI.$inject = [ "$http", "node" ];
function SolicitudAPI( $http, node ) {
  SolicitudAPI.listar = listar;
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

  function ok( resp ) {
    return resp.data;
  }

  function error() {
    return [];
  }
}
