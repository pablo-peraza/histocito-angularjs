"use strict";

module.exports = cisBuscarOrigenesCtrl;

cisBuscarOrigenesCtrl.$inject = [ "$scope", "Procedimientos", "Alertas" ];
function cisBuscarOrigenesCtrl( $scope, Procedimientos, Alertas ) {
  function ultima() {
    $scope.buscando = false;
  }

  function error( resp ) {
    console.error( resp );
    Alertas.agregar( resp.status );
    return [];
  }
  $scope.buscar = function( texto ) {
    $scope.buscando = true;

    function ok( resp ) {
      return resp.data.lista;
    }
    return Procedimientos.origenes.buscar( 0, 100, texto ).then( ok, error ).finally( ultima );
  };

  $scope.enSeleccion = function( item ) {
    $scope.buscando = true;

    function ok( resp ) {
      $scope.modelo = resp.data;
    }
    Procedimientos.origenes.obtener( item ).then( ok, error ).finally( ultima );
  };
  if ( _.isString( $scope.modelo ) ) {
    $scope.enSeleccion( $scope.modelo );
  }
} //ctrl
