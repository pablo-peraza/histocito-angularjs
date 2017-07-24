"use strict";

module.exports = cisCorreosCtrl;

cisCorreosCtrl.$inject = [ "$scope", "Selecciones" ];
function cisCorreosCtrl( $scope, Selecciones ) {
  var original;
  Selecciones.correo().then( function( resp ) {
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

  $scope.agregar = function( correo, form ) {
    $scope.modelo = _.union( $scope.modelo, [ correo ] );
    terminar( form );
  };
  $scope.editar = function( correo ) {
    original = angular.copy( $scope.modelo );
    correo.editando = true;
    $scope.modelo.temp = correo;
  };
  $scope.cancelar = function( form ) {
    $scope.modelo = original;
    terminar( form );
  };

  $scope.eliminar = function( correo ) {
    var texto = "¿Está seguro que desea eliminar el correo?";
    if ( confirm( texto ) ) {
      $scope.modelo = _.without( $scope.modelo, correo );
    }
  };
} //ctrl
