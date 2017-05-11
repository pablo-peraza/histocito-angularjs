"use strict";

module.exports = alertasCtrl;

alertasCtrl.$inject = [ "$scope", "Alertas" ];

function alertasCtrl( $scope, Alertas ) {
  $scope.alertas = Alertas;
  $scope.cerrar = function() {
    delete Alertas.alerta;
  };
}
