"use strict";

module.exports = cisCategoriasCtrl;

cisCategoriasCtrl.$inject = [ "$scope", "Selecciones" ];
function cisCategoriasCtrl( $scope, Selecciones ) {
  if ( _.isEmpty( $scope.modelo ) ) {
    $scope.modelo = {};
  }
  Selecciones.categoria().then( function( resp ) {
    $scope.categorias = resp.lista;
  } );
  $scope.$watch( "modelo", function( val ) {
    console.debug( val );
  }, true );
} //ctrl
