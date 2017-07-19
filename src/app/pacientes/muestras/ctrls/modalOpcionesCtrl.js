"use strict";

module.exports = ModalOpcionesCtrl;

ModalOpcionesCtrl.$inject = [ "$scope", "$modalInstance" ];

function ModalOpcionesCtrl( $scope, $modalInstance ) {

  function contestador( accion ) {
    return function() {
      $modalInstance.close( { accion: accion } );
    };
  }

  $scope.ver = contestador( "ver" );
  $scope.cero = contestador( "cero" );
  $scope.conEquipo = contestador( "conEquipo" );
  $scope.conMedico = contestador( "conMedico" );
  $scope.conTodo = contestador( "conTodo" );

} //ModalOpcionesCtrl
