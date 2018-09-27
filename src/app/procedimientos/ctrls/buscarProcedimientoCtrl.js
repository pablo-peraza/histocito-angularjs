"use strict";

module.exports = BuscarProcedimiento;

BuscarProcedimiento.$inject = [ "$scope", "Procedimientos", "Alertas" ];
function BuscarProcedimiento( $scope, Procedimientos, Alertas ) {
  function error( resp ) {
    console.error( resp );
    Alertas.agregar( resp.status );
    return [];
  }

  function ultima() {
    $scope.buscando = false;
  }

  $scope.buscar = function( texto, dims ) {
    $scope.buscando = true;

    function ok( resp ) {
      return resp.data.lista;
    }
    return Procedimientos.procedimientos.buscar( 0, 50, texto, dims )
    .then( ok, error ).finally( ultima );
  };
} //BuscarProcedimiento
