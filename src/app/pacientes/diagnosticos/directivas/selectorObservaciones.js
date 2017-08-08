"use strict";

module.exports = cisSelectorObservaciones;

function link( Observaciones ) {
  return function( $scope, elem, atr, ngModelCtrl ) {
    Observaciones.listarDeCache().then(
      function( resp ) {
        $scope.observaciones = resp.data.lista;
      } );
    $scope.actualizar = function( valor ) {
      ngModelCtrl.$setViewValue( valor.observacion );
    };
  };
} //link

cisSelectorObservaciones.$inject = [ "Observaciones" ];
function cisSelectorObservaciones( Observaciones ) {
  return {
    restrict: "A",
    require: "ngModel",
    scope: {
      inhabilitado: "=ngDisabled"
    },
    link: link( Observaciones ),
    template: "<select class='form-control' " +
      "ng-options='obs.nombre for obs in observaciones' " +
      "ng-disabled='inhabilitado'" +
      "ng-change='actualizar(seleccionado)' " +
      "ng-model='seleccionado'></select>"
  };
} //cisSelectorObservaciones
