"use strict";

module.exports = resultadosCtrl;
resultadosCtrl.$inject = [ "$scope", "$routeParams", "resultados" ];

function resultadosCtrl( $scope, $routeParams, resultados ) {
  $scope.busqueda = $routeParams.busqueda;
  $scope.resultados = resultados;
}
