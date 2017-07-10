"use strict";

module.exports = AdminFacturasCtrl;

AdminFacturasCtrl.$inject = [
  "$scope",
  "Facturas",
  "facturas",
  "dimensiones",
  "elementoActual",
  "Alertas"
];
function AdminFacturasCtrl( $scope, Facturas, facturas, dimensiones, elementoActual, Alertas ) {
  $scope.datos = {
    facturas: facturas,
    dimensiones: dimensiones,
    elementoActual: elementoActual
  };
  $scope.vacio = _.isEmpty;

  $scope.filtrar = function( procesarResultado ) {
    $scope.datos.cargando = true;
    $scope.datos.seleccionadas = false;

    function ok( resp ) {
      $scope.datos.facturas = procesarResultado( resp.data );
      $scope.datos.elementoActual += 50;
    }

    function error( resp ) {
      console.error( error );
      Alertas.agregar( resp.status );
    }

    function finalmente() {
      $scope.datos.cargando = false;
    }
    Facturas.rest.buscar( $scope.datos.elementoActual, 50, $scope.datos.filtro, $scope.filtros )
      .then( ok, error )
      .finally( finalmente );
  };

  $scope.buscar = function() {
    $scope.datos.elementoActual = 0;
    $scope.filtrar( function( res ) {
      return res;
    } );
  };

  $scope.aplicarDimension = function( activas ) {
    $scope.filtros = activas;
    $scope.buscar();
  };

  $scope.cargarMas = function() {
    $scope.filtrar( function( res ) {
      res.lista = $scope.datos.facturas.lista.concat( res.lista );
      return res;
    } );
  };
} //ctrl
