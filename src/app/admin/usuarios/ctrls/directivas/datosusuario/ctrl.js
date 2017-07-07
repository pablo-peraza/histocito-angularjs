"use strict";

module.exports = cisDatosUsuarioCtrl;

cisDatosUsuarioCtrl.$inject = [ "$scope", "Usuarios", "Alertas" ];
function cisDatosUsuarioCtrl( $scope, Usuarios, Alertas ) {
  function error( resp ) {
    console.error( resp );
    Alertas.agregar( resp.status );
    return [];
  }
  $scope.cargar = function() {
    $scope.cargando = true;

    function ok( resp ) {
      $scope.modelo = resp.data;
    }

    function ultimo() {
      $scope.cargando = false;
    }
    Usuarios.obtener( $scope.modelo ).then( ok, error ).finally( ultimo );
  };
  $scope.$watch( "modelo", function( val ) {
    if ( val && typeof val === "string" ) {
      $scope.cargar();
    }
  } );
} //cisDatosUsuarioCtrl
