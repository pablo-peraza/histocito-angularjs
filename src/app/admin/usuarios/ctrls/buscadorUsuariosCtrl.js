"use strict";

module.exports = BuscadorUsuarios;

BuscadorUsuarios.$inject = [ "$scope", "Usuarios", "Alertas" ];
function BuscadorUsuarios( $scope, Usuarios, Alertas ) {
  function ok( resp ) {
    return resp.data.lista;
  }

  function error( resp ) {
    console.error( resp );
    Alertas.agregar( resp.status );
    return [];
  }

  function ultima() {
    $scope.buscando = false;
  }
  $scope.buscar = function( texto, tipoUsuario ) {
    return Usuarios.buscar( 0, 20, texto, [ {
      tipoUsuario: [ tipoUsuario ]
    } ] ).then( ok, error ).finally( ultima );
  };
} //BuscadorUsuarios
