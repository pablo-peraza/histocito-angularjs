"use strict";

module.exports = cisBuscadorArticulos;

cisBuscadorArticulos.$inject = ["ZohoAPI"];
function cisBuscadorArticulos(ZohoAPI) {
  return {
    restrict: "A",
    templateUrl: "admin/usuarios/ctrls/directivas/buscadorzoho/itemsZoho.html",
    require: "ngModel",
    scope: {
      modelo: "=",
      coleccion: "@",
      atributo: "@"
    },
    link: link
  };

  function link( $scope, elem, atr, ngModelCtrl ) {
    var unwatch = $scope.$watch( function() {
      return ngModelCtrl.$modelValue;
    }, function( newValue ) {
      if ( newValue ) {
        $scope.item = newValue;
        ngModelCtrl.$setViewValue( newValue );
        unwatch();
      }
    } );
    $scope.buscar = function( texto ) {
      switch( $scope.coleccion ) {
        case "articulos":
          return ZohoAPI.buscarArticulos( texto );
        case "clientes":
          return ZohoAPI.buscarClientes( texto );
      }
    };
    $scope.enSeleccion = function( item ) {
      $scope.item = item;
      ngModelCtrl.$setViewValue( item );
    };
  }
}
