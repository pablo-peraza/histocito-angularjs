"use strict";

module.exports = imagenesMedico;

imagenesMedico.$inject = [ "$scope", "$modalInstance", "MuestrasREST", "muestra", "Alertas" ];
function imagenesMedico( $scope, $modalInstance, MuestrasREST, muestra, Alertas ) {
  $scope.muestra = muestra;
  $scope.cancelar = function() {
    $modalInstance.dismiss( "Cancelado" );
  };
  $scope.guardar = function( nueva ) {
    console.debug( nueva );
    $scope.cargando = true;
    MuestrasREST.guardar( nueva ).then( function( resp ) {
      Alertas.agregar( resp.status );
      $modalInstance.close( nueva );
    }, function( error ) {
      console.error( error );
      Alertas.agregar( error.status );
    } ).finally( function() {
      $scope.cargando = false;
    } );
  };
} //imagenesMedico
