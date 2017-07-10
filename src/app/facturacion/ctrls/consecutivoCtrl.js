"use strict";

module.exports = ConsecutivoCtrl;

ConsecutivoCtrl.$inject = [ "$scope", "$modalInstance", "factura", "FacturasREST", "Alertas" ];
function ConsecutivoCtrl( $scope, $modalInstance, factura, FacturasREST, Alertas ) {
  $scope.datos = {
    consecutivo: factura.consecutivo
  };
  $scope.guardar = ok;
  $scope.cancelar = cancelar;

  function ok( consecutivo ) {
    $scope.datos.cargando = true;
    FacturasREST.editarConsecutivo( factura.id, consecutivo )
      .then(
        function() {
          Alertas.agregar( 200, "Se ha guardar el número de factura correctamente" );
          $modalInstance.close( consecutivo );
        },
        function( error ) {
          console.error( error );
          Alertas.agregar( error.status );
        }
    )
      .finally( function() {
        $scope.datos.cargando = true;
      } );

  } //ok
  function cancelar() {
    $modalInstance.dismiss( "NO" );
  } //cancelar
} //ConsecutivoCtrl
