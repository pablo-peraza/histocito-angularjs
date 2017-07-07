"use strict";

module.exports = cisBuscarPorCtrl;

cisBuscarPorCtrl.$inject = [ "$scope" ];
function cisBuscarPorCtrl( $scope ) {
  $scope.temp = {};
  $scope.cambiar = function( busqueda ) {
    $scope.modelo = busqueda;
  };

  $scope.$watch( "modelo", function( val ) {
    $scope.temp.busqueda = val;
  } );

  $scope.esNacional = function() {
    if ( $scope.temp.busqueda ) {
      return /^\d-\d{4}-\d{4}$/.test( $scope.temp.busqueda );
    }
    return true;
  };
}
