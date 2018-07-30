"use strict";

module.exports = cisBuscadorArticulos;

cisBuscadorArticulos.$inject = ["ZohoAPI"]
function cisBuscadorArticulos(ZohoAPI) {
  return {
    restrict: "A",
    templateUrl: "admin/usuarios/ctrls/directivas/buscadorarticulos/articulos.html",
    require: "ngModel",
    scope: {
      modelo: "="
    },
    link: link
  };

  function link( $scope, elem, atr, ngModelCtrl ) {
    var unwatch = $scope.$watch( function() {
      return ngModelCtrl.$modelValue;
    }, function( newValue ) {
      if ( newValue ) {
        $scope.articulo = newValue;
        ngModelCtrl.$setViewValue( newValue );
        unwatch();
      }
    } );
    $scope.buscar = function( texto ) {
      return ZohoAPI.buscarArticulos( texto );
    };
    $scope.enSeleccion = function( item ) {
      $scope.articulo = item;
      ngModelCtrl.$setViewValue( item );
    };
  }
}
