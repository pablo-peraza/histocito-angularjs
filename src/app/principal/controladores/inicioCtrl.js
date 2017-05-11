"use strict";

module.exports = InicioCtrl;
InicioCtrl.$inject = [ "$scope", "Credenciales" ];

function InicioCtrl( $scope, Credenciales ) {
  $scope.tipoUsuario = Credenciales.credenciales().tipoUsuario;
} //Ctrl
