"use strict";

module.exports = cisMuestrasExpedienteCtrl;

cisMuestrasExpedienteCtrl.$inject = [
  "$scope",
  "$location",
  "Expedientes",
  "Alertas"
];
function cisMuestrasExpedienteCtrl( $scope, $location, Expedientes, Alertas ) {
  $scope.elementoActual = 0;
  $scope.location = $location;
  $scope.muestras = {
    cantidad: 0,
    lista: []
  };
  $scope.cargarMas = function() {
    $scope.cargando = true;

    function ok( resp ) {
      $scope.muestras.cantidad = resp.data.cantidad;
      $scope.muestras.lista = $scope.muestras.lista.concat( resp.data.lista );
      $scope.elementoActual += 10;
    }

    function error( resp ) {
      console.error( resp );
      Alertas.agregar( resp.status,
        "Hubo un error al cargar el historial de muestras del paciente" );
    }

    function finalmente() {
      $scope.cargando = false;
    }
    Expedientes.rest.muestras( $scope.idExpediente,
      $scope.elementoActual, 10 ).then( ok, error ).finally( finalmente );
  };
  $scope.$watch( "idExpediente", function( val ) {
    if ( val ) {
      $scope.elementoActual = 0;
      $scope.cargarMas();
    } else {
      $scope.muestras = {
        cantidad: 0,
        lista: []
      };
    }
  } );
} //cisMuestrasExpedienteCtrl
