"use strict";

module.exports = SolicitudAPI;

SolicitudAPI.$inject = [ "$http", "node" ];
function SolicitudAPI( $http, node ) {
  SolicitudAPI.listar = listar;
  return SolicitudAPI;

  function listar() {
    return $http.get( node + "/api/solicitudes" )
      .then(ok)
      .catch(error);
  }

  function ok( resp ) {
    return resp.data;
  }

  function error() {
    return [];
  }
}
