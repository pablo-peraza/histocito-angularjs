"use strict";

module.exports = cisTelefonosCtrl;

cisTelefonosCtrl.$inject = [ "$scope", "Selecciones" ];
function cisTelefonosCtrl( $scope, Selecciones ) {
  var original;
  Selecciones.telefono().then( function( resp ) {
    $scope.tipos = resp.lista;
  } );
  $scope.vacio = _.isEmpty;
  $scope.$watch( "modelo", function( val ) {
    if ( !val ) {
      $scope.modelo = [];
    }
  } );

  function terminar( form ) {
    delete $scope.modelo.temp;
    form.$setPristine();
  }

  $scope.agregar = function( tel, form ) {
    $scope.modelo = _.union( $scope.modelo, [ tel ] );
    terminar( form );
  };
  $scope.editar = function( tel ) {
    original = angular.copy( $scope.modelo );
    tel.editando = true;
    $scope.modelo.temp = tel;
  };
  $scope.cancelar = function( form ) {
    $scope.modelo = original;
    terminar( form );
  };

  $scope.eliminar = function( tel ) {
    var texto = "¿Está seguro que desea eliminar el teléfono?";
    if ( confirm( texto ) ) {
      $scope.modelo = _.without( $scope.modelo, tel );
    }
  };
} //ctrl
